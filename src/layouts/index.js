import 'typeface-open-sans';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { graphql, StaticQuery } from 'gatsby';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import useLayout from '../hooks/useLayout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import themeObjectFromYaml from '../theme/theme.yaml';
import Seo from '../components/Seo';

export const ScreenWidthContext = React.createContext(0);
export const FontLoadedContext = React.createContext(false);

const Main = styled.main`
  min-height: 89vh;
`;

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6{
  color: inherit;
  }
  h2, h3 {
    font-weight: 500;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
    margin: 20px 0 20px;
  }

  h4 {
    padding-bottom: 10px;
    margin: 20px 0 20px;
  }
`;
export const Layout = (props) => {
  const [theme, setTheme] = useState({
    ...themeObjectFromYaml,
    isDark: localStorage.getItem('isDark'),
    switchDark: (isDark) => {
      localStorage.setItem('isDark', isDark);
      setTheme({ ...theme, isDark });
    },
  });

  const [layoutState] = useLayout();

  return (
    <StaticQuery
      query={graphql`
      query LayoutQuery {
        pages: allMdx(
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
        footnote: mdx(fileAbsolutePath: { regex: "/footnote/" }) {
          id
          body
        }
      }
    `}
      render={(data) => {
        const { children, location } = props;
        const {
          footnote: { body: footnoteHTML },
          pages: { edges: pages },
        } = data;

        return (
          <ThemeProvider theme={theme}>
            {
              theme.isDark && <link rel="stylesheet" type="text/css" href="https://ant.design/dark.css" />
            }
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital@0;1&display=swap" rel="stylesheet" />
            <FontLoadedContext.Provider value={layoutState.font400loaded}>
              <ScreenWidthContext.Provider value={layoutState.screenWidth}>
                <>
                  <GlobalStyle />
                  <Seo />
                  <Header path={location.pathname} pages={pages} />
                  <Main>{children}</Main>
                  <Footer body={footnoteHTML} />
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
