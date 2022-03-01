import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import FAQ from '../../components/Resource/FAQ';
import Article from '../../components/Article';

const ResourcesPage = (props) => {
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
        <Router>
          <FAQ path="/faq"/>
        </Router>
      </Article>
    </>
  );
};

ResourcesPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default ResourcesPage;
export const query = graphql`
  query resourcesQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
