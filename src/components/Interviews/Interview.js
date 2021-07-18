import { Badge, Col, Descriptions, Layout, Modal, Row, Spin, Statistic, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import Headline from '../Article/Headline';
import InterviewSession from './InterviewSession';
import LoginPrompt from '../Login/LoginPrompt';
import AuthorBy from '../AuthorBy';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import Moment from 'react-moment';
import InterviewActionsRow from './InterviewActionsRow';
import ShareInterview from './ShareInterview';
import ConfirmModal from '../Organization/ConfirmModal';
import { guest } from '../../../content/meta/config';

const StyledInterviewGeekStatus = styled.div`
  margin: 30px 0 20px;
`;

const StyledDescription = styled.div`
  font-size: 16px;
  margin: 10px 0;
`;

const Interview = ({
  id,
  sessionId = '',
  publishedId = '',
  isGetStarted = false,
  onSubmit = () => {
  }
}) => {
  const {
    user
  } = useAuth0();
  const {
    createInterviewSession,
    getCurrentInterviewSession,
    getInterview,
    getInterviewSession,
    getPublishedInterview,
    startInterviewSession
  } = useApi();
  const intl = useIntl();
  const [isTesting, setIsTesting] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState({
    specialization: { name: '' },
    clientUser: { email: '' }
  });
  const [interviewSession, setInterviewSession] = useState(null);
  const isOwner = user?.sub === interview.clientUser.id;
  const isViewPublished = publishedId !== '';

  const handleTimesUp = () => {
    Modal.warning({
      title: intl.formatMessage({ defaultMessage: 'Times Up' }),
      icon: <ExclamationCircleOutlined/>,
      content: intl.formatMessage({ defaultMessage: 'This assessment Result is submitted automatically since you already passed assessment time.' }),
      onOk() {
        setIsTimeUp(true);
      }
    });
  };

  const startInterviewS = (interviewS) => {
    let timeOfEnd = -1;
    setIsTesting(!interviewS.interviewEndDate);
    if (!interviewS.interviewEndDate && interviewS.duration > 0) {
      timeOfEnd = moment(new Date(interviewS.interviewStartDate))
        .add(interviewS.duration, 'm');
      if (moment(Date.now())
        .isAfter(timeOfEnd)) {
        handleTimesUp();
        setIsTesting(false);
      } else {
        setDeadline(timeOfEnd);
      }
    }
    setLoading(false);
    setInterviewSession(interviewS);
  };

  useEffect(() => {
    if (isViewPublished) {
      getPublishedInterview(publishedId)
        .then((pi) => {
          setInterview(pi.interview);
          setLoading(false);
        });
      return;
    }
    if (sessionId) {
      getInterviewSession(sessionId)
        .then((interviewS) => {
          const is = {
            ...interviewS,
            interview: {
              ...interviewS.interview,
              interviewSessions: interviewS.groupedInterviewSessions
            }
          };
          if (is.interviewStartDate) {
            setInterview(is.interview);
            startInterviewS(is);
            return;
          }
          setLoading(false);
          setInterview(is.interview);
        });
      return;
    }
    getCurrentInterviewSession({ id })
      .then((interviewS) => {
        const is = {
          ...interviewS,
          interview: {
            ...interviewS.interview,
            interviewSessions: interviewS.groupedInterviewSessions
          }
        };
        setLoading(false);
        setInterview(is.interview);
        startInterviewS(is);
      })
      .catch(() => {
        getInterview(id)
          .then((i) => {
            setLoading(false);
            setInterview(i);
          });
      });
  }, []);

  const startTest = () => {
    if (sessionId) {
      startInterviewSession(sessionId)
        .then((interviewS) => {
          startInterviewS(interviewS);
        });
      return;
    }
    createInterviewSession({
      id,
      email: user?.email ?? guest.email,
      name: user?.email.split('@')[0] ?? guest.name
    })
      .then(({ id: createdSessionId }) => {
        startInterviewSession(createdSessionId)
          .then((interviewS) => {
            startInterviewS(interviewS);
          });
      });
  };

  const handleEndInterviewSession = (id) => {
    setIsTesting(false);
    onSubmit(id);
  };

  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage defaultMessage="List Assessments"/>,
        path: '/interviews'
      }, {
        label: interview.title,
        path: location.pathname
      }]}
      />
      <Headline title={interview.title}>
        {
          !isViewPublished &&
          <>
            {
              !loading && <ShareInterview id={interview.id}/>
            }
            {
              !loading && isOwner
              &&
              <InterviewActionsRow
                id={id}
                interviewTitle={interview.title}
                onDeleted={() => navigate('/interviews')}
              />
            }
            {
              isOwner && interview.publishedInterviewId
              &&
              <a
                href={location.pathname.replace(`${id}`, `${interview.publishedInterviewId}/published`)}
                target="_blank">
                <FormattedMessage defaultMessage="view live version"/></a>
            }
          </>
        }
      </Headline>
      <Layout>
        {/*<AnchorSider />*/}
        <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
          {!loading && (
            <Layout.Content>
              {
                isTesting && interviewSession && interviewSession.duration > 0
                && (
                  <Countdown
                    title="Remaining"
                    value={deadline}
                    format="HH:mm:ss"
                    onFinish={handleTimesUp}
                  />
                )
              }
              <Descriptions column={2}>
                {/*<Descriptions.Item*/}
                {/*  label={intl.formatMessage({ defaultMessage: 'Specialization' })}*/}
                {/*>*/}
                {/*  {interview.specialization.name}*/}
                {/*</Descriptions.Item>*/}

                <Descriptions.Item
                  span={2}
                >
                  {isOwner && interview.visibility === 'PRIVATE' &&
                  <Tag color="default"><FormattedMessage defaultMessage="private"/></Tag>
                  }
                  {isViewPublished &&
                  <Tag color="default"><FormattedMessage defaultMessage="Published Version"/></Tag>
                  }
                </Descriptions.Item>

                <Descriptions.Item
                  label={intl.formatMessage({ defaultMessage: 'Job Title' })}>{interview.jobTitle}</Descriptions.Item>
                <Descriptions.Item
                  label={<FormattedMessage defaultMessage="Updated on"/>}>
                  <Moment date={interview.lastModifiedDate} format="ll"/>
                </Descriptions.Item>
                <Descriptions.Item
                  span={2}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  <StyledDescription>{interview.description}</StyledDescription>
                </Descriptions.Item>
                <Descriptions.Item
                  span={2}
                >
                  <AuthorBy
                    clientUser={interview.clientUser}
                  />
                </Descriptions.Item>
              </Descriptions>
              {
                !isTesting
                && (
                  <StyledInterviewGeekStatus>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic
                          title={<Badge status="processing"
                                        text={intl.formatMessage({ defaultMessage: 'In Testing' })}/>}
                          value={(interview.interviewSessions?.STARTED?.length ?? 0) + (interview.interviewSessions?.NOT_STARTED?.length ?? 0)}
                          prefix={<UserOutlined/>}
                          suffix={intl.formatMessage({ defaultMessage: ' People' })}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title={<Badge status="success"
                                        text={intl.formatMessage({ defaultMessage: 'Completed' })}/>}
                          value={interview.interviewSessions?.ENDED?.length ?? 0}
                          prefix={<UserOutlined/>}
                          suffix={intl.formatMessage({ defaultMessage: ' People' })}
                        />
                      </Col>
                    </Row>
                  </StyledInterviewGeekStatus>
                )
              }
              {
                !interviewSession && !isOwner
                && (
                  <>
                    <LoginPrompt
                      title={intl.formatMessage({ defaultMessage: 'Login to Test Assessment' })}
                      isLoginNeeded={!isGetStarted}
                    >
                      {(isAuth) => (
                        <ConfirmModal
                          title={intl.formatMessage({ defaultMessage: 'Test the assessment' })}
                          onOK={startTest}
                          onOpen={() => isAuth ? Promise.resolve() : Promise.reject()}
                          openButtonTitle={intl.formatMessage({ defaultMessage: 'Start Testing Assessment' })}
                          openButtonType={'primary'}
                          successMessage={intl.formatMessage({ defaultMessage: 'Testing the assessment' })}
                        >
                          <p><FormattedMessage defaultMessage="Start testing the assessment!!"/></p>
                          {
                            (interviewSession?.duration > 0 || interview.defaultDuration > 0)
                            &&
                            <p>
                              <FormattedMessage
                                defaultMessage="You will have {duration} minutes complete the assessment."
                                values={{ duration: interviewSession?.duration || interview.defaultDuration }}/>
                            </p>
                          }
                        </ConfirmModal>
                      )}
                    </LoginPrompt>
                  </>
                )
              }
              {
                isOwner
                && <InterviewSession interviewSession={{ interview }} preview viewResult={false}/>
              }
              {
                interviewSession && (
                  <InterviewSession
                    interviewSession={interviewSession}
                    onEndInterviewSession={handleEndInterviewSession}
                    endSession={isTimeUp}
                  />
                )
              }
            </Layout.Content>
          )}
        </Spin>
      </Layout>
      <Seo subTitle={interview.title}/>
    </>
  );
};

export default Interview;
