import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Contact from "../components/Contact";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

import { Input } from "antd";

const Contact1Page = props => {
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
              <Headline title="Contact" theme={theme} />
            </header>
            <Input placeholder="User Name" />
            <Input placeholder="Password" />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

Contact1Page.propTypes = {
  data: PropTypes.object.isRequired
};

export default Contact1Page;

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
