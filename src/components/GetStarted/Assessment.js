import Interview from '../Interviews/Interview';
import React from 'react';
import { FormattedMessage, navigate, useIntl } from 'gatsby-plugin-intl';
import GetStartedInformationBox from './GetStartedInformationBox';

const Assessment = ({
  id,
  sid,
  setAssessmentSessionId,
  setStep
}) => {
  const intl = useIntl();
  const handleSubmit = (sid) => {
    setStep(2);
    setAssessmentSessionId(sid);
    navigate('/get-started');
  };
  return (
    <>
      <GetStartedInformationBox
        title={intl.formatMessage({ defaultMessage: 'Get started - Preview and assess an Assessment' })}>
        <FormattedMessage
          defaultMessage={'Here is assessment page other can see if you make your assessments as public.'}/>
        <br/>
        <FormattedMessage
          defaultMessage={'Normally you won\'t be able to test your own assessments, but here is an example to simulate a user see your assessment and do test '}/>
        <br/>
        <FormattedMessage
          defaultMessage={'Let\'s PRESS test button to initialize an assessment session.'}/>
      </GetStartedInformationBox>
      <Interview id={id} sessionId={sid} isGetStarted onSubmit={handleSubmit}/>
    </>
  );
};

export default Assessment;
