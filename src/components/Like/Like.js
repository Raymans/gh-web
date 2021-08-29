import React from 'react';
import styled from 'styled-components';
import LoginPrompt from '../Login/LoginPrompt';
import { FormattedMessage } from 'gatsby-plugin-intl';
import Icon from '../Icon/Icon';

const StyledLike = styled.span`
  width: 70px;
  padding: 10px 0;

  &.active {
    color: ${(props) => `${props.theme.color.brand.primary}`};
  }

  &.active:hover {
    fill: gray;
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
        {
          active ? <Icon type="like"/> : <Icon type="unlike"/>
        }

        <FormattedMessage id="general.likes" defaultMessage="{count}" values={{ count }}/>
      </StyledLike>
    )}
  </LoginPrompt>
);
Like.propTypes = {};

export default Like;
