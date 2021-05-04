import { Button, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { navigate } from 'gatsby-plugin-intl';
import React, { useState } from 'react';
import useApi from '../../hooks/useApi';

const InverviewActionsRow = ({
  id,
  title,
  onDeleting = () => {
  },
  onDeleted = () => {
  }
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { deleteInterview } = useApi();
  const handleDeleteInterview = () => {
    onDeleting();
    deleteInterview(id)
      .then(() => {
        onDeleted();
        message.success(`Interview has been deleted: ${title}`);
      });
  };

  return (
    <>
      <Modal
        title="Delete Interview"
        visible={isDeleteModalVisible}
        onOk={handleDeleteInterview}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <p>{`Are you sure to delete the interview: ${title}?`}</p>
      </Modal>
      <Button
        size="small"
        shape="circle"
        icon={<EditOutlined/>}
        style={{ marginRight: '3px' }}
        onClick={() => {
          navigate(`/interviews/${id}/edit`);
        }}
      />
      <Button
        size="small"
        danger
        shape="circle"
        icon={<DeleteOutlined/>}
        onClick={() => setIsDeleteModalVisible(true)}
      />
    </>
  );
};

export default InverviewActionsRow;
