import PropTypes from 'prop-types';
import { Alert } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  margin: 30px 0;
`;
const GetStartedInformationBox = ({
  title,
  children
}) => {
  return (
    <StyledAlert
      message={title}
      description={children}
      type="info"
      showIcon
    />);
};

export default GetStartedInformationBox;

GetStartedInformationBox.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
};

GetStartedInformationBox.defaultProps = {
  title: ''
};
