import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-bottom: 70px;
`
const StyledH1 = styled.h1`
  padding-top: 45px;
  margin: 0;
  text-align: center;
`
const StyledSubtitle = styled.div`
  color: lightgray;
  text-align: center;
  margin-top: -9px;
`
const SectionTitle = (props) => {
  const {
    title,
    subtitle,
    dark
  } = props;
  return (
    <StyledDiv>
      <StyledH1>
        {title}
      </StyledH1>
      <StyledSubtitle>
        {subtitle}
      </StyledSubtitle>
    </StyledDiv>);
};

export default SectionTitle;
SectionTitle.propTypes = {
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
}
