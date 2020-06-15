import {
  Button, Col, Descriptions, Layout, Progress, Row, Spin, Statistic,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowUpOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import AnchorSilder from '../Sider/AnchorSider';
import Headline from '../Article/Headline';
import { calculateInterviewSession, getInterviewSession } from '../../utils/api';
import { getUserInfo } from '../../utils/auth';
import InterviewSession from '../Interviews/InterviewSession';
import AuthorBy from '../AuthorBy';

const { sub } = getUserInfo();

const StyleTotalScoreCol = styled(Col)`
  text-align: center;
  margin-left: auto;
  margin-right: 35px;
`;

const TestedInterview = ({ sessionId }) => {
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState({
    specialization: { name: '' },
    clientUser: { email: '' },
  });
  const [interviewSession, setInterviewSession] = useState({ candidateAccount: {} });
  const [calculating, setCalculating] = useState(false);
  const isOwner = sub === interview.clientUser.id;

  useEffect(() => {
    getInterviewSession(sessionId)
      .then((interviewS) => {
        setInterviewSession(interviewS);
        setInterview(interviewS.interview);
        setLoading(false);
      });
  }, []);

  const handleCalculateScore = () => {
    setCalculating(true);
    calculateInterviewSession(sessionId)
      .then((is) => {
        setInterviewSession(is);
        setCalculating(false);
      });
  };

  return (
    <>
      <Headline title={interview.title}>
        {
          isOwner
          && (
            <Link
              to={`/profiles/${interviewSession.candidateAccount.id}`}
            >
              {interviewSession.candidateAccount.name}
            </Link>
          )
        }
      </Headline>
      <Layout>
        <AnchorSilder />
        <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
          <Layout.Content>
            <Descriptions column={2}>
              <Descriptions.Item
                label="Specialization"
              >
                {interview.specialization.name}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title">{interview.jobTitle}</Descriptions.Item>
              <Descriptions.Item span={2}>{interview.description}</Descriptions.Item>
              <Descriptions.Item
                span={2}
              >
                <AuthorBy author={interview.clientUser.email} avatarSrc={interview.clientUser.avatar} />
              </Descriptions.Item>
            </Descriptions>
            {

              !loading && interviewSession.status === 'ENDED' && interviewSession.answerAttemptSections
              && (
                <Row gutter={[16, 32]}>
                  {
                    interview.sections.map((section) => {
                      let sectionScore = 0;
                      if (interviewSession.answerAttemptSections[section.id]) {
                        const { answerStats } = interviewSession.answerAttemptSections[section.id];
                        sectionScore = Math.round(answerStats.MULTI_CHOICE.correct / answerStats.MULTI_CHOICE.questionTotal * 100);
                      }
                      return (
                        <Col key={section.id} justify="center" style={{ textAlign: 'center' }}>
                          <Statistic
                            value={11}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                          />
                          <Progress
                            type="circle"
                            percent={sectionScore}
                            width={70}
                            format={(score) => score}
                            status={sectionScore < 60 ? 'exception' : ''}
                          />
                          <div>{section.title}</div>
                        </Col>
                      );
                    })
                  }
                  <StyleTotalScoreCol justify="center">
                    <Statistic
                      value={30}
                      valueStyle={{ color: '#3f8600' }}
                      prefix={<ArrowUpOutlined />}
                    />
                    <Progress
                      type="circle"
                      percent={interviewSession.score * 100}
                      format={(score) => score}
                      status={interviewSession.score < 60 ? 'exception' : ''}
                    />
                  </StyleTotalScoreCol>
                </Row>
              )
            }
            {
              !loading
              && <InterviewSession interviewSession={interviewSession} preview />
            }
          </Layout.Content>
          {
            isOwner && interviewSession.status === 'ENDED'
            && <Button type="primary" onClick={handleCalculateScore} loading={calculating}>Calculate Score</Button>
          }
        </Spin>
      </Layout>
    </>
  );
};

export default TestedInterview;
