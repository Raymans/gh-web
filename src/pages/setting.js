import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Setting from '../components/Setting';

const SettingPage = (props) => {
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
        <Setting />
      </Article>
    </>
  );
};

SettingPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SettingPage;
export const query = graphql`
  query SettingQuery {
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
