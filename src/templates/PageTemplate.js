import React from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'gatsby';
import Seo from '../components/Seo';
import Article from '../components/Article';
import Page from '../components/Page';

const PageTemplate = (props) => {
  const {
    data: {
      page,
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;

  return (
    <>
      <Article>
        <Page page={page}/>
      </Article>
      <Seo data={page} facebook={facebook}/>
    </>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export default PageTemplate;

// eslint-disable-next-line no-undef
export const pageQuery = graphql`
  query PageByPath($slug: String!) {
    page: mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
