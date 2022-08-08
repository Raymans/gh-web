import PropTypes from 'prop-types'
import { FormattedMessage, navigate } from 'gatsby-plugin-intl';
import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';
import useGetStarted from '../../hooks/useGetStarted';

const StyledButton = styled(Button)`
    border-color: #ff4150;
    border-width: 2px;
    background: black;
    color: white;

  &:hover, &:focus, &:active{
    border-color: #ff4150;
    background: black;
  }
`;

const GetStartedButton = (props)=>{
  const {step} = useGetStarted();
  return (<StyledButton onClick={() => navigate('/get-started')}>
    {
      step === 0 ?
        <FormattedMessage id="home.getstarted.button" defaultMessage={'Get Started'}/> :
        <FormattedMessage id="home.getstarted.continue"
                          defaultMessage={'Continue Get Started'}/>
    }
  </StyledButton>);
}
export default GetStartedButton;
