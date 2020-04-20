import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Avatar,
  Button,
  Descriptions,
  Divider,
  List,
  message,
  Modal,
  Space,
  Spin,
  Tag,
} from 'antd';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link, navigate } from 'gatsby-plugin-intl';
import { getUserInfo } from '../../utils/auth';
import { deleteInterview } from '../../utils/api';


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
    id, title, description, specialization: { name: specializationName }, jobTitle, email, visibility,
  } = props;
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleDeleteInterview = () => {
    setSaving(true);
    deleteInterview(id).then(() => {
      setDeleted(true);
      message.success(`Interview has been deleted: ${title}`);
    });
  };
  let updateActions = [];
  if (email === getUserInfo().email) {
    updateActions = [
      <Space>
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
      </Space>];
  }
  return (
    <>
      {
        !deleted
        && (
          <>
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
                  visibility === 'PRIVATE' && <StyledVisibilityTag color="default">private</StyledVisibilityTag>
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
                  {email.split('@')[0]}
                </StyledAvatar>
                <span>{email}</span>
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
  email: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default InterviewGrid;
