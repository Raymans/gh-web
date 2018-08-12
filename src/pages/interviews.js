import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";

import Questions from "../components/Questions"

const InterviewsPage = props => {
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
              <Headline title="Interviews" theme={theme} />
            </header>
            <Questions theme={theme}/>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

InterviewsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default InterviewsPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query InterviewsQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
