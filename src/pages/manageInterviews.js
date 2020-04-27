import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import Article from '../components/Article';
import Seo from '../components/Seo';
import ManageInterviews from '../components/ManageInterviews';

const ManageInterviewsPage = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { facebook },
      },
    },
  } = props;

  return (
    <>
      <Article>
        <ManageInterviews />
      </Article>
      <Seo facebook={facebook} />
    </>
  );
};

ManageInterviewsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ManageInterviewsPage;

// eslint-disable-next-line no-undef
export const query = graphql`
  query ManageInterviewsPageQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
