import {
  Button, Descriptions, Layout, Modal, Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Countdown from 'antd/lib/statistic/Countdown';
import AnchorSilder from '../Sider/AnchorSider';
import Headline from '../Article/Headline';
import {
  createInterviewSession, getInterview, getInterviewSession, startInterviewSession,
} from '../../utils/api';
import { getUserInfo } from '../../utils/auth';
import InterviewSession from './InterviewSession';

const { email } = getUserInfo();
const Interview = ({ id, sessionId = '' }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [deadline, setDeadline] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [interview, setInterview] = useState({ specialization: { name: '' }, clientAccount: { email: '' } });
  const [interviewSession, setInterviewSession] = useState(null);

  const startInterviewS = (interviewS) => {
    setIsTesting(true);
    setDeadline(Date.now() + interviewS.duration * 60 * 1000);
    setLoading(false);
    setInterviewSession(interviewS);
  };

  useEffect(() => {
    if (sessionId) {
      getInterviewSession(sessionId).then((interviewS) => {
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
    getInterview(id).then((data = {}) => {
      setLoading(false);
      setInterview(data);
    });
  }, []);

  const startTest = () => {
    setIsTestModalVisible(false);
    if (sessionId) {
      startInterviewSession(sessionId).then((interviewS) => {
        startInterviewS(interviewS);
      });
      return;
    }
    createInterviewSession({ id, email, name: email.split('@')[0] }).then(({ id: createdSessionId }) => {
      startInterviewSession(createdSessionId).then((interviewS) => {
        startInterviewS(interviewS);
      });
    });
  };

  const handleEndInterviewSession = () => {
    setIsTesting(false);
  };

  const isOwner = email === interview.clientAccount.email;
  return (
    <>
      <Headline title={interview.title} />
      <Layout>
        <AnchorSilder />
        <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
          <Layout.Content>
            {
              isTesting && interviewSession && interviewSession.duration !== -1
              && <Countdown title="Remaining" value={deadline} format="HH:mm:ss" />
            }
            <Descriptions column={2}>
              <Descriptions.Item label="Specialization">{interview.specialization.name}</Descriptions.Item>
              <Descriptions.Item label="Job Title">{interview.jobTitle}</Descriptions.Item>
              <Descriptions.Item span={2}>{interview.description}</Descriptions.Item>
            </Descriptions>
            {
              isOwner
              && <InterviewSession interviewSession={{ interview }} preview />
            }
            {
              interviewSession && <InterviewSession interviewSession={interviewSession} onEndInterviewSession={handleEndInterviewSession} />
            }
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
