import PropTypes from 'prop-types';
import { Button, message, Modal as AntdModal } from 'antd';
import React, { useState } from 'react';

const ConfirmModal = ({
  title, onOpen, onOK, onCancel, onBeforeSubmit, children, successMessage, openButtonTitle, submitButtonTitle, openButtonType, style, danger,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [okLoading, setOKLoading] = useState(false);
  const handleOpen = () => {
    onOpen();
    setOKLoading(false);
    setModalVisible(true);
  };
  const handleOK = () => {
    setOKLoading(true);
    onBeforeSubmit()
      .then(() => onOK())
      .then(() => {
        setTimeout(() => setOKLoading(false), 0);
        setModalVisible(false);
        message.success(successMessage);
      })
      .catch((response) => {
        message.error(response.data.message);
        setOKLoading(false);
      });
  };

  const handleCancel = () => {
    setOKLoading(false);
    setModalVisible(false);
    onCancel();
  };

  return (
    <>
      <Button
        type={openButtonType}
        onClick={() => handleOpen()}
        style={style}
        danger={danger}
      >
        {openButtonTitle}
      </Button>
      <AntdModal
        visible={modalVisible}
        title={title}
        centered
        footer={[
          <Button key="back" onClick={handleCancel} type="link">
            Cancel
          </Button>,
          <Button type="primary" loading={okLoading} onClick={handleOK} danger={danger}>
            {submitButtonTitle}
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        {children}
      </AntdModal>
    </>
  );
};

ConfirmModal.propTypes = {
  children: PropTypes.node,
  onCancel: PropTypes.func,
  onOK: PropTypes.func,
  onOpen: PropTypes.func,
  onBeforeSubmit: PropTypes.func,
  openButtonTitle: PropTypes.string,
  submitButtonTitle: PropTypes.string,
  successMessage: PropTypes.string,
  title: PropTypes.string,
  openButtonType: PropTypes.string,
  style: PropTypes.object,
  danger: PropTypes.bool,
};

ConfirmModal.defaultProps = {
  openButtonTitle: 'Open',
  successMessage: 'Success',
  title: {},
  submitButtonTitle: 'OK',
  onCancel: async () => {
  },
  onOK: async () => {
  },
  onOpen: async () => {
  },
  onBeforeSubmit: async () => {
  },
  openButtonType: 'primary',
  style: {},
  danger: false,
};
export default ConfirmModal;
