import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Article from '../components/Article';
import Organization from '../components/Organization';

const OrganizationPage = (props) => {
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
        <Organization/>
      </Article>
    </>
  );
};

OrganizationPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default OrganizationPage;
export const query = graphql`
  query OrganizationQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
