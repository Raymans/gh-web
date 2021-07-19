import React from 'react';
import InterviewResult from '../ManageInterviews/InterviewResult';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import { Button } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import useGetStarted from '../../hooks/useGetStarted';
import GetStartedInformationBox from './GetStartedInformationBox';

const ViewAssessmentResult = ({
  id,
  sid
}) => {
  const { loginWithRedirect } = useAuth0();
  const intl = useIntl();
  const { setStep } = useGetStarted();
  return (
    <>
      <GetStartedInformationBox
        title={intl.formatMessage({ defaultMessage: 'Get started - Review Assessment Result' })}>
        <FormattedMessage defaultMessage={'See more detail of candidate result'}/>
      </GetStartedInformationBox>
      <InterviewResult id={id} sessionId={sid}/>
      <Button type={'primary'} onClick={() => {
        setStep(4);
      }}>
        <FormattedMessage defaultMessage={'Complete Get Started'}/>
      </Button>
    </>
  );
};

export default ViewAssessmentResult;
