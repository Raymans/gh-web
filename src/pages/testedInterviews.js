import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import Article from '../components/Article';
import TestedInterviews from '../components/TestedInterviews';

const TestedInterviewsPage = (props) => {
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
        <TestedInterviews/>
      </Article>
    </>
  );
};

TestedInterviewsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default TestedInterviewsPage;

// eslint-disable-next-line no-undef
export const query = graphql`
  query TestedInterviewsPageQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
