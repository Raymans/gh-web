// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv')
  .config();
const darkThemeVars = require('antd/dist/dark-theme');
const config = require('./content/meta/config');

/* const query = `{
  allMdx(filter: {fileAbsolutePath: {regex: "/posts|pages/[0-9]+.*--/"}}) {
    edges {
      node {
        objectID: fileAbsolutePath
        fields {
          slug
        }
        internal {
          content
        }
        frontmatter {
          title
        }
      }
    }
  }
}`; */

/* const queries = [
  {
    query,
    transformer: ({ data }) => data.allMdx.edges.map(({ node }) => node),
  },
]; */

module.exports = {
  siteMetadata: {
    title: config.siteTitle,
    description: config.siteDescription,
    siteUrl: config.siteUrl,
    facebook: {
      appId: process.env.FB_APP_ID ? process.env.FB_APP_ID : ''
    }
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-transition-link',
      options: {
        layout: require.resolve('./src/layouts/')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages/`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'parts',
        path: `${__dirname}/content/parts/`
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          'gatsby-plugin-sharp',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              backgroundColor: 'transparent'
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 2em'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-breadcrumb',
      options: {
        defaultCrumb: {
          // location: required and must include the pathname property
          location: {
            pathname: '/'
          },
          // crumbLabel: required label for the default crumb
          crumbLabel: 'Home',
          // all other properties optional
          crumbSeparator: ' / '
        }
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-less',
      options: {
        javascriptEnabled: true,
        modifyVars: require('./src/theme/theme.js')
        // modifyVars: {
        //   hack: `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
        //   ...darkThemeVars,
        // },
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.manifestName,
        short_name: config.manifestShortName,
        start_url: config.manifestStartUrl,
        background_color: config.manifestBackgroundColor,
        theme_color: config.manifestThemeColor,
        display: config.manifestDisplay,
        icons: [
          {
            src: '/icons/icon-48x48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap'
    },
    {
      resolve: 'gatsby-plugin-svgr'
    },
    // {
    //   resolve: 'gatsby-plugin-create-client-paths'
    //   options: { prefixes: ['/interviews/*', '/en/interviews/*', '/zh-tw/interviews/*'] },
    // },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {}
    },
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        path: `${__dirname}/src/intl`,
        languages: ['en', 'zh-tw'],
        defaultLanguage: 'en'
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#1088ae',
        showSpinner: true
      }
    }
  ]
};
