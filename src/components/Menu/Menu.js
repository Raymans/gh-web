import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import {
  Avatar, Menu as AntMenu, Popover, Switch,
} from 'antd';
import { Link } from 'gatsby-plugin-intl';
import styled, { ThemeContext } from 'styled-components';
import { SettingOutlined } from '@ant-design/icons';
import {
  getUserInfo, isAuthenticated, login, logout,
} from '../../utils/auth';


require('core-js/fn/array/from');

const StyledAlignSpan = styled.span`
    display: flex;
    align-items: center;
`;

const Menu = (props) => {
  const [current, setCurrent] = useState('Home');
  const { switchDark } = useContext(ThemeContext);

  const pages = props.pages.map((page) => ({
    to: page.node.fields.slug,
    label: page.node.frontmatter.menuTitle
      ? page.node.frontmatter.menuTitle
      : page.node.frontmatter.title,
    icon: page.node.frontmatter.icon,
  }));

  const items = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/questions', label: 'Questions', icon: 'question-circle' },
    { to: '/interviews', label: 'Interviews', icon: 'eye' },
    {
      label: 'About',
      subMenu: [
        ...pages,
        { to: '/contact', label: 'Contact', icon: 'mail' },
      ],
    },
    {
      to: '/login', label: 'Login', icon: 'user', needAuth: true,
    },
  ];

  useEffect(() => setCurrent(props.path),
    props.path);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const renderItem = (item) => (
    <AntMenu.Item key={item.to}>
      <Link
        to={item.to}
        data-slug={item.to}
      >
        <LegacyIcon type={item.icon} />
        {item.label}
      </Link>
    </AntMenu.Item>
  );

  const renderSubMenu = (item, index) => (
    <AntMenu.SubMenu
      key={index}
      title={(
        <span>
          <LegacyIcon type="setting" />
          {item.label}
        </span>
      )}
    >
      {item.subMenu.map((subItem) => (
        <AntMenu.Item key={subItem.to}>
          <Link
            to={subItem.to}
            data-slug={subItem.to}
          >
            <LegacyIcon type={subItem.icon} />
            {subItem.label}
          </Link>
        </AntMenu.Item>
      ))}
    </AntMenu.SubMenu>
  );

  const extractTheme = (vars) => {
    const theme = {};
    Object.keys(vars).forEach((key) => {
      theme[key] = vars[key].value;
    });

    return theme;
  };

  const changeTheme = (checked) => {
    switchDark(!checked);

    // const darkTheme = {};
    // Object.keys(dark).forEach((key) => {
    //   darkTheme[`@${key}`] = dark[key];
    // });
    // if (typeof window !== 'undefined' && window) {
    //   less
    //     .modifyVars({'@primary-color': '#ae2641'})
    //     .then(() => {})
    //     .catch(() => {
    //       message.error('Failed to update theme');
    //     });
    // }
  };

  const { picture, nickname } = getUserInfo();
  return (
    <>
      <StyledAlignSpan>
        <AntMenu
          selectedKeys={[current]}
          onClick={handleClick}
          mode="horizontal"
          style={{ borderBottom: 'none', background: 'transparent' }}
        >
          {
            items.map((item, index) => {
              if (item.label === 'Login') {
                if (isAuthenticated()) {
                  return (
                    <AntMenu.SubMenu
                      key={index}
                      title={(
                        <span>
                          <Avatar src={picture} style={{ marginRight: '5px' }} />
                          {nickname}
                        </span>
                      )}
                    >
                      {renderItem({ to: '/profile', icon: 'mail', label: 'Profile' })}
                      {renderItem({ to: '/results', icon: 'mail', label: 'Interview Result' })}
                      {renderItem({ to: '/manageinterviews', icon: 'mail', label: 'Manage Interview' })}
                      {renderItem({ to: '/setting', icon: 'setting', label: 'Setting' })}
                      <AntMenu.Item onClick={() => logout()}>
                        <LegacyIcon type="logout" />
                        Login out
                      </AntMenu.Item>
                    </AntMenu.SubMenu>
                  );
                }
                return (
                  <AntMenu.Item key={item.to} onClick={() => login()}>
                    <LegacyIcon type={item.icon} />
                    {item.label}
                  </AntMenu.Item>
                );
              }
              if (!item.needAuth) {
                if (item.subMenu) {
                  return renderSubMenu(item, index);
                }
                return renderItem(item);
              }
            })
          }
        </AntMenu>
        <Popover
          content={(
            <>
              <Switch
                checkedChildren="light"
                unCheckedChildren="dark"
                defaultChecked="light"
                onChange={changeTheme}
                size="medium"
              />
              <br />
              <Link to="/">en</Link>
              {' / '}
              <Link to="/zh-tw" data-slug="/zh-tw">繁中</Link>
            </>
          )}
          trigger="hover"
        >
          <SettingOutlined style={{ cursor: 'pointer' }} />
        </Popover>
      </StyledAlignSpan>
    </>
  );
};

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string,
};

export default Menu;
