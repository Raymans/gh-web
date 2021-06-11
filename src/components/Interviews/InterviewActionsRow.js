import { Button, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from '../Organization/ConfirmModal';

const InverviewActionsRow = ({
  id,
  title,
  onDeleting = () => {
  },
  onDeleted = () => {
  }
}) => {
  const { deleteInterview } = useApi();
  const intl = useIntl();
  const handleDeleteInterview = () => {
    onDeleting();
    deleteInterview(id)
      .then(() => {
        onDeleted();
        message.success(`Assessment has been deleted: ${title}`);
      });
  };

  return (
    <>
      <Button
        shape="circle"
        icon={<EditOutlined/>}
        style={{ marginRight: '3px' }}
        onClick={() => {
          navigate(`/interviews/${id}/edit`);
        }}
      />
      <ConfirmModal
        title={intl.formatMessage({ defaultMessage: 'Delete Assessment' })}
        onOk={handleDeleteInterview}
        icon={<DeleteOutlined/>}
        danger
        shape="circle"
        size="small"
        openButtonTitle=""
      >
        <p><FormattedMessage defaultMessage="Are you sure to delete the interview: {title}?"
                             values={{ title }}/></p>
      </ConfirmModal>
    </>
  );
};

export default InverviewActionsRow;
