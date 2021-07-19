import InterviewForm from '../Interviews/InterviewForm';
import React from 'react';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import GetStartedInformationBox from './GetStartedInformationBox';

const CreateAssessment = ({
  setStep,
  setAssessmentId
}) => {
  const intl = useIntl();
  const handlePublished = (interview) => {
    setAssessmentId(interview.id);
    setStep(1);
    navigate('/get-started');
  };
  return (
    <>
      <GetStartedInformationBox
        title={intl.formatMessage({ defaultMessage: 'Get started - Create Assessment' })}>
        <FormattedMessage
          defaultMessage={'Learn how to create your own assessments! Multiple settings includes:'}/>
        <ul>
          <li>
            <FormattedMessage defaultMessage={'Set assess time period to your assessment.'}/>
          </li>
          <li>
            <FormattedMessage defaultMessage={'Public/Private Visibility of Assessment'}/>
          </li>
          <li>
            <FormattedMessage
              defaultMessage={'Show Assessment result and answers to your candidate right after they submit.'}/>
          </li>
          <li>
            <FormattedMessage defaultMessage={'Section ability to aggregate your questions'}/>
          </li>
          <li>
            <FormattedMessage defaultMessage={'Reorder your questions by Drag and Drop'}/>
          </li>
        </ul>
      </GetStartedInformationBox>
      <InterviewForm onPublished={handlePublished}/>
    </>
  );
};

export default CreateAssessment;
