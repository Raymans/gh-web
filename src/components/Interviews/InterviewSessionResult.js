import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Col, Descriptions, Layout, Progress, Row, Spin, Statistic, Tooltip } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useApi from '../../hooks/useApi';
import AuthorBy from '../AuthorBy';
import InterviewSession from './InterviewSession';

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

const InterviewSessionResult = ({
  sessionId,
  isOwner,
  onLoaded
}) => {
  const {
    calculateInterviewSession,
    getAverageScore,
    getInterviewSession
  } = useApi();
  const [interviewSession, setInterviewSession] = useState({ candidateUser: {} });
  const [averageScore, setAverageScore] = useState({ sectionsAverageScore: [{ averageSectionScore: 0 }] });
  const [calculating, setCalculating] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInterviewSession(sessionId)
      .then((interviewS) => {
        setInterviewSession(interviewS);
        onLoaded(interviewS);
        getAverageScore(sessionId)
          .then((res) => {
            setAverageScore({ scoreDiff: (interviewS.score - res.averageScore.averageScore) * 100, ...res });
            setLoading(false);
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
  '';
  return (
    <Layout>
      {/*<AnchorSilder/>*/}
      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
        <Layout.Content>
          <Descriptions column={2}>
            <Descriptions.Item
              label="Specialization"
            >
              {interviewSession.interview?.specialization.name}
            </Descriptions.Item>
            <Descriptions.Item
              label="Job Title">{interviewSession.interview?.jobTitle}</Descriptions.Item>
            <Descriptions.Item
              span={2}
              style={{ whiteSpace: 'pre-line' }}
            >
              {interviewSession.interview?.description}
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
            >
              <AuthorBy
                author={interviewSession.interview?.clientUser.email}
                avatarSrc={interviewSession.interview?.clientUser.avatar}
              />
            </Descriptions.Item>
          </Descriptions>
          {
            !loading && interviewSession.status === 'ENDED' && interviewSession.answerAttemptSections
            && (
              <StyledScoresRow gutter={[16, 32]}>
                {
                  interviewSession.interview?.sections.map((section, index) => {
                    let sectionScore = 0;
                    let sectionScoreDiff = 0;
                    if (interviewSession.answerAttemptSections[section.id]) {
                      const { answerStats } = interviewSession.answerAttemptSections[section.id];
                      sectionScore = Math.round(answerStats.MULTI_CHOICE.correct / answerStats.MULTI_CHOICE.questionTotal * 100);
                    }
                    sectionScoreDiff = sectionScore - averageScore.sectionsAverageScore[index]?.averageSectionScore * 100;
                    return (
                      <Col key={section.id} justify="center" style={{ textAlign: 'center' }}>
                        <Tooltip
                          title={`Compares to average score: ${averageScore.sectionsAverageScore[index]?.averageSectionScore * 100}`}>
                          <Statistic
                            value={sectionScoreDiff}
                            valueStyle={{ color: sectionScoreDiff === 0 ? '#276dba' : (sectionScoreDiff > 0 ? '#138651' : 'red') }}
                            prefix={sectionScoreDiff === 0 ? '= ' : (sectionScoreDiff > 0
                              ? <ArrowUpOutlined/> : <ArrowDownOutlined/>)}
                          />
                          <Progress
                            type="circle"
                            percent={sectionScore}
                            width={70}
                            format={(score) => score}
                            status={sectionScore < averageScore.sectionsAverageScore[index]?.averageSectionScore * 100 ? 'exception' : ''}
                          />
                          <div>{section.title}</div>
                        </Tooltip>
                      </Col>
                    );
                  })
                }
                <StyleTotalScoreCol justify="center">
                  <Tooltip
                    title={`Compares to average score: ${averageScore.averageScore?.averageScore * 100}`}>
                    <Statistic
                      value={averageScore.scoreDiff}
                      valueStyle={{ color: averageScore.scoreDiff === 0 ? '#2f9eba' : (averageScore.scoreDiff > 0 ? '#3f8600' : 'red') }}
                      prefix={averageScore.scoreDiff === 0 ? '-' : (averageScore.scoreDiff > 0
                        ? <ArrowUpOutlined/> : <ArrowDownOutlined/>)}
                    />
                    <Progress
                      type="circle"
                      percent={interviewSession.score * 100}
                      format={(score) => score}
                      status={interviewSession.score < averageScore.averageScore?.averageScore ? 'exception' : ''}
                    />
                  </Tooltip>
                </StyleTotalScoreCol>
              </StyledScoresRow>
            )
          }
          {
            !loading
            && <InterviewSession interviewSession={interviewSession} preview/>
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
  );
};
InterviewSessionResult.propTypes = {
  isOwner: PropTypes.bool,
  onLoaded: PropTypes.func,
  sessionId: PropTypes.string.isRequired
};

InterviewSessionResult.defaultProps = {
  isOwner: false,
  sessionId: '',
  onLoaded: () => {
  }
};

export default InterviewSessionResult;
