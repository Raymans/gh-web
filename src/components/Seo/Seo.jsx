import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../../../content/meta/config';

const Seo = (props) => {
  const {
    data,
    facebook,
    subTitle
  } = props;
  const postTitle = ((data || {}).frontmatter || {}).title || subTitle;
  const postDescription = ((data || {}).frontmatter || {}).description;
  const postCover = ((data || {}).frontmatter || {}).cover;
  const postSlug = ((data || {}).fields || {}).slug;

  const title = postTitle ? `${postTitle} | ${config.shortSiteTitle}` : config.siteTitle;
  const description = postDescription || config.siteDescription;
  const image = postCover || config.siteImage;
  const url = config.siteUrl + config.pathPrefix + postSlug;

  return (
    <Helmet
      htmlAttributes={{
        lang: config.siteLanguage,
        prefix: 'og: http://ogp.me/ns#'
      }}
    >
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description}/>
      {/* OpenGraph tags */}
      <meta property="og:url" content={url}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={image}/>
      <meta property="og:type" content="website"/>
      {/*<meta property="fb:app_id" content={facebook.appId} />*/}
    </Helmet>
  );
};

Seo.propTypes = {
  data: PropTypes.object,
  facebook: PropTypes.object,
  subTitle: PropTypes.string
};

export default Seo;
