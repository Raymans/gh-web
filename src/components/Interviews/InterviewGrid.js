import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Avatar,
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  List,
  message,
  Modal,
  Space,
  Spin,
  Tag,
} from 'antd';
import {
  DeleteOutlined, EditOutlined, LoadingOutlined, ShareAltOutlined,
} from '@ant-design/icons';
import { Link, navigate } from 'gatsby-plugin-intl';
import Search from 'antd/es/input/Search';
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component';
import { useAuth0 } from '@auth0/auth0-react';
import InterviewLike from '../Like/InterviewLike';
import AuthorBy from '../AuthorBy';
import useApi from '../../hooks/useApi';

const StyleReSendRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: #e0e5e6 1px solid;
  margin-bottom: 11px;
  button {
    margin-left: auto;
  }
`;
const StyledListItem = styled(List.Item)`
  .ant-list-item-extra{
    position: absolute;
    float: left;
    right: 25px;
  }
`;

const StyledVisibilityTag = styled(Tag)`
  position: absolute;
  top: -9px;
`;

const InterviewGrid = (props) => {
  const {
    id, title, description = '', specialization: { name: specializationName }, jobTitle, clientUser = {}, visibility, likeCount, liked,
  } = props;
  const {
    createInterviewSession, deleteInterview, getInterviewSessions, sendInterviewSessionToCandidate,
  } = useApi();
  const shareLink = `https://geekhub.tw/interviews/${id}`;
  const { user } = useAuth0();
  const [sendings, setSendings] = useState({ sending: false });
  const [sharedEmails, setSharedEmails] = useState([]);
  const [loadingSharedEmails, setLoadingSharedEmails] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleDeleteInterview = () => {
    setSaving(true);
    deleteInterview(id)
      .then(() => {
        setDeleted(true);
        message.success(`Interview has been deleted: ${title}`);
      });
  };
  let updateActions = [];
  updateActions = [
    <Space key="actionBlockId">
      <Button
        icon={<ShareAltOutlined />}
        onClick={() => {
          setIsShareModalVisible(true);
          getInterviewSessions({ interviewId: id }).then(({ results = [] }) => {
            setSharedEmails(results.map((interviewSession) => interviewSession.userEmail));
            setLoadingSharedEmails(false);
          });
        }}
      />
      {
        clientUser.id === user?.sub
        && (
          <>
            <Button
              size="small"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/interviews/${id}/edit`);
              }}
            />
            <Button
              size="small"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => setIsDeleteModalVisible(true)}
            />
          </>
        )
      }

    </Space>];

  const handleResendEmail = (value) => {
    sendings[value] = true;
    setSendings({ ...sendings });
    sendInterviewSessionToCandidate({ id }).then(() => {
      if (!sharedEmails.includes(value)) {
        setSharedEmails([...sharedEmails, value]);
      }
      sendings[value] = false;
      setSendings({ ...sendings });
      message.success(`Sent Interview to ${value}`);
    });
  };

  const handleShareEmail = (value) => {
    setSendings({ ...sendings, sending: true });
    createInterviewSession({
      id,
      email: value,
      name: value.split('@')[0],
    })
      .then(({ id: interviewSessionId }) => {
        sendInterviewSessionToCandidate({ id: interviewSessionId }).then(() => {
          if (!sharedEmails.includes(value)) {
            setSharedEmails([...sharedEmails, value]);
          }
          setSendings({ ...sendings, sending: false });
          message.success(`Sent Interview to ${value}`);
        });
      });
  };

  return (
    <>
      {
        !deleted
        && (
          <>
            <Modal
              title="Share Interview"
              visible={isShareModalVisible}
              onCancel={() => setIsShareModalVisible(false)}
              footer={[
                <Button key="back" onClick={() => setIsShareModalVisible(false)}>
                  Close
                </Button>,
              ]}
            >
              <div style={{ display: 'flex' }}>
                <Input placeholder="Email" value={shareLink} />
                <CopyToClipboard
                  text={shareLink}
                  onCopy={() => message.info('Copied.')}
                >
                  <Button>Copy</Button>
                </CopyToClipboard>
              </div>
              <Divider orientation="left">Or</Divider>
              <Form>
                <Form.Item rule={[{ type: 'email' }]}>
                  <Search
                    placeholder="Email"
                    enterButton="Send"
                    loading={sendings.sending}
                    onSearch={handleShareEmail}
                  />
                </Form.Item>
              </Form>

              {!loadingSharedEmails && sharedEmails.map((sharedEmail) => (
                <StyleReSendRow key={sharedEmail}>
                  <span>{sharedEmail}</span>
                  <Button onClick={handleResendEmail.bind(this, sharedEmail)} loading={sendings[sharedEmail]}>ReSend</Button>
                </StyleReSendRow>
              ))}
            </Modal>

            <Modal
              title="Delete Interview"
              visible={isDeleteModalVisible}
              onOk={handleDeleteInterview}
              onCancel={() => setIsDeleteModalVisible(false)}
            >
              <p>{`Are you sure to delete the interview: ${title}?`}</p>
            </Modal>
            <Spin spinning={saving} indicator={<LoadingOutlined spin />}>
              <StyledListItem
                key={id}
                extra={updateActions}
              >
                {
                  visibility === 'PRIVATE'
                  && <StyledVisibilityTag color="default">private</StyledVisibilityTag>
                }
                <h1><Link to={`/interviews/${id}`}>{title}</Link></h1>
                <Descriptions column={2}>
                  <Descriptions.Item label="Specialization">{specializationName}</Descriptions.Item>
                  <Descriptions.Item label="Job Title">{jobTitle}</Descriptions.Item>
                  <Descriptions.Item span={2}>{description}</Descriptions.Item>
                  <Descriptions.Item span={2}>
                    <AuthorBy author={clientUser.nickname} avatarSrc={clientUser.avatar} />
                  </Descriptions.Item>
                  <Descriptions.Item span={2}><InterviewLike id={id} liked={liked} likeCount={likeCount} /></Descriptions.Item>
                </Descriptions>
              </StyledListItem>
            </Spin>
          </>
        )
      }
    </>
  );
};

InterviewGrid.propTypes = {
};

export default InterviewGrid;
