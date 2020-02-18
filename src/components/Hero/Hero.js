import React from 'react';
import PropTypes from 'prop-types';
import Particles from 'react-particles-js';
import particleConfig from './particle-option.json';
import styled from 'styled-components';

const Hero = props => {
  const { backgrounds, theme } = props;

  const HeroSection = styled.section`
    align-items: center;
    background: ${theme.hero.background};
    background-image: url(${backgrounds.mobile});
    background-size: cover;
    color: ${theme.text.color.primary.inverse};
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    min-height: 78vh;
    height: 100px;
    padding: ${theme.space.inset.l};
    padding-top: ${theme.header.height.homepage};
    h1 {
      text-align: center;
      font-size: ${theme.hero.h1.size};
      margin: ${theme.space.stack.l};
      color: ${theme.hero.h1.color};
      line-height: ${theme.hero.h1.lineHeight};
      text-remove-gap: both 0 "Open Sans";
      font-weight: 400;
    }
    h2 {
      color: #ffffff;
      font-weight: 400;
    }
    @media (min-width: 768px) {
      background-image: url(${backgrounds.tablet});
      h1 {
        max-width: 90%;
        font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
      }
    }
    @media (min-width: 1024px) {
      background-image: url(${backgrounds.desktop});
      h1 {
        max-width: 80%;
        font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
      }
    }
  `;

  return (
    <React.Fragment>
      <div className="wrapper">
        <Particles
          params={particleConfig}
          style={{
            position: 'fixed',
            top: 100,
            left: 0,
            width: '100%',
            height: '70%'
          }}/>
      </div>
      <HeroSection>
        <h1>
          Best prepare tools for interviews
        </h1>
        <h2>Store knowledge as your second brand</h2>
        <h2>Practice anonymously with engineers who have worked at great company</h2>
      </HeroSection>
    </React.Fragment>
  );
};

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
