import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import Article from '../components/Article';
import Headline from '../components/Article/Headline';
import Seo from '../components/Seo';
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
        <header>
          <Headline>
            <span>Setting</span>
          </Headline>
        </header>
        <Setting />
      </Article>
      <Seo facebook={facebook} />
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
