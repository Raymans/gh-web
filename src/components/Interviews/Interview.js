import {
  Badge, Button, Col, Descriptions, Layout, Modal, Row, Spin, Statistic, Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  ExclamationCircleOutlined,
  LoadingOutlined,
  SyncOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';
import moment from 'moment';
import AnchorSilder from '../Sider/AnchorSider';
import Headline from '../Article/Headline';
import {
  createInterviewSession,
  getCurrentInterviewSession,
  getInterview,
  getInterviewSession,
  getPublishedInterview,
  startInterviewSession,
} from '../../utils/api';
import { getUserInfo, isAuthenticated, login } from '../../utils/auth';
import InterviewSession from './InterviewSession';

const { sub, email } = getUserInfo();

const StyledInterviewGeekStatus = styled.div`
  margin: 30px 0 20px;
`;

const Interview = ({
  id, sessionId = '', publishedId = '', location,
}) => {
  const [isTesting, setIsTesting] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isLoginPrompt, setIsLoginPrompt] = useState(false);
  const [interview, setInterview] = useState({
    specialization: { name: '' },
    clientAccount: { email: '' },
  });
  const [interviewSession, setInterviewSession] = useState(null);
  const isOwner = sub === interview.clientAccount.id;

  const handleTimesUp = () => {
    Modal.warning({
      title: 'Times Up',
      icon: <ExclamationCircleOutlined />,
      content: 'This interview Result is submitted automatically since you already passed interview time.',
      onOk() {
        setIsTimeUp(true);
      },
    });
  };

  const startInterviewS = (interviewS) => {
    let timeOfEnd = -1;
    setIsTesting(!interviewS.interviewEndDate);
    if (!interviewS.interviewEndDate && interviewS.duration !== -1) {
      timeOfEnd = moment(new Date(interviewS.interviewStartDate)).add(interviewS.duration, 'm');
      if (moment(Date.now()).isAfter(timeOfEnd)) {
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
    if (publishedId) {
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
          if (interviewS.interviewStartDate) {
            setInterview(interviewS.interview);
            startInterviewS(interviewS);
            return;
          }
          setLoading(false);
          setInterview(interviewS.interview);
        });
      return;
    }
    getCurrentInterviewSession({ id })
      .then((is) => {
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
    setIsTestModalVisible(false);
    if (sessionId) {
      startInterviewSession(sessionId)
        .then((interviewS) => {
          startInterviewS(interviewS);
        });
      return;
    }
    createInterviewSession({
      id,
      email,
      name: email.split('@')[0],
    })
      .then(({ id: createdSessionId }) => {
        startInterviewSession(createdSessionId)
          .then((interviewS) => {
            startInterviewS(interviewS);
          });
      });
  };

  const handleEndInterviewSession = () => {
    setIsTesting(false);
  };

  const handleOpenTestPrompt = () => {
    isAuthenticated() ? setIsTestModalVisible(true) : setIsLoginPrompt(true);
  };

  return (
    <>
      <Headline title={interview.title}>
        <Tag icon={<SyncOutlined spin />} color="processing">
          Hiring
        </Tag>
      </Headline>
      <Layout>
        <AnchorSilder />
        <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
          <Layout.Content>
            {
              isTesting && interviewSession && interviewSession.duration !== -1
              && <Countdown title="Remaining" value={deadline} format="HH:mm:ss" onFinish={handleTimesUp} />
            }
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
              !interviewSession && !isOwner
              && (
                <>
                  <Button type="primary" onClick={() => handleOpenTestPrompt()}>
                    Start Testing Interview
                  </Button>
                  <Modal
                    title="Login to Test Interview"
                    visible={isLoginPrompt}
                    onCancel={() => setIsLoginPrompt(false)}
                    footer={[
                      <Button key="submit" type="primary" onClick={() => login(location.pathname)}>
                        Login
                      </Button>,
                    ]}
                  >
                    <p>You have to Login to continue testing this Interview!</p>
                  </Modal>
                  <Modal
                    title="Start Testing Interview"
                    visible={isTestModalVisible}
                    onOk={startTest}
                    onCancel={() => setIsTestModalVisible(false)}
                  >
                    <p>Start testing the Interview!!</p>
                    {
                      (interviewSession?.duration !== -1 || interview.defaultDuration !== -1)
                      && <p>{`You will have ${interviewSession?.duration || interview.defaultDuration} minutes complete the interview.`}</p>
                    }

                  </Modal>
                </>
              )
            }
            {
              !isTesting
              && (
                <StyledInterviewGeekStatus>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Statistic
                        title={<Badge status="processing" text="In Testing" />}
                        value={11}
                        prefix={<UserOutlined />}
                        suffix=" geeks"
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title={<Badge status="success" text="Completed" />}
                        value={93}
                        prefix={<UserOutlined />}
                        suffix=" geeks"
                      />
                    </Col>
                  </Row>
                </StyledInterviewGeekStatus>
              )
            }
            {
              isOwner
              && <InterviewSession interviewSession={{ interview }} preview viewResult={false} />
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
        </Spin>
      </Layout>
    </>
  );
};

export default Interview;
