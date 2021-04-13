import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { changeLocale, Link, useIntl } from 'gatsby-plugin-intl';
import { Col, Row, Switch } from 'antd';

const StyledTitleLi = styled.li`
  font-weight: bold;
`;
const StyledFooter = styled.footer`
  background: ${(props) => (props.theme.isDark ? props.theme.color.neutral.gray.k : props.theme.color.neutral.black)};
  color: ${(props) => props.theme.color.neutral.gray.g};
  padding-top: 0;
  padding-bottom: 20px;
  ul {
    list-style: none;
    text-align: left;
    padding: 10px 0;
    li {
      font-size: ${(props) => props.theme.font.size.s};
      padding: 4px 0;
    }
  }
`;

const Footer = (props) => {
  const { locale } = useIntl();
  const { switchDark, isDark } = useContext(ThemeContext);

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
                <StyledTitleLi>ABOUT</StyledTitleLi>
                {pages.map((page) => <li><Link to={page.to}>{page.label}</Link></li>)}
              </ul>
            </div>
          </Col>
          <Col span={6}>
            <ul>
              <li>
                <span>Theme: </span>
                <Switch
                  checkedChildren="light"
                  unCheckedChildren="dark"
                  defaultChecked={!isDark}
                  onChange={changeTheme}
                  size="medium"
                />
              </li>
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
