import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import Article from '../components/Article';
import Headline from '../components/Article/Headline';
import Seo from '../components/Seo';
import Profile from '../components/Profile';

const ProfilePage = (props) => {
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
            <span>Profile</span>
          </Headline>
        </header>
        <Router basepath="/profile">
          <Profile path="/:userId" />
        </Router>

      </Article>
      <Seo facebook={facebook} />
    </>
  );
};

ProfilePage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProfilePage;
// eslint-disable-next-line no-undef
export const query = graphql`
  query ProfileQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
