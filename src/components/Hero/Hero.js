import React from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import { FormattedMessage } from 'gatsby-plugin-intl';
import particleConfig from './particle-option.json';

const HeroSection = styled.section`
  align-items: center;
  background: ${(props) => props.theme.hero.background};
  background-image: url(${(props) => props.backgrounds.mobile});
  background-size: cover;
  color: ${(props) => props.theme.text.color.primary.inverse};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: 78vh;
  height: 10px;
  padding: ${(props) => props.theme.space.inset.l};
  padding-top: ${(props) => props.theme.header.height.homepage};

  h1 {
    text-align: center;
    font-size: ${(props) => props.theme.hero.h1.size};
    margin: ${(props) => props.theme.space.stack.l};
    color: ${(props) => props.theme.hero.h1.color};
    line-height: ${(props) => props.theme.hero.h1.lineHeight};
    text-remove-gap: both 0 "Open Sans";
    font-weight: 400;
  }

  @media (min-width: 768px) {
    background-image: url(${(props) => props.backgrounds.tablet});
    h1 {
      max-width: 90%;
      font-size: ${(props) => `calc(${props.theme.hero.h1.size} * 1.3)`};
    }
  }
  @media (min-width: 1024px) {
    background-image: url(${(props) => props.backgrounds.desktop});
    h1 {
      max-width: 80%;
      font-size: ${(props) => `calc(${props.theme.hero.h1.size} * 1.5)`};
    }
  }
`;

const SubTitle = styled.div`
  color: #ffffff;
  font-weight: 400;
  font-size: x-large;
`;

const ParticlesWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
`;
const Hero = (props) => {
  const { backgrounds } = props;
  return (
    <>
      <ParticlesWrapper>
        <Particles
          params={particleConfig}
          width="100%"
          height="480px"
        />
      </ParticlesWrapper>
      <HeroSection backgrounds={backgrounds}>
        <h1>
          <FormattedMessage defaultMessage="Best prepare tools for Assessments"/>
        </h1>
        <SubTitle><FormattedMessage
          defaultMessage="Store knowledge as your second brand"/></SubTitle>
        <SubTitle><FormattedMessage
          defaultMessage="Practice anonymously with engineers who have worked at great company"/></SubTitle>
      </HeroSection>
    </>
  );
};

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired
};

export default Hero;
