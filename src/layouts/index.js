import 'typeface-open-sans';
import FontFaceObserver from 'fontfaceobserver';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { graphql, StaticQuery } from 'gatsby';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { getScreenWidth, timeoutThrottlerHandler } from '../utils/helpers';
import Footer from '../components/Footer';
import Header from '../components/Header';
import themeObjectFromYaml from '../theme/theme.yaml';

export const ScreenWidthContext = React.createContext(0);
export const FontLoadedContext = React.createContext(false);

const GlobalStyle = createGlobalStyle`
  h2 {
    font-weight: 500;
    border-bottom: 1px solid #e8e8e8;
    padding-bottom: 10px;
  }
`;
export const Layout = (props) => {
  const [layoutState, setLayoutState] = useState({
    font400loaded: false,
    font600loaded: false,
    screenWidth: 0,
    headerMinimized: false,
    theme: {
      ...themeObjectFromYaml,
      dark: false,
      switchDark: (isDark) => {
        setLayoutState({ ...layoutState, dark: isDark });
      },
    },
  });
  const timeouts = {};

  const resizeHandler = () => {
    setLayoutState({ ...layoutState, screenWidth: getScreenWidth() });
  };

  const resizeThrottler = () => timeoutThrottlerHandler(timeouts, 'resize', 100, resizeHandler);

  const loadFont = (name, family, weight) => {
    const font = new FontFaceObserver(family, {
      weight,
    });

    font.load(null, 10000).then(
      () => {
        setLayoutState({ ...layoutState, [`${name}loaded`]: true });
      },
      () => {
        console.log(`${name} is not available`);
      },
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadFont('font400', 'Open Sans', 400);
      loadFont('font600', 'Open Sans', 600);
    }
  }, []);

  useEffect(() => {
    setLayoutState({
      ...layoutState,
      screenWidth: getScreenWidth(),
    });
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeThrottler, false);
    }
  }, []);


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
        const { children } = props;
        const {
          footnote: { html: footnoteHTML },
          pages: { edges: pages },
        } = data;

        return (
          <ThemeProvider theme={layoutState.theme}>
            {
              layoutState.dark && <link rel="stylesheet" type="text/css" href="https://ant.design/dark.css" />
            }
            <FontLoadedContext.Provider value={layoutState.font400loaded}>
              <ScreenWidthContext.Provider value={layoutState.screenWidth}>
                <>
                  <GlobalStyle />
                  <Header path={props.location.pathname} pages={pages} />
                  <main>{children}</main>
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
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
