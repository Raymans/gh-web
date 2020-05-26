import React from 'react';
import { LikeOutlined } from '@ant-design/icons';
import styled from 'styled-components';


const StyledLike = styled.div`
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

const Like = ({ active, count, onClick = () => {} }) => (
  <StyledLike className={active && 'active'} onClick={onClick}>
    <LikeOutlined />
    {` ${count}`}
  </StyledLike>
);
Like.propTypes = {
};

export default Like;
