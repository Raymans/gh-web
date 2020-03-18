import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import Article from '../components/Article';
import Headline from '../components/Article/Headline';
import Seo from '../components/Seo';
import Interviews from '../components/Interviews';

const InterviewsPage = (props) => {
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
        <header>
          <Headline>
            <span>Interviews</span>
            <Link to="/interviews/create">Create</Link>
          </Headline>
        </header>
        <Interviews />
      </Article>
      <Seo facebook={facebook} />
    </>
  );
};

InterviewsPage.propTypes = {
  data: PropTypes.object.isRequired,
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
