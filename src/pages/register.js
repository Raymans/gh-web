import PropTypes from 'prop-types';
import React from 'react';

import { graphql } from 'gatsby';
import Article from '../components/Article';
import Register from '../components/Register';
import Headline from '../components/Article/Headline';
import Seo from '../components/Seo';

const RegisterPage = (props) => {
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
          <Headline title="Register" />
        </header>
        <Register />
      </Article>
      <Seo facebook={facebook} />
    </>
  );
};

RegisterPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default RegisterPage;

// eslint-disable-next-line no-undef
export const query = graphql`
  query RegisterQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
