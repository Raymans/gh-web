import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Article from '../../components/Article';

const ComparePage = (props) => {
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
        compare to Google Form
      </Article>
    </>
  );
};

ComparePage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ComparePage;
export const query = graphql`
  query compareQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
