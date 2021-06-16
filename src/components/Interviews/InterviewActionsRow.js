import { Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from '../Organization/ConfirmModal';

const InterviewActionsRow = ({
  id,
  interviewTitle,
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
        onOK={handleDeleteInterview}
        icon={<DeleteOutlined/>}
        danger
        shape="circle"
        size="small"
        openButtonTitle=""
        successMessage={intl.formatMessage({
          defaultMessage: 'Assessment has been deleted: {interviewTitle}'
        }, { interviewTitle })}
      >
        <p><FormattedMessage defaultMessage="Are you sure to delete the interview: {title}?"
                             values={{ title: interviewTitle }}/></p>
      </ConfirmModal>
    </>
  );
};

export default InterviewActionsRow;
