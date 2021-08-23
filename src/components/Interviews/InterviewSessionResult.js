import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Descriptions,
  Layout,
  message,
  Progress,
  Row,
  Spin,
  Statistic,
  Tooltip
} from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useApi from '../../hooks/useApi';
import AuthorBy from '../AuthorBy';
import InterviewSession from './InterviewSession';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import Moment from 'react-moment';

const StyleTotalScoreCol = styled(Col)`
  text-align: center;
  margin-left: auto;
  margin-right: 35px;
`;

const StyledScoresRow = styled(Row)`
  .ant-statistic-content-prefix {
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
  const intl = useIntl();
  const [interviewSession, setInterviewSession] = useState({ candidateUser: {} });
  const [averageScore, setAverageScore] = useState({ sectionsAverageScore: [{ averageSectionScore: 0 }] });
  const [calculating, setCalculating] = useState(false);
  const [loading, setLoading] = useState(true);
  const isAnswerVisible = isOwner || interviewSession.interview?.releaseResult === 'YES';
  useEffect(() => {
    getInterviewSession(sessionId)
      .then((interviewS) => {
        setInterviewSession(interviewS);
        onLoaded(interviewS);
        getAverageScore(sessionId)
          .then((res) => {
            setAverageScore({ scoreDiff: (interviewS.totalScore - res.averageScore.averageScore) * 100, ...res });
            setLoading(false);
          });
      });
  }, []);

  const handleCalculateScore = () => {
    setCalculating(true);
    calculateInterviewSession(sessionId)
      .then((is) => {
        setInterviewSession(is);
        getAverageScore(sessionId)
          .then((res) => {
            setAverageScore({ scoreDiff: (is.totalScore - res.averageScore.averageScore) * 100, ...res });
            setCalculating(false);
            message.success(intl.formatMessage({
              id: 'assessment.session.message.score.calculated.success',
              defaultMessage: 'Score has been calculated Successfully!'
            }));
          });
      });
  };
  return (
    <Layout>
      {/*<AnchorSider/>*/}
      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
        <Layout.Content>
          <Descriptions column={2}>
            {/*<Descriptions.Item*/}
            {/*  label={intl.formatMessage({ defaultMessage: 'Specialization' })}*/}
            {/*>*/}
            {/*  {interviewSession.interview?.specialization.name}*/}
            {/*</Descriptions.Item>*/}
            <Descriptions.Item
              label={intl.formatMessage({ defaultMessage: 'Job Title' })}>{interviewSession.interview?.jobTitle}</Descriptions.Item>
            <Descriptions.Item
              label={<FormattedMessage defaultMessage="Updated on"/>}>
              <Moment date={interviewSession.interview?.lastModifiedDate} format="ll"/>
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
              style={{
                whiteSpace: 'pre-line',
                fontSize: '20px'
              }}
            >
              <p dangerouslySetInnerHTML={{ __html: interviewSession.interview?.description }}/>
            </Descriptions.Item>
            <Descriptions.Item
              span={2}
            >
              <AuthorBy
                clientUser={interviewSession.interview?.clientUser}
              />
            </Descriptions.Item>
          </Descriptions>
          {
            !loading && interviewSession.status === 'ENDED' && interviewSession.answerAttemptSections && isAnswerVisible
            && (
              <StyledScoresRow gutter={[16, 32]}>
                {
                  interviewSession.interview?.sections.map((section, index) => {
                    let sectionScore = 0;
                    let sectionScoreDiff = 0;
                    if (interviewSession.answerAttemptSections[section.id]) {
                      const { answerStats } = interviewSession.answerAttemptSections[section.id];
                      sectionScore = Math.round((answerStats.MULTI_CHOICE.correct + answerStats.SHORT_ANSWER.correct) / (answerStats.MULTI_CHOICE.questionTotal + answerStats.SHORT_ANSWER.questionTotal) * 100);
                    }
                    const sectionsAvgScore = averageScore.sectionsAverageScore.find((element) => element.sectionId === section.id);
                    const averageSectionScore = Math.round(sectionsAvgScore?.averageSectionScore * 100 ?? 0);
                    sectionScoreDiff = sectionScore - averageSectionScore;
                    return (
                      <Col key={section.id} justify="center" style={{ textAlign: 'center' }}>
                        <Tooltip
                          title={section.title}
                        >
                          <Progress
                            type="circle"
                            percent={sectionScore}
                            width={70}
                            format={(score) => score}
                            status={sectionScore < averageSectionScore ? 'exception' : ''}
                          />
                          {/*<div>{section.title}</div>*/}
                        </Tooltip>
                        <Tooltip
                          title={<FormattedMessage
                            defaultMessage="Compares to average score: {averageSectionScore}"
                            values={{ averageSectionScore: averageSectionScore }}/>}>
                          <Statistic
                            value={sectionScoreDiff}
                            valueStyle={{ color: sectionScoreDiff === 0 ? '#276dba' : (sectionScoreDiff > 0 ? '#138651' : 'red') }}
                            prefix={sectionScoreDiff === 0 ? '= ' : (sectionScoreDiff > 0
                              ? <ArrowUpOutlined/> : <ArrowDownOutlined/>)}
                          />
                        </Tooltip>
                      </Col>
                    );
                  })
                }
                <StyleTotalScoreCol justify="center">
                  <Tooltip
                    title={<FormattedMessage
                      defaultMessage="Compares to average score: {averageScore}"
                      values={{ averageScore: averageScore.averageScore?.averageScore * 100 }}/>}>
                    <Progress
                      type="circle"
                      percent={interviewSession.totalScore * 100}
                      format={(totalScore) => totalScore}
                      status={interviewSession.totalScore < averageScore.averageScore?.averageScore ? 'exception' : ''}
                    />
                    <Statistic
                      value={averageScore.scoreDiff}
                      valueStyle={{ color: averageScore.scoreDiff === 0 ? '#2f9eba' : (averageScore.scoreDiff > 0 ? '#3f8600' : 'red') }}
                      prefix={averageScore.scoreDiff === 0 ? '= ' : (averageScore.scoreDiff > 0
                        ? <ArrowUpOutlined/> : <ArrowDownOutlined/>)}
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
              <FormattedMessage defaultMessage=" Calculate Score"/>
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
