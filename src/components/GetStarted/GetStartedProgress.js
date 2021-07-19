import PropTypes from 'prop-types';
import { Steps } from 'antd';
import React from 'react';
import styled from 'styled-components';

const { Step } = Steps;

const StyledSteps = styled(Steps)`
margin: 50px 0;
`;
const GetStartedProgress = ({ step }) => {
  return <>
    <StyledSteps current={step}>
      <Step title="Create Assessment"/>
      <Step title="View and do assess"/>
      <Step title="Review Results"/>
      <Step title="Review individual Result"/>
    </StyledSteps>
  </>;
};

export default GetStartedProgress;

GetStartedProgress.propTypes = {
  step: PropTypes.number
};

GetStartedProgress.defaultProps = {
  step: 0
};
