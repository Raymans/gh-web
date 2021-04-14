import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import Article from '../components/Article';
import Interviews from '../components/Interviews';

const InterviewsPage = (props) => {
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
        <Interviews/>
      </Article>
    </>
  );
};

InterviewsPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default InterviewsPage;

// eslint-disable-next-line no-undef
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
