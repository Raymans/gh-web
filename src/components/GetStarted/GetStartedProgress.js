import PropTypes from 'prop-types';
import { Steps } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'gatsby-plugin-intl';
import useLayout from '../../hooks/useLayout';

const { Step } = Steps;

const StyledSteps = styled(Steps)`
  margin: 50px 0;
`;
const GetStartedProgress = ({ step }) => {
  const [layoutState] = useLayout();
  const intl = useIntl();
  return <>
    <StyledSteps current={step}
                 direction={layoutState.screenWidth > 768 ? 'horizontal' : 'vertical'} size="small">
      <Step title={intl.formatMessage({ defaultMessage: 'Create Assessment' })}/>
      <Step title={intl.formatMessage({ defaultMessage: 'View and do assess' })}/>
      <Step title={intl.formatMessage({ defaultMessage: 'Review Results' })}/>
      <Step title={intl.formatMessage({ defaultMessage: 'Review individual Result' })}/>
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
