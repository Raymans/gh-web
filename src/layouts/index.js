import 'typeface-open-sans';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { graphql, StaticQuery } from 'gatsby';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import useLayout from '../hooks/useLayout';
import Footer from '../components/Footer';
import Header from '../components/Header';
import themeObjectFromYaml from '../theme/theme.yaml';
import Seo from '../components/Seo';
import { useIntl } from 'gatsby-plugin-intl';
import 'moment/locale/zh-tw';
import Moment from 'react-moment';
import { ConfigProvider, Empty, message } from 'antd';
import { aos } from '../utils/ssrHelper.js';
import 'aos/dist/aos.css';

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  require('cookieconsent');
  require('cookieconsent/build/cookieconsent.min.css');
}

export const ScreenWidthContext = React.createContext(0);
export const FontLoadedContext = React.createContext(false);

const Main = styled.main`
  min-height: 89vh;
  background-color: ${(props) => props.theme.color.brand.background};

  .ant-anchor-wrapper {
    background-color: ${(props) => props.theme.color.brand.background};
  }
`;

const GlobalStyle = createGlobalStyle`
  body {
    hyphens: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    color: inherit;
  }

  h2, h3 {
    padding-bottom: 10px;
    margin: 20px 0;
  }

  h4 {
    padding-bottom: 10px;
    margin: 30px 0 20px;
  }

  input::placeholder {
    font-size: 14px
  }

  p {
    margin-bottom: 0px;
  }

  .ant-btn-primary:not(.ant-input-search-button) {
    margin: 5px 5px;
  }

  .ant-checkbox-inner {
    border-radius: 2px !important;
  }

  .ant-modal-footer {
    border-top: none;
  }

  .ant-modal-title {
    font-size: 24px;
  }

  .ant-btn-icon-only:not(.ant-input-search-button) {
    width: 34px;
    height: 34px;
    padding: 0.9px 0;
  }
`;
export const Layout = (props) => {
  const { locale } = useIntl();
  const [theme, setTheme] = useState({
    ...themeObjectFromYaml,
    // isDark: localStorage.getItem('isDark'),
    isDark: false,
    switchDark: (isDark) => {
      // localStorage.setItem('isDark', isDark);
      // setTheme({ ...theme, isDark });
    },
    locale
  });

  const [layoutState] = useLayout();

  useEffect(() => {
    window.cookieconsent.initialise({
      'palette': {
        'popup': {
          'background': '#000'
        },
        'button': {
          'background': 'transparent',
          'text': '#2f9eba',
          'border': '#2f9eba'
        }
      },
      'content': {
        'message': 'GeekHub uses cookies to ensure you get the best experience on our website.',
        'href': 'https://geekhub.tw/privacy'
      }
    });

    message.config({
      top: 50,
      duration: 5
    });
  }, []);
  useEffect(() => {
    Moment.globalLocale = locale;
    Moment.globalFormat = 'YYYY.MM.DD';
    aos.init?.();
  }, [locale]);

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
        const {
          children,
          location
        } = props;
        const {
          footnote: { body: footnoteHTML },
          pages: { edges: pages }
        } = data;

        return (
          <ThemeProvider theme={theme}>
            <FontLoadedContext.Provider value={layoutState.font400loaded}>
              <ScreenWidthContext.Provider value={layoutState.screenWidth}>
                <ConfigProvider renderEmpty={() => <Empty description={false}/>}>
                  <>
                    {
                      theme.isDark &&
                      <link rel="stylesheet" type="text/css" href="https://ant.design/dark.css"/>
                    }
                    <GlobalStyle/>
                    <Seo/>
                    <Header path={location.pathname} pages={pages}/>
                    <Main>{children}</Main>
                    <Footer body={footnoteHTML} pages={pages}/>
                  </>
                </ConfigProvider>
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
  location: PropTypes.object.isRequired
};

export default Layout;
