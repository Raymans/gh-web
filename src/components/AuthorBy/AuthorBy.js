import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

const StyledAvatar = styled(Avatar)`
  margin: 0 5px;
`;

const AuthorBy = ({ avatarSrc, author }) => (
  <>
    by
    {' '}
    <StyledAvatar
      src={avatarSrc}
    >
      {author}
    </StyledAvatar>
    <span>{author}</span>
  </>
);
AuthorBy.propTypes = {
};

export default AuthorBy;
