import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Article from '../../components/Article';
import FAQ from '../../components/Resource/FAQ';

const FaqPage = (props) => {
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
        <FAQ></FAQ>
      </Article>
    </>
  );
};

FaqPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default FaqPage;
export const query = graphql`
  query faqQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
