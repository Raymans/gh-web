import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Hero from "../components/Hero";
import Seo from "../components/Seo";
import Home from "../components/Home";

class IndexPage extends React.Component {
  render() {
    const {
      data: {
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        bgBuildingQ: {
          resize: { src: bq }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile,
      bq
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (
            <div>
            <Hero backgrounds={backgrounds} theme={theme} />
            <Home backgrounds={backgrounds} theme={theme}/>
            </div>
          )}
        </ThemeContext.Consumer>

        <Seo facebook={facebook} />
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const guery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(id: { regex: "/hero-background/" }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgBuildingQ: imageSharp(id: { regex: "/building-question/" }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
