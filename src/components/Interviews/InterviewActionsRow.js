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
        icon={<EditOutlined/>}
        onClick={() => {
          navigate(`/interviews/${id}/edit`);
        }}
      />
      <ConfirmModal
        title={intl.formatMessage({ defaultMessage: 'Delete Assessment' })}
        onOK={handleDeleteInterview}
        icon={<DeleteOutlined/>}
        danger
        openButtonTitle=""
        submitButtonTitle={intl.formatMessage({
          id: 'general.button.delete',
          defaultMessage: 'Delete'
        })}
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
