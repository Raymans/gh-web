import React from 'react';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';
import { Button } from 'antd';
import useGetStarted from '../../hooks/useGetStarted';
import GetStartedInformationBox from './GetStartedInformationBox';
import InterviewSessionResult from '../Interviews/InterviewSessionResult';
import styled from 'styled-components';

const StyledCompleteButton = styled(Button)`
  float: right;
  margin-top: -42px;
`;
const ViewAssessmentResult = ({
  id,
  sid
}) => {
  const intl = useIntl();
  const { setStep } = useGetStarted();
  return (
    <>
      <GetStartedInformationBox
        title={intl.formatMessage({ defaultMessage: 'Get started - Review Assessment Result' })}>
        <FormattedMessage defaultMessage={'See more detail of candidate result'}/>
      </GetStartedInformationBox>
      <InterviewSessionResult sessionId={sid}
                              isOwner={true}/>
      <StyledCompleteButton
        onClick={() => {
          setStep(4);
        }}>
        <FormattedMessage defaultMessage={'Complete Get Started'}/>
      </StyledCompleteButton>
    </>
  );
};

export default ViewAssessmentResult;
