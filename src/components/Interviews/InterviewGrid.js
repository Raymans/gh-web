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
import { getUserInfo } from '../../utils/auth';
import {
  createInterviewSession,
  deleteInterview,
  getInterviewSessions,
  sendInterviewSessionToCandidate,
} from '../../utils/api';

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

const StyledAvatar = styled(Avatar)`
  margin: 0 5px;
`;

const InterviewGrid = (props) => {
  const {
    id, title, description = "", specialization: { name: specializationName }, jobTitle, clientAccount = {}, visibility,
  } = props;
  const shareLink = `https://geekhub.tw/interviews/${id}`;
  const [sendings, setSendings] = useState({ sending: false });
  const [sharedEmails, setSharedEmails] = useState([]);
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
          getInterviewSessions({ interviewId: id }).then(({ results = [] }) => {
            setSharedEmails(results.map((interviewSession) => interviewSession.userEmail));
            setIsShareModalVisible(true);
          });
        }}
      />
      {
        clientAccount.id === getUserInfo().sub
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
    sendInterviewSessionToCandidate(id).then(() => {
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
        sendInterviewSessionToCandidate(interviewSessionId).then(() => {
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
                    value="raymans86@gmail.com"
                  />
                </Form.Item>
              </Form>

              {sharedEmails.map((sharedEmail) => (
                <StyleReSendRow>
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
                </Descriptions>
                <Divider orientation="left">Author</Divider>
                <StyledAvatar
                  src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"
                >
                  {clientAccount.name}
                </StyledAvatar>
                <span>{clientAccount.name}</span>
              </StyledListItem>
            </Spin>
          </>
        )
      }
    </>
  );
};

InterviewGrid.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default InterviewGrid;
