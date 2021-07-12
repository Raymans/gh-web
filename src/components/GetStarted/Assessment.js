import Interview from '../Interviews/Interview';
import React from 'react';
import { Alert } from 'antd';
import { navigate } from 'gatsby-plugin-intl';

const Assessment = ({
  id,
  sid,
  setAssessmentSessionId,
  setStep
}) => {
  const handleSubmit = (sid) => {
    setStep(2);
    setAssessmentSessionId(sid);
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
      <Interview id={id} sessionId={sid} isGetStarted onSubmit={handleSubmit}/>
    </>
  );
};

export default Assessment;
