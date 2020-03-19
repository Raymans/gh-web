import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import { Select } from 'antd';
import { createGlobalStyle } from 'styled-components';
import Article from '../components/Article';
import Headline from '../components/Article/Headline';
import Seo from '../components/Seo';
import QuestionForm from '../components/Question';


const { Option } = Select;

const GlobalStyle = createGlobalStyle`
    @media (min-width: 1024px) {
    .article {
      max-width: ${(props) => props.theme.text.maxWidth.desktopForm} !important;
    }
  }
`;

const QuestionPage = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { facebook },
      },
    },
  } = props;

  return (
    <>

      <GlobalStyle />
      <Article>
        <header>
          <Headline title="Create Question" />
        </header>
        <QuestionForm />
      </Article>
      <Seo facebook={facebook} />
    </>
  );
};

QuestionPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default QuestionPage;

// eslint-disable-next-line no-undef
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
