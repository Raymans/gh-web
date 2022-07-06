import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import { Col, Row } from 'antd';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../../hooks/useApi';
import { StoreContext } from '../../context/ContextProvider';
import changeUILocale from '../../utils/userHelpers';

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
  const {
    refreshUserProfile
  } = useContext(StoreContext);
  const {
    isAuthenticated
  } = useAuth0();
  const {
    updateUserLocale
  } = useApi();

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

  const _changeLocale = (value) => {
    changeUILocale(value);
    if (!isAuthenticated) {
      return;
    }
    updateUserLocale({ locale: value })
      .then(() => {
        refreshUserProfile();
      });
  };
  return (
    <>
      <StyledFooter>
        <Row justify="center" align="top">
          <Col span={6}>
            <div>
              <ul>
                {/*{pages.map((page) => <li key={page.to}><Link to={page.to}>{page.label}</Link></li>)}*/}
                <li key={'about'}><Link to="/about">
                  <FormattedMessage id="home.footer.about" defaultMessage="About US"/> </Link>
                </li>
                <li key={'faq'}><Link to="/resources/faq">
                  <FormattedMessage id="home.footer.faq" defaultMessage="FAQ"/> </Link>
                </li>
                <li key={'privacy'}><Link to="/privacy">
                  <FormattedMessage id="home.footer.privacy" defaultMessage="Privacy Notice"/>
                </Link>
                </li>
                <li key={'terms'}><Link to="/terms">
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
                    <a onClick={() => _changeLocale('en')}>English</a>
                }
                {' / '}
                {
                  locale === 'zh-tw' ? <span>繁體中文</span>
                    : <a data-slug="/zh-tw" onClick={() => _changeLocale('zh-TW')}>繁體中文</a>
                }
              </li>
            </ul>
          </Col>
        </Row>
        <Row justify="center" align="top">
          <Col span={12}>
            <div>© GeekHub 2022. All Rights Reserved.</div>
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
