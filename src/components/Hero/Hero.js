import React from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import styled from 'styled-components';
import { FormattedMessage } from 'gatsby-plugin-intl';
import particleConfig from './particle-option.json';
import HeroImg from '../../images/png/hero-background.jpg';

const HeroSection = styled.section`
  align-items: center;
  background: ${(props) => props.theme.hero.background};
  background-image: url(${(props) => props.backgrounds.mobile});
  background-size: cover;
  color: ${(props) => props.theme.text.color.primary.inverse};
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  min-height: 98vh;
  margin-top: -3vh;
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

  // @media (min-width: 768px) {
    //   background-image: url(${(props) => props.backgrounds.tablet});
  //   h1 {
  //     max-width: 90%;
    //     font-size: ${(props) => `calc(${props.theme.hero.h1.size} * 1.1)`};
  //   }
  // }
  //@media (min-width: 1024px) {
  background-image: url(${(props) => props.image});

  h1 {
    max-width: 85%;
    font-size: ${(props) => `calc(${props.theme.hero.h1.size} * 1.2)`};
  }

  //}
`;

const SubTitle = styled.h2`
  color: #ffffff;
  border: 0;
  text-align: center;
`;

const StyledDescription = styled.h3`
  color: #ffffff;
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
          height="90vh"
        />
      </ParticlesWrapper>
      <HeroSection backgrounds={backgrounds} image={HeroImg}>
        <h1>
          <FormattedMessage
            id="home.landing.title"
            defaultMessage="Best Tool for Online Assessment"/>
        </h1>
        <SubTitle><FormattedMessage
          id="home.landing.title2"
          defaultMessage="Store knowledge as your second brand"/>
          <br/>
          <FormattedMessage
            id="home.landing.title3"
            defaultMessage="Practice anonymously with engineers who have worked at great company"/>
        </SubTitle>
        {/*<StyledDescription>*/}
        {/*  <FormattedMessage*/}
        {/*    id="home.landing.title2"*/}
        {/*    defaultMessage="Store knowledge as your second brand"/>*/}
        {/*</StyledDescription>*/}

      </HeroSection>
    </>
  );
};

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired
};

export default Hero;
