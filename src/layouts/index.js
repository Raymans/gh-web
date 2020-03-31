import 'typeface-open-sans';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { graphql, StaticQuery } from 'gatsby';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import useLayout from '../hooks/useLayout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import themeObjectFromYaml from '../theme/theme.yaml';

export const ScreenWidthContext = React.createContext(0);
export const FontLoadedContext = React.createContext(false);

const Main = styled.main`
  min-height: 89vh;
`;

const GlobalStyle = createGlobalStyle`
  h2 {
    font-weight: 500;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
  }
`;
export const Layout = (props) => {
  const [theme, setTheme] = useState({
    ...themeObjectFromYaml,
    dark: false,
    switchDark: (isDark) => {
      setTheme({ ...theme, dark: isDark });
    },
  });

  const [layoutState] = useLayout();


  return (
    <StaticQuery
      query={graphql`
      query LayoutQuery {
        pages: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "//pages//" }, fields: { prefix: { regex: "/^\\d+$/" } } }
          sort: { fields: [fields___prefix], order: ASC }
        ) {
          edges {
            node {
              fields {
                slug
                prefix
              }
              frontmatter {
                title
                menuTitle
                icon
              }
            }
          }
        }
        footnote: markdownRemark(fileAbsolutePath: { regex: "/footnote/" }) {
          id
          html
        }
      }
    `}
      render={(data) => {
        const { children, location } = props;
        const {
          footnote: { html: footnoteHTML },
          pages: { edges: pages },
        } = data;

        return (
          <ThemeProvider theme={theme}>
            {
              theme.dark && <link rel="stylesheet" type="text/css" href="https://ant.design/dark.css" />
            }
            <FontLoadedContext.Provider value={layoutState.font400loaded}>
              <ScreenWidthContext.Provider value={layoutState.screenWidth}>
                <>
                  <GlobalStyle />
                  <Header path={location.pathname} pages={pages} />
                  <Main>{children}</Main>
                  <Footer html={footnoteHTML} />
                </>
              </ScreenWidthContext.Provider>
            </FontLoadedContext.Provider>
          </ThemeProvider>
        );
      }}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
