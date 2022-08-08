import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import React from 'react';

const StyledButton = styled(Button)`
  border-radius: 30px;
  padding: 0 20px;
  font-size: 14px;
`;
const StyledDiv = styled.div`
  text-align: ${(props) => props.align};
`;
const ActionButton = (props) => {
  const {
    children,
    danger,
    align,
    onClick,
    type
  } = props;
  return <StyledDiv align={align}>
    <StyledButton type={type} danger={danger} onClick={onClick}>
      {children}
    </StyledButton></StyledDiv>;
};

export default ActionButton;

ActionButton.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.any,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string
}

ActionButton.defaultProps = {
  align: 'left',
  danger: false,
  onClick: ()=> {},
  type: 'primary'
}
