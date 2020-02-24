import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const H1 = styled.h1`
  white-space: nowrap;
  font-weight: 200;
  text-align: center;
  max-width: 400px;
  margin: 30px auto 40px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 10px;
  font-size: ${(props) => props.theme.font.size.xxl};
  animation-name: headlineEntry;
  animation-duration: ${(props) => props.theme.time.duration.long};
  @media (min-width: 768px) {
    font-size: ${(props) => `calc(${props.theme.font.size.xl} * 1.2)`};
  }
  @media (min-width: 1024px) {
    font-size: ${(props) => `calc(${props.theme.font.size.xl} * 1.4)`};
  }
  a {
    font-weight: ${(props) => props.theme.font.weight.standard};
    font-size: 0.5em;
    letter-spacing: 0;
    margin-left: 20px;
  }
`;

const Headline = (props) => {
  const { title, children } = props;
  return (
    <>
      <section style={{ padding: '0px 50px' }}>
        <H1>{title ? <span>{title}</span> : children}</H1>
      </section>
    </>
  );
};

Headline.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Headline;
