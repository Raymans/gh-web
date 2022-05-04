import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { changeLocale, FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import { Col, Row } from 'antd';

const StyledTitleLi = styled.li`
  font-weight: bold;
`;
const StyledFooter = styled.footer`
  background: ${(props) => (props.theme.isDark ? props.theme.color.neutral.gray.k : props.theme.color.neutral.black)};
  color: ${(props) => props.theme.color.neutral.gray.g};
  padding-top: 0;
  padding-bottom: 20px;
  border-top: 2px solid #0f7d9f8a;

  ul {
    list-style: none;
    text-align: left;
    padding: 10px 0;

    li {
      font-size: 0.8em;
      padding: 4px 0;
    }
  }
`;

const Footer = (props) => {
  const {
    locale,
    formatMessage
  } = useIntl();
  const {
    switchDark,
    isDark
  } = useContext(ThemeContext);

  const pages = props.pages.map((page) => ({
    to: page.node.fields.slug,
    label: page.node.frontmatter.menuTitle
      ? page.node.frontmatter.menuTitle
      : page.node.frontmatter.title
    // icon: page.node.frontmatter.icon,
  }));

  const changeTheme = (checked) => {
    switchDark(!checked);
  };
  return (
    <>
      <StyledFooter>
        <Row justify="center" align="top">
          <Col span={6}>
            <div>
              <ul>
                {/*{pages.map((page) => <li key={page.to}><Link to={page.to}>{page.label}</Link></li>)}*/}
                <li key={'about'}><Link to="/resources/about">
                  <FormattedMessage id="home.footer.about" defaultMessage="About US"/> </Link>
                </li>
                <li key={'faq'}><Link to="/resources/faq">
                  <FormattedMessage id="home.footer.faq" defaultMessage="FAQ"/> </Link>
                </li>
                <li key={'privacy'}><Link to="/resources/privacy">
                  <FormattedMessage id="home.footer.privacy" defaultMessage="Privacy Notice"/>
                </Link>
                </li>
                <li key={'terms'}><Link to="/resources/terms">
                  <FormattedMessage id="home.footer.terms" defaultMessage="Terms of Use"/> </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <ul>
              {/*<li>*/}
              {/*  <span><FormattedMessage defaultMessage="Theme:"/> </span>*/}
              {/*  <Switch*/}
              {/*    checkedChildren={formatMessage({ defaultMessage: 'light' })}*/}
              {/*    unCheckedChildren={formatMessage({ defaultMessage: 'dark' })}*/}
              {/*    defaultChecked={!isDark}*/}
              {/*    onChange={changeTheme}*/}
              {/*    size="medium"*/}
              {/*  />*/}
              {/*</li>*/}
              <li>
                {
                  locale === 'en' ? <span>English</span> :
                    <a onClick={() => changeLocale('en')}>English</a>
                }
                {' / '}
                {
                  locale === 'zh-tw' ? <span>繁體中文</span>
                    : <a data-slug="/zh-tw" onClick={() => changeLocale('zh-tw')}>繁體中文</a>
                }
              </li>
            </ul>
          </Col>
        </Row>
        <Row justify="center" align="top">
          <Col span={12}>
            <div>©2021 GeekHub Inc.Made with in Taiwan.</div>
          </Col>

        </Row>
      </StyledFooter>
    </>
  );
};

Footer.propTypes = {
  pages: PropTypes.array.isRequired,
  body: PropTypes.string
};
export default Footer;
