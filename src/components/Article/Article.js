import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledArticle = styled.article`
    @media (min-width: 1024px){
      max-width: 1024px;
    }
    margin: 0 auto;
    padding: ${(props) => `calc(${props.theme.space.default} * 2 + 30px) ${props.theme.space.default} calc(${props.theme.space.default} * 2)`};
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
