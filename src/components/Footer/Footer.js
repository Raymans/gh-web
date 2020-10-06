import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { changeLocale, Link, useIntl } from 'gatsby-plugin-intl';
import { Switch } from 'antd';

const StyledFooter = styled.footer`
  text-align: center;
  background: ${(props) => (props.theme.isDark ? props.theme.color.neutral.gray.k : props.theme.color.neutral.black)};
  padding: ${(props) => props.theme.space.inset.default};
  color: ${(props) => props.theme.color.neutral.gray.g};
  padding-top: 0;
  padding-bottom: 120px;
  ul {
    list-style: none;
    text-align: center;
    padding: 0;
    li {
      font-size: ${(props) => props.theme.font.size.xxs};
      padding: ${(props) => props.theme.space.xxs} ${(props) => props.theme.space.s};
      position: relative;
      display: inline-block;

      &::after {
        content: "•";
        position: absolute;
        right: ${`calc(${(props) => props.theme.space.xs} * -1)`};
      }
      &:last-child::after {
        content: "";
      }
    }
  }
  @media (min-width: 1024px) {
    padding: 1.5em 1em;
  }
`;

const Footer = () => {
  const { locale } = useIntl();
  const { switchDark, isDark } = useContext(ThemeContext);

  const changeTheme = (checked) => {
    switchDark(!checked);
  };
  return (
    <>
      <StyledFooter>
        <span>Theme: </span>
        <Switch
          checkedChildren="light"
          unCheckedChildren="dark"
          defaultChecked={!isDark}
          onChange={changeTheme}
          size="medium"
        />
        <br />
        <span>Language: </span>
        {
          locale === 'en' ? <span>English</span> : <a onClick={() => changeLocale('en')}>English</a>
        }
        {' / '}
        {
          locale === 'zh-tw' ? <span>繁體中文</span> : <a data-slug="/zh-tw" onClick={() => changeLocale('zh-tw')}>繁體中文</a>
        }
        <ul>
          <li>
            ©2020 GeekHub Inc.Made with in Taiwan.
          </li>
          <li>
            it's a web site of the
            {' '}
            <Link to="/">GeekHub</Link>
          </li>
        </ul>
      </StyledFooter>
    </>
  );
};

Footer.propTypes = {
  body: PropTypes.string,
};
export default Footer;
