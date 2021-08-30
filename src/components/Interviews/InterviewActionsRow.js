import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from '../Organization/ConfirmModal';
import _ from 'lodash';

const InterviewActionsRow = ({
  interview = {},
  onDeleting,
  onDeleted
}) => {
  const { deleteInterview } = useApi();
  const intl = useIntl();
  const canEdit = _.isEmpty(interview.groupedInterviewSessions);

  const handleDeleteInterview = () => {
    onDeleting();
    deleteInterview(interview.id)
      .then(() => {
        onDeleted();
      });
  };

  return (
    <>
      <Tooltip title={intl.formatMessage({
        id: 'assessment.cannot.edit',
        defaultMessage: 'The assessment cannot be edited once your assessment has been shared with candidate and there is a test started.'
      })}
               trigger={canEdit ? [] : 'hover'}
      >
        <Button
          icon={<EditOutlined/>}
          disabled={!canEdit}
          onClick={() => {
            navigate(`/interviews/${interview.id}/edit`);
          }}
        />
      </Tooltip>
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
        }, { interviewTitle: interview.title })}
      >
        <p><FormattedMessage defaultMessage="Are you sure to delete the interview: {title}?"
                             values={{ title: interview.title }}/></p>
      </ConfirmModal>
    </>
  );
};

export default InterviewActionsRow;

InterviewActionsRow.propTypes = {
  onDeleted: PropTypes.any,
  onDeleting: PropTypes.any
};

InterviewActionsRow.defaultProps = {
  onDeleted: () => {
  },
  onDeleting: () => {
  }
};
