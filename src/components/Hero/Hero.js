import React from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import styled from 'styled-components';
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
  height: 100px;
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
  h2 {
    color: #ffffff;
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

const Hero = (props) => {
  const { backgrounds } = props;
  return (
    <>
      <div className="wrapper">
        <Particles
          params={particleConfig}
          style={{
            position: 'fixed',
            top: 100,
            left: 0,
            width: '100%',
            height: '70%',
          }}
        />
      </div>
      <HeroSection backgrounds={backgrounds}>
        <h1>
          Best prepare tools for interviews
        </h1>
        <h2>Store knowledge as your second brand</h2>
        <h2>Practice anonymously with engineers who have worked at great company</h2>
      </HeroSection>
    </>
  );
};

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired,
};

export default Hero;
