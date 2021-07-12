import React from 'react';
import InterviewResults from '../ManageInterviews/InterviewResults';
import { Alert } from 'antd';

const ViewAssessmentResults = ({
  assessmentId,
  setStep
}) => {

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
      <InterviewResults id={assessmentId}/>
    </>
  );
};

export default ViewAssessmentResults;
