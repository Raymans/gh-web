import { ShareAltOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component';
import Search from 'antd/es/input/Search';
import useApi from '../../hooks/useApi';
import { useForm } from 'antd/lib/form/Form';
import styled from 'styled-components';

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
  const shareLink = `https://geekhub.tw/interviews/${id}`;
  const [sharedForm] = useForm();
  const [sending, setSending] = useState({ sending: false });
  const [sharedEmails, setSharedEmails] = useState([]);
  const [loadingSharedEmails, setLoadingSharedEmails] = useState(true);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const intl = useIntl();

  const handleResendEmail = (value) => {
    sending[value] = true;
    setSending({ ...sending });
    sendInterviewSessionToCandidate({ id })
      .then(() => {
        if (!sharedEmails.includes(value)) {
          setSharedEmails([...sharedEmails, value]);
        }
        sending[value] = false;
        setSending({ ...sending });
        message.success(intl.formatMessage({ defaultMessage: 'Sent Assessment to {interviewee}' }, { interviewee: value }));
      });
  };

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
        style={{ marginRight: '3px' }}
        onClick={() => {
          setIsShareModalVisible(true);
          getInterviewSessions({ interviewId: id })
            .then(({ results = [] }) => {
              setSharedEmails(results.map((interviewSession) => interviewSession.userEmail));
              setLoadingSharedEmails(false);
            });
        }}
      />
      <Modal
        title={intl.formatMessage({ defaultMessage: 'Share Assessment' })}
        visible={isShareModalVisible}
        onCancel={() => setIsShareModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsShareModalVisible(false)}>
            <FormattedMessage defaultMessage="Close"/>
          </Button>
        ]}
      >
        <div style={{ display: 'flex' }}>
          <Input placeholder={intl.formatMessage({ defaultMessage: 'Email' })} size="small"
                 value={shareLink}/>
          <CopyToClipboard
            text={shareLink}
            onCopy={() => message.info(intl.formatMessage({ defaultMessage: 'Copied.' }))}
          >
            <Button><FormattedMessage defaultMessage="Copy"/></Button>
          </CopyToClipboard>
        </div>
        <Divider orientation="left"><FormattedMessage defaultMessage="Or"/></Divider>
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

        {!loadingSharedEmails && sharedEmails.map((sharedEmail) => (
          <StyleReSendRow key={sharedEmail}>
            <span>{sharedEmail}</span>
            <Button
              onClick={handleResendEmail.bind(this, sharedEmail)}
              loading={sending[sharedEmail]}
            >
              <FormattedMessage defaultMessage="ReSend"/>
            </Button>
          </StyleReSendRow>
        ))}
      </Modal>
    </>
  );
};

export default ShareInterview;
