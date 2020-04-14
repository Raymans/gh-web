import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import Article from '../components/Article';
import Headline from '../components/Article/Headline';
import Seo from '../components/Seo';
import Questions from '../components/Questions';

const QuestionsPage = (props) => {
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
        <Questions />
      </Article>

      <Seo facebook={facebook} />
    </>
  );
};

QuestionsPage.propTypes = {
  data: PropTypes.object.isRequired,
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
