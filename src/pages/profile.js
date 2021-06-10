import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import { Router, useMatch } from '@reach/router';
import Article from '../components/Article';
import Profile from '../components/Profile';

const ProfilePage = (props) => {
  const {
    data: {
      site: {
        siteMetadata: { facebook }
      }
    }
  } = props;
  const matchDefault = useMatch('/profile/*') ? '/profile' : '/:locale/profile';
  return (
    <>
      <Article>
        <Router basepath={matchDefault}>
          <Profile path="/:userId"/>
        </Router>
      </Article>
    </>
  );
};

ProfilePage.propTypes = {
  data: PropTypes.object.isRequired
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
