import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  margin: 0;
  text-align: ${(props) => props.align};
  font-size: 31px;
`
const StyledSubtitle = styled.div`
  color: lightgray;
  text-align: ${(props) => props.align};
  font-size: 19px;
  margin-top: -9px;
`
const SectionInnerTitle = (props) => {
  const {
    title,
    subtitle,
    align
  } = props;
  return (
    <>
      <StyledH2 align={align}>
        {title}
      </StyledH2>
      <StyledSubtitle align={align}>
        {subtitle}
      </StyledSubtitle>
    </>);
};

export default SectionInnerTitle;
SectionInnerTitle.propTypes = {
  align: PropTypes.oneOf(['center', 'left', 'right']),
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired
}

SectionInnerTitle.defaultProps = {
  align: 'center'
}
