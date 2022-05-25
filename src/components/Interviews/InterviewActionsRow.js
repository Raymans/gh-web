import PropTypes from 'prop-types';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import React from 'react';
import useApi from '../../hooks/useApi';
import ConfirmModal from '../Organization/ConfirmModal';
import _ from 'lodash';
import { FaRegClone } from 'react-icons/all';

const InterviewActionsRow = ({
  interview = {},
  onDeleting,
  onDeleted
}) => {
  const {
    deleteInterview,
    copyInterview
  } = useApi();
  const intl = useIntl();
  const canEdit = _.isEmpty(interview.groupedInterviewSessions);

  const handleDeleteInterview = () => {
    onDeleting();
    deleteInterview(interview.id)
      .then(() => {
        onDeleted();
      });
  };

  const handleCloneInterview = () => {
    copyInterview({ id: interview.id })
      .then(({ id }) => {
        navigate(`/interviews/${id}/edit`);
      });
  };

  return (
    <>
      <Tooltip title={canEdit ? intl.formatMessage({
        id: 'assessment.edit',
        defaultMessage: 'Edit Assessment'
      }) : intl.formatMessage({
        id: 'assessment.cannot.edit'
      })}
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
        title={intl.formatMessage({
          id: 'assessment.clone.title',
          defaultMessage: 'Clone Assessment'
        })}
        onOK={handleCloneInterview}
        icon={<FaRegClone className="anticon"/>}
        openButtonTitle=""
        submitButtonTitle={intl.formatMessage({
          id: 'general.button.clone',
          defaultMessage: 'Clone'
        })}
        successMessage={intl.formatMessage({
          id: 'assessment.clone.message.successfully',
          defaultMessage: 'Assessment has been Cloned: {interviewTitle}'
        }, { interviewTitle: interview.title })}
      >
        <p><FormattedMessage id="assessment.clone.message"
                             defaultMessage="Are you sure to clone the assessment: {title}?"
                             values={{ title: interview.title }}/></p>
      </ConfirmModal>

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
