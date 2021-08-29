import { ShareAltOutlined } from '@ant-design/icons';
import { Button, Divider, Form, message, Modal } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import Search from 'antd/es/input/Search';
import useApi from '../../hooks/useApi';
import { useForm } from 'antd/lib/form/Form';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import copy from 'copy-to-clipboard';

const StyleReSendRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: #e0e5e6 1px solid;
  margin-bottom: 11px;

  button {
    margin-left: auto;
  }
`;

const ShareInterview = ({ id }) => {
  const {
    getInterviewSessions,
    sendInterviewSessionToCandidate,
    createInterviewSession
  } = useApi();
  const {
    isAuthenticated
  } = useAuth0();
  const shareLink = `https://geekhub.tw/interviews/${id}`;
  const [sharedForm] = useForm();
  const [sending, setSending] = useState({ sending: false });
  const [sharedEmails, setSharedEmails] = useState([]);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const intl = useIntl();

  const handleShareEmail = (value) => {
    sharedForm.validateFields()
      .then(() => {
        setSending({
          ...sending,
          sending: true
        });
        createInterviewSession({
          id,
          email: value,
          name: value.split('@')[0]
        })
          .then(({ id: interviewSessionId }) => {
            sendInterviewSessionToCandidate({ id: interviewSessionId })
              .then(() => {
                if (!sharedEmails.includes(value)) {
                  setSharedEmails([...sharedEmails, value]);
                }
                setSending({
                  ...sending,
                  sending: false
                });
                message.success(intl.formatMessage({ defaultMessage: 'Sent Assessment to {interviewee}' }, { interviewee: value }));
              });
          });
      });
  };

  return (
    <>
      <Button
        icon={<ShareAltOutlined/>}
        onClick={() => {
          setIsShareModalVisible(true);
        }}
      />
      <Modal
        title={intl.formatMessage({ defaultMessage: 'Share Assessment' })}
        centered
        visible={isShareModalVisible}
        onCancel={() => setIsShareModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsShareModalVisible(false)}>
            <FormattedMessage defaultMessage="Close"/>
          </Button>
        ]}
      >
        <Search
          placeholder={intl.formatMessage({ defaultMessage: 'Email' })}
          value={shareLink}
          enterButton={<FormattedMessage defaultMessage="Copy"/>}
          onSearch={() => {
            copy(shareLink);
            message.info(intl.formatMessage({ defaultMessage: 'Copied.' }));
          }}
        />
        {
          isAuthenticated &&
          <>
            <Divider><FormattedMessage defaultMessage="Or"/></Divider>
            <Form form={sharedForm}>
              <Form.Item
                name="email"
                rules={[{
                  required: true,
                  message: <FormattedMessage defaultMessage="Please input email format."/>,
                  type: 'email'
                }]}>
                <Search
                  name="email"
                  placeholder={intl.formatMessage({ defaultMessage: 'Email' })}
                  enterButton={intl.formatMessage({ defaultMessage: 'Send' })}
                  loading={sending.sending}
                  onSearch={handleShareEmail}
                />
              </Form.Item>
            </Form>
          </>
        }
      </Modal>
    </>
  );
};

export default ShareInterview;
