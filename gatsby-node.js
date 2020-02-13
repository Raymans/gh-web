//const webpack = require("webpack");
const _ = require("lodash");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const Promise = require("bluebird");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

    if (source !== "parts") {
      createNodeField({
        node,
        name: `slug`,
        value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
      });
    }
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : ""
    });
    createNodeField({
      node,
      name: `source`,
      value: source
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve("./src/templates/PageTemplate.js");
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
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
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const items = result.data.allMarkdownRemark.edges;


        // Create pages.
        const pages = items.filter(item => item.node.fields.source === "pages");
        pages.forEach(({ node }) => {
          const slug = node.fields.slug;
          const source = node.fields.source;

          createPage({
            path: slug,
            component: pageTemplate,
            context: {
              slug,
              source
            }
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  switch (stage) {
    case "build-javascript":
      {
        actions.setWebpackConfig({
          plugins: [
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              reportFilename: "./report/treemap.html",
              openAnalyzer: true,
              logLevel: "error",
              defaultSizes: "gzip"
            })
          ]
        });
        // let components = store.getState().pages.map(page => page.componentChunkName);
        // components = _.uniq(components);
        // config.plugin("CommonsChunkPlugin", webpack.optimize.CommonsChunkPlugin, [
        //   {
        //     name: `commons`,
        //     chunks: [`app`, ...components],
        //     minChunks: (module, count) => {
        //       const vendorModuleList = []; // [`material-ui`, `lodash`];
        //       const isFramework = _.some(
        //         vendorModuleList.map(vendor => {
        //           const regex = new RegExp(`[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`, `i`);
        //           return regex.test(module.resource);
        //         })
        //       );
        //       return isFramework || count > 1;
        //     }
        // ]);
      }
      break;
  }
};
exports.onCreateBabelConfig  = ({ actions: { setBabelPlugin }}) => {
  setBabelPlugin({
    name: `babel-plugin-import`,
    options: {
      libraryName: "antd",
      style: true
    }
  });
  setBabelPlugin({ name: "babel-plugin-syntax-dynamic-import" });
  setBabelPlugin({ name: "babel-plugin-dynamic-import-webpack" });
  setBabelPlugin({
    name: `styled-jsx/babel`,
    options: {
      plugins: [
        "styled-jsx-plugin-postcss",
        [
          "styled-jsx-plugin-stylelint",
          {
            stylelint: {
              rules: {
                "block-no-empty": true,
                "color-no-invalid-hex": true,
                "unit-no-unknown": true,
                "property-no-unknown": true,
                "declaration-block-no-shorthand-property-overrides": true,
                "selector-pseudo-element-no-unknown": true,
                "selector-type-no-unknown": true,
                "media-feature-name-no-unknown": true,
                "no-empty-source": true,
                "no-extra-semicolons": true,
                "function-url-no-scheme-relative": true,
                "declaration-no-important": true,
                "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
                "shorthand-property-no-redundant-values": true,
                "no-duplicate-selectors": null,
                "declaration-block-no-duplicate-properties": null,
                "no-descending-specificity": null
              }
            }
          }
        ]
      ]
    }
  });
};
