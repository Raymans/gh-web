import React from 'react';
import { LikeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import LoginPrompt from '../Login/LoginPrompt';


const StyledLike = styled.span`
  width: 70px;
  padding: 10px 0;
  &.active {
    color: ${(props) => `${props.theme.color.brand.primary}`};
  }
  &.active:hover {
    color: gray;
  }
  :hover {
    color: ${(props) => `${props.theme.color.brand.primary}`};
    cursor: pointer;
  }
`;

const Like = ({
  active,
  count,
  onClick = () => {
  }
}) => (
  <LoginPrompt>
    {(isAuth) => (
      <StyledLike className={active && 'active'} onClick={isAuth ? onClick : () => {
      }}>
        <LikeOutlined/>
        {` ${count}`}
      </StyledLike>
    )}
  </LoginPrompt>
);
Like.propTypes = {};

export default Like;
