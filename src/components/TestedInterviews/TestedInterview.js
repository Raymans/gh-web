import {
  Button, Col, Descriptions, Layout, Progress, Row, Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import AnchorSilder from '../Sider/AnchorSider';
import Headline from '../Article/Headline';
import { calculateInterviewSession, getInterviewSession } from '../../utils/api';
import { getUserInfo } from '../../utils/auth';
import InterviewSession from '../Interviews/InterviewSession';

const { sub } = getUserInfo();

const StyleTotalScoreCol = styled(Col)`
  margin-left: auto;
  margin-right: 35px;
`;

const TestedInterview = ({ sessionId }) => {
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState({
    specialization: { name: '' },
    clientAccount: { email: '' },
  });
  const [interviewSession, setInterviewSession] = useState({ candidateAccount: {} });
  const isOwner = sub === interview.clientAccount.id;

  useEffect(() => {
    getInterviewSession(sessionId)
      .then((interviewS) => {
        setInterviewSession(interviewS);
        setInterview(interviewS.interview);
        setLoading(false);
      });
  }, []);

  const handleCalculateScore = () => {
    calculateInterviewSession(sessionId)
      .then((is) => {
        setInterviewSession(is);
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
                label="Author"
                span={2}
              >
                {interview.clientAccount.email}
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
                        sectionScore = answerStats.MULTI_CHOICE.correct / answerStats.MULTI_CHOICE.questionTotal * 100;
                      }
                      return (
                        <Col justify="center" style={{ 'text-align': 'center' }}>
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
                  <StyleTotalScoreCol>
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
            && <Button type="primary" onClick={handleCalculateScore}>Calculate Score</Button>
          }
        </Spin>
      </Layout>
    </>
  );
};

export default TestedInterview;
