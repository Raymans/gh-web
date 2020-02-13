import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Login from "../components/Login";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import { graphql } from 'gatsby';

const LoginPage = props => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <header>
              <Headline title="Login" theme={theme} />
            </header>
            <Login theme={theme}/>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

LoginPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default LoginPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query LoginQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
