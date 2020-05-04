import {
  Badge, Button, Col, Descriptions, Layout, Modal, Row, Spin, Statistic, Tag,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined, SyncOutlined, UserOutlined } from '@ant-design/icons';
import Countdown from 'antd/lib/statistic/Countdown';
import styled from 'styled-components';
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
import { getUserInfo } from '../../utils/auth';
import InterviewSession from './InterviewSession';

const { email } = getUserInfo();

const StyledInterviewGeekStatus = styled.div`
  margin: 30px 0 20px;
`;

const Interview = ({ id, sessionId = '', publishedId = '' }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [interview, setInterview] = useState({
    specialization: { name: '' },
    clientAccount: { email: '' },
  });
  const [interviewSession, setInterviewSession] = useState(null);
  const isOwner = email === interview.clientAccount.email;

  const startInterviewS = (interviewS) => {
    setIsTesting(true);
    setDeadline(Date.now() + interviewS.duration * 60 * 1000);
    setLoading(false);
    setInterviewSession(interviewS);
  };

  useEffect(() => {
    if (publishedId) {
      getPublishedInterview(publishedId).then((pi) => {
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
      }).catch(() => {
        getInterview(id).then((i) => {
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
              && <Countdown title="Remaining" value={deadline} format="HH:mm:ss" />
            }
            <Descriptions column={2}>
              <Descriptions.Item
                label="Specialization"
              >
                {interview.specialization.name}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title">{interview.jobTitle}</Descriptions.Item>
              <Descriptions.Item span={2}>{interview.description}</Descriptions.Item>
            </Descriptions>
            {
              !interviewSession && !isOwner
              && (
                <>
                  <Button type="primary" onClick={() => setIsTestModalVisible(true)}>
                    Start Testing Interview
                  </Button>
                  <Modal
                    title="Start Testing Interview"
                    visible={isTestModalVisible}
                    onOk={startTest}
                    onCancel={() => setIsTestModalVisible(false)}
                  >
                    <p>Start testing the Interview!!</p>
                    {
                      interviewSession && interviewSession.duration !== -1
                      && <p>{`You will have ${interviewSession.duration} minutes complete the interview.`}</p>
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
                      <Statistic title={<Badge status="processing" text="In Testing" />} value={11} prefix={<UserOutlined />} suffix=" geeks" />
                    </Col>
                    <Col span={12}>
                      <Statistic title={<Badge status="success" text="Completed" />} value={93} prefix={<UserOutlined />} suffix=" geeks" />
                    </Col>
                  </Row>
                </StyledInterviewGeekStatus>
              )
            }
            {
              isOwner
              && <InterviewSession interviewSession={{ interview }} preview />
            }
            {
              interviewSession && (
                <InterviewSession
                  interviewSession={interviewSession}
                  onEndInterviewSession={handleEndInterviewSession}
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
