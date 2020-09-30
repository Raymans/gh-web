import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import Hero from '../components/Hero';
import Home from '../components/Home';

class IndexPage extends React.Component {
  render() {
    const {
      data: {
        bgDesktop: {
          resize: { src: desktop },
        },
        bgTablet: {
          resize: { src: tablet },
        },
        bgMobile: {
          resize: { src: mobile },
        },
        bgBuildingQ: {
          resize: { src: bq },
        },
        site: {
          siteMetadata: { facebook },
        },
      },
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile,
      bq,
    };

    return (
      <>
        <div>
          <Hero backgrounds={backgrounds} />
          <Home backgrounds={backgrounds} />
        </div>
      </>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

// eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgBuildingQ: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;
