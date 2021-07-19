import React from 'react';
import InterviewResults from '../ManageInterviews/InterviewResults';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import GetStartedInformationBox from './GetStartedInformationBox';

const ViewAssessmentResults = ({
  assessmentId
}) => {
  const intl = useIntl();
  return (
    <>
      <GetStartedInformationBox
        title={intl.formatMessage({ defaultMessage: 'Get started - Review Assessment Results' })}>
        <FormattedMessage defaultMessage={'Here is summary status of your assessment '}/>
        <br/>
        <FormattedMessage
          defaultMessage={'Once a candidate submitted an assessment, you will receive an email and see results immediately.'}/>
        <br/>
        <FormattedMessage defaultMessage={'Choose one and see more details.'}/>
        <br/>
      </GetStartedInformationBox>
      <InterviewResults id={assessmentId}/>
    </>
  );
};

export default ViewAssessmentResults;
