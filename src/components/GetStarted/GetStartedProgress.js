import PropTypes from 'prop-types';
import { Steps } from 'antd';
import React from 'react';

const { Step } = Steps;

const GetStartedProgress = ({ step }) => {
  return <>
    <Steps size="small" current={step}>
      <Step title="Create Assessment"/>
      <Step title="View and do assess"/>
      <Step title="Review Results"/>
      <Step title="Review individual Result"/>
    </Steps>
  </>;
};

export default GetStartedProgress;

GetStartedProgress.propTypes = {
  step: PropTypes.number
};

GetStartedProgress.defaultProps = {
  step: 0
};
