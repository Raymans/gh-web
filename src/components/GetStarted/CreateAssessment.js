import InterviewForm from '../Interviews/InterviewForm';
import React from 'react';
import { Alert } from 'antd';
import { navigate } from 'gatsby-plugin-intl';

const CreateAssessment = ({
  setStep,
  setAssessmentId
}) => {
  const handlePublished = (interview) => {
    setAssessmentId(interview.id);
    setStep(1);
    navigate('/get-started');
  };
  return (
    <>
      <Alert
        message="Get started - Create Assessment"
        description={
          <ul>
            <ui>
              Learn how to create your own assessments
            </ui>
            <ui>
              Learn how to create your own assessments1
            </ui>
          </ul>
        }
        type="info"
        showIcon
      />
      <InterviewForm onPublished={handlePublished}/>
    </>
  );
};

export default CreateAssessment;
