import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MDXRenderer } from 'gatsby-plugin-mdx';

const StyledContent = styled.div`
animation-name: bodytextEntry;
  animation-duration: ${(props) => props.theme.time.duration.long};

  h2,
  h3 {
    margin: 1.5em 0 1em;
  }

  h2 {
    line-height: ${(props) => props.theme.font.lineHeight.s};
    font-size: ${(props) => props.theme.font.size.l};
  }

  h3 {
    font-size: ${(props) => props.theme.font.size.m};
    line-height: ${(props) => props.theme.font.lineHeight.m};
  }

  p {
    font-size: ${(props) => props.theme.font.size.s};
    line-height: ${(props) => props.theme.font.lineHeight.xxl};
    margin: 0 0 1.5em;
  }
  ul {
    list-style: circle;
    margin: 0 0 1.5em;
    padding: 0 0 0 1.5em;
  }
  li {
    margin: 0.7em 0;
    line-height: 1.5;
  }
  a {
    font-weight: ${(props) => props.theme.font.weight.bold};
    //color: ${(props) => props.theme.color.brand.primary};
    text-decoration: underline;
  }
  a.gatsby-resp-image-link {
    border: 0;
    display: block;
    margin: 2.5em 0;
    border-radius: ${(props) => props.theme.size.radius.default};
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.line.color};
  }
  code.language-text {
    background: ${(props) => props.theme.color.neutral.gray.c};
    text-shadow: none;
    color: inherit;
    padding: 0.1em 0.3em 0.2em;
    border-radius: 0.1em;
  }
`;
const Bodytext = (props) => {
  const { body } = props;
  return (
    <>
      <StyledContent>
        <MDXRenderer>{body}</MDXRenderer>
      </StyledContent>
    </>
  );
};

Bodytext.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Bodytext;
