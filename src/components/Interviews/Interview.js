import {
  Button, Descriptions, Layout, Modal, Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import AnchorSilder from '../Sider/AnchorSider';
import Headline from '../Article/Headline';
import {
  createInterviewSession, getInterview, getInterviewSession, startInterviewSession,
} from '../../utils/api';
import { getUserInfo } from '../../utils/auth';
import InterviewSession from './InterviewSession';

const Interview = ({ id, sessionId = '' }) => {
  const [loading, setLoading] = useState(true);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [interview, setInterview] = useState({ specialization: { name: '' } });
  const [interviewSession, setInterviewSession] = useState(null);
  useEffect(() => {
    if (sessionId) {
      getInterviewSession(sessionId).then(({ interview }) => {
        setLoading(false);
        setInterview(interview);
      });
      return;
    }
    getInterview(id).then((data = {}) => {
      setLoading(false);
      setInterview(data);
    });
  }, []);

  const startTest = () => {
    setIsTestModalVisible(false);
    const { email } = getUserInfo();
    if (sessionId) {
      startInterviewSession(sessionId).then((interviewS) => {
        setInterviewSession(interviewS);
      });
      return;
    }
    createInterviewSession({ id, email }).then(({ id: sessionId }) => {
      startInterviewSession(sessionId).then((interviewS) => {
        setInterviewSession(interviewS);
      });
    });
  };
  return (
    <>
      <Headline title={interview.title} />
      <Layout>
        <AnchorSilder />
        <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
          <Layout.Content>
            <Descriptions column={2}>
              <Descriptions.Item label="Specialization">{interview.specialization.name}</Descriptions.Item>
              <Descriptions.Item label="Job Title">{interview.jobTitle}</Descriptions.Item>
              <Descriptions.Item span={2}>{interview.description}</Descriptions.Item>
            </Descriptions>
            {
              interviewSession && <InterviewSession interviewSession={interviewSession} />
            }
            {
              !interviewSession
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
                    <p>You will have 60 minutes complete the interview.</p>
                  </Modal>
                </>
              )
            }

            {/* <h2 id="sections1">Q.1</h2> */}
            {/* <QuestionGrid questionId={1} showAuthor={false} answerDisplayMode="inline" /> */}
            {/* <QuestionGrid questionId={2} /> */}
            {/* <QuestionGrid questionId={3} /> */}
            {/* <h2 id="sections2">Q.2</h2> */}
            {/* <QuestionGrid questionId={4} /> */}
          </Layout.Content>
        </Spin>
      </Layout>
    </>
  );
};

export default Interview;
