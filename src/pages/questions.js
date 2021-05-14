import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import Article from '../components/Article';

const QuestionsPage = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <>
      <Article>
        {/*<Questions/>*/}
      </Article>
    </>
  );
};

QuestionsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default QuestionsPage;

// eslint-disable-next-line no-undef
export const query = graphql`
  query QuestionsQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
