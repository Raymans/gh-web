import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledArticle = styled.article`
  margin: 0 auto;
  padding: ${(props) => `calc(${props.theme.space.default} * 2 + 60px) ${props.theme.space.default} calc(${props.theme.space.default} * 2)`};
  .ant-layout{
    background-color: ${(props) => props.theme.color.brand.background};
    .ant-anchor-ink::before{
      background-color: ${(props) => props.theme.color.brand.primary};
      width: 4px;
    }
  }
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
`;

const Article = (props) => {
  const { children } = props;
  return (
    <>
      <StyledArticle className="article">{children}</StyledArticle>
    </>
  );
};

Article.propTypes = {
  children: PropTypes.node.isRequired
};

export default Article;
