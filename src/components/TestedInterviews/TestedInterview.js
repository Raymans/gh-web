import {
  Button, Col, Descriptions, Layout, Progress, Row, Spin, Statistic, Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import AnchorSilder from '../Sider/AnchorSider';
import Headline from '../Article/Headline';
import InterviewSession from '../Interviews/InterviewSession';
import AuthorBy from '../AuthorBy';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';

const StyleTotalScoreCol = styled(Col)`
  text-align: center;
  margin-left: auto;
  margin-right: 35px;
`;

const StyledScoresRow = styled(Row)`
  .ant-statistic-content-prefix{
    font-size: 14px;
  }
`;

const TestedInterview = ({ sessionId }) => {
  const {
    user,
  } = useAuth0();
  const { calculateInterviewSession, getAverageScore, getInterviewSession } = useApi();
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState({
    specialization: { name: '' },
    clientUser: { email: '' },
  });
  const [interviewSession, setInterviewSession] = useState({ candidateUser: {} });
  const [averageScore, setAverageScore] = useState({ sectionsAverageScore: [{ averageSectionScore: 0 }] });
  const [calculating, setCalculating] = useState(false);
  const isOwner = user?.sub === interview.clientUser.id;

  useEffect(() => {
    getInterviewSession(sessionId)
      .then((interviewS) => {
        setInterviewSession(interviewS);
        setInterview(interviewS.interview);
        setLoading(false);
        getAverageScore(sessionId)
          .then((res) => {
            setAverageScore({ scoreDiff: (interviewS.score - res.averageScore.averageScore) * 100, ...res });
          });
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
      <CustomBreadcrumb crumbs={[{
        label: 'Tested Interviews',
        path: '/testedInterviews',
      }, {
        label: interview.title,
        path: location.pathname,
      }]}
      />
      <Headline title={interview.title}>
        {
          isOwner
          && (
            <Link
              to={`/profile/${interviewSession.candidateUser.id}`}
            >
              {interviewSession.candidateUser.name}
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
              <Descriptions.Item
                span={2}
                style={{ whiteSpace: 'pre-line' }}
              >
                {interview.description}
              </Descriptions.Item>
              <Descriptions.Item
                span={2}
              >
                <AuthorBy
                  author={interview.clientUser.email}
                  avatarSrc={interview.clientUser.avatar}
                />
              </Descriptions.Item>
            </Descriptions>
            {

              !loading && interviewSession.status === 'ENDED' && interviewSession.answerAttemptSections
              && (
                <StyledScoresRow gutter={[16, 32]}>
                  {
                    interview.sections.map((section, index) => {
                      let sectionScore = 0;
                      let sectionScoreDiff = 0;
                      if (interviewSession.answerAttemptSections[section.id]) {
                        const { answerStats } = interviewSession.answerAttemptSections[section.id];
                        sectionScore = Math.round(answerStats.MULTI_CHOICE.correct / answerStats.MULTI_CHOICE.questionTotal * 100);
                      }
                      sectionScoreDiff = sectionScore - averageScore.sectionsAverageScore[index]?.averageSectionScore * 100;
                      return (
                        <Col key={section.id} justify="center" style={{ textAlign: 'center' }}>
                          <Tooltip title={`Compares to average score: ${averageScore.sectionsAverageScore[index]?.averageSectionScore * 100}`}>
                            <Statistic
                              value={sectionScoreDiff}
                              valueStyle={{ color: sectionScoreDiff === 0 ? '#2f9eba' : (sectionScoreDiff > 0 ? '#3f8600' : 'red') }}
                              prefix={sectionScoreDiff === 0 ? '-' : (sectionScoreDiff > 0
                                ? <ArrowUpOutlined /> : <ArrowDownOutlined />)}
                            />
                          </Tooltip>
                          <Progress
                            type="circle"
                            percent={sectionScore}
                            width={70}
                            format={(score) => score}
                            status={sectionScore < averageScore.sectionsAverageScore[index]?.averageSectionScore * 100 ? 'exception' : ''}
                          />
                          <div>{section.title}</div>
                        </Col>
                      );
                    })
                  }
                  <StyleTotalScoreCol justify="center">
                    <Tooltip title={`Compares to average score: ${averageScore.averageScore?.averageScore * 100}`}>
                      <Statistic
                        value={averageScore.scoreDiff}
                        valueStyle={{ color: averageScore.scoreDiff === 0 ? '#2f9eba' : (averageScore.scoreDiff > 0 ? '#3f8600' : 'red') }}
                        prefix={averageScore.scoreDiff === 0 ? '-' : (averageScore.scoreDiff > 0
                          ? <ArrowUpOutlined /> : <ArrowDownOutlined />)}
                      />
                    </Tooltip>
                    <Progress
                      type="circle"
                      percent={interviewSession.score * 100}
                      format={(score) => score}
                      status={interviewSession.score < averageScore.averageScore?.averageScore ? 'exception' : ''}
                    />
                  </StyleTotalScoreCol>
                </StyledScoresRow>
              )
            }
            {
              !loading
              && <InterviewSession interviewSession={interviewSession} preview />
            }
          </Layout.Content>
          {
            isOwner && interviewSession.status === 'ENDED'
            && (
              <Button type="primary" onClick={handleCalculateScore} loading={calculating}>
                Calculate
                Score
              </Button>
            )
          }
        </Spin>
      </Layout>
      <Seo subTitle={interview.title} />
    </>
  );
};

export default TestedInterview;
