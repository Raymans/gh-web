import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../layouts";
import Article from "../components/Article";
import Headline from "../components/Article/Headline";
import Seo from "../components/Seo";
import Question from "../components/Question"

import { Input, Select, Icon } from 'antd';

const Option = Select.Option;

const QuestionPage = props => {
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
              <Headline title="Questions" theme={theme} />
            </header>
            <Question theme={theme}/>
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo facebook={facebook} />
    </React.Fragment>
  );
};

QuestionPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default QuestionPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query QuestionQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
