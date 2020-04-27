// const webpack = require("webpack");
const _ = require('lodash');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
const Promise = require('bluebird');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode });
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    const separtorIndex = ~slug.indexOf('--') ? slug.indexOf('--') : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

    if (source !== 'parts') {
      createNodeField({
        node,
        name: 'slug',
        value: `${separtorIndex ? '/' : ''}${slug.substring(shortSlugStart)}`,
      });
    }
    createNodeField({
      node,
      name: 'prefix',
      value: separtorIndex ? slug.substring(1, separtorIndex) : '',
    });
    createNodeField({
      node,
      name: 'source',
      value: source,
    });
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;
  if (page.path.match(/^\/zh-tw\/interviews/)) {
    // set client-only path pattern
    page.matchPath = '/zh-tw/interviews/*';

    // Update the page.
    createPage(page);
  }
  if (page.path.match(/^\/en\/interviews/)) {
    // set client-only path pattern
    page.matchPath = '/en/interviews/*';

    // Update the page.
    createPage(page);
  }
  if (page.path.match(/^\/interviews/)) {
    // set client-only path pattern
    page.matchPath = '/interviews/*';

    // Update the page.
    createPage(page);
  }

  if (page.path.match(/^\/zh-tw\/questions/)) {
    // set client-only path pattern
    page.matchPath = '/zh-tw/questions/*';

    // Update the page.
    createPage(page);
  }
  if (page.path.match(/^\/en\/questions/)) {
    // set client-only path pattern
    page.matchPath = '/en/questions/*';

    // Update the page.
    createPage(page);
  }
  if (page.path.match(/^\/questions/)) {
    // set client-only path pattern
    page.matchPath = '/questions/*';

    // Update the page.
    createPage(page);
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve('./src/templates/PageTemplate.js');
    resolve(
      graphql(
        `
          {
            allMdx(
              filter: { fields: { slug: { ne: null } } }
              sort: { fields: [fields___prefix], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                    prefix
                    source
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `,
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const items = result.data.allMdx.edges;


        // Create pages.
        const pages = items.filter((item) => item.node.fields.source === 'pages');
        pages.forEach(({ node }) => {
          const { slug } = node.fields;
          const { source } = node.fields;

          createPage({
            path: slug,
            component: pageTemplate,
            context: {
              slug,
              source,
            },
          });
        });
      }),
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  switch (stage) {
    case 'build-javascript': {
      actions.setWebpackConfig({
        plugins: [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: './report/treemap.html',
            openAnalyzer: true,
            logLevel: 'error',
            defaultSizes: 'gzip',
          }),
        ],
      });
    }
      break;
  }
};
exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
  setBabelPlugin({
    name: 'babel-plugin-import',
    options: {
      libraryName: 'antd',
      style: true,
    },
  });
};
