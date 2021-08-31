import { Col, Layout, Modal, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';
import moment from 'moment';
import { useAuth0 } from '@auth0/auth0-react';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import Headline from '../Article/Headline';
import InterviewSession from './InterviewSession';
import LoginPrompt from '../Login/LoginPrompt';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import InterviewActionsRow from './InterviewActionsRow';
import ShareInterview from './ShareInterview';
import ConfirmModal from '../Organization/ConfirmModal';
import { guest } from '../../../content/meta/config';
import ContentLayout from '../Layout/ContentLayout';
import InterviewDescription from './InterviewDescription';
import Icon from '../Icon/Icon';

const StyledInterviewGeekStatus = styled.div`
  margin: 30px 0 20px;
`;

const Interview = ({
  id,
  sessionId = '',
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
    if (sessionId) {
      getInterviewSession(sessionId)
        .then((interviewS) => {
          const is = {
            ...interviewS,
            interview: {
              ...interviewS.interview,
              groupedInterviewSessions: interviewS.groupedInterviewSessions
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
            groupedInterviewSessions: interviewS.groupedInterviewSessions
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
          !loading && <ShareInterview id={interview.id}/>
        }
        {
          !loading && isOwner
          &&
          <InterviewActionsRow
            interview={interview}
            onDeleted={() => navigate('/interviews')}
          />
        }
      </Headline>
      <ContentLayout loading={loading}>
        {/*<AnchorSider />*/}
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
            <InterviewDescription interview={interview}
                                  collapse={isTesting}/>
            {
              !isTesting
              && (
                <StyledInterviewGeekStatus>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Icon type="assessmentTesting"/>
                      <FormattedMessage id="assessment.testing.count"
                                        defaultMessage="{people} In Testing"
                                        values={{ people: (interview.groupedInterviewSessions?.STARTED?.length ?? 0) + (interview.groupedInterviewSessions?.NOT_STARTED?.length ?? 0) }}
                      />
                    </Col>
                    <Col span={12}>
                      <Icon type="assessmentTested"/>
                      <FormattedMessage id="assessment.completed.count"
                                        defaultMessage="{people} Completed"
                                        values={{ people: interview.groupedInterviewSessions?.ENDED?.length ?? 0 }}
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
                        submitButtonTitle={intl.formatMessage({ defaultMessage: 'Start' })}
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
      </ContentLayout>
      <Seo subTitle={interview.title}/>
    </>
  );
};

export default Interview;
