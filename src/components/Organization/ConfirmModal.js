import PropTypes from 'prop-types';
import { Button, message, Modal as AntdModal } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage } from 'gatsby-plugin-intl';

const ConfirmModal = ({
  title,
  onOpen,
  onOK,
  onCancel,
  onBeforeSubmit,
  children,
  successMessage,
  openButtonTitle,
  submitButtonTitle,
  openButtonType,
  style,
  danger,
  icon,
  shape
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
        if (response?.data) {
          message.error(response.data.message);
        }
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
        icon={icon}
        shape={shape}
      >
        {openButtonTitle}
      </Button>
      <AntdModal
        visible={modalVisible}
        title={title}
        centered
        footer={[
          <Button key="back" onClick={handleCancel} type="link" danger={danger}>
            <FormattedMessage defaultMessage="Cancel"/>
          </Button>,
          <Button type="primary" loading={okLoading} onClick={handleOK} danger={danger}>
            {submitButtonTitle}
          </Button>
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
  icon: PropTypes.element
};

ConfirmModal.defaultProps = {
  openButtonTitle: <FormattedMessage defaultMessage="Open"/>,
  successMessage: <FormattedMessage defaultMessage="Success"/>,
  title: {},
  submitButtonTitle: <FormattedMessage defaultMessage="OK"/>,
  onCancel: async () => {
  },
  onOK: async () => {
  },
  onOpen: async () => {
  },
  onBeforeSubmit: async () => {
  },
  style: {},
  danger: false
};
export default ConfirmModal;
