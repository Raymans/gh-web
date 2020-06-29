import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Menu as AntMenu, Popover, Switch,
} from 'antd';
import { Link } from 'gatsby-plugin-intl';
import styled, { ThemeContext } from 'styled-components';
import Icon, {
  EyeOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  getUserInfo, isAuthenticated, login, logout,
} from '../../utils/auth';


require('core-js/fn/array/from');

const StyledAlignSpan = styled.span`
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const Menu = (props) => {
  const [current, setCurrent] = useState('Home');
  const { switchDark } = useContext(ThemeContext);

  const pages = props.pages.map((page) => ({
    to: page.node.fields.slug,
    label: page.node.frontmatter.menuTitle
      ? page.node.frontmatter.menuTitle
      : page.node.frontmatter.title,
    // icon: page.node.frontmatter.icon,
  }));

  const items = [
    { to: '/', label: 'Home', icon: <HomeOutlined /> },
    { to: '/questions', label: 'Questions', icon: <QuestionCircleOutlined /> },
    { to: '/interviews', label: 'Interviews', icon: <EyeOutlined /> },
    {
      label: 'About',
      subMenu: [
        ...pages,
        { to: '/contact', label: 'Contact', icon: <MailOutlined /> },
      ],
    },
    {
      to: '/login', label: 'Login', icon: <UserOutlined />, needAuth: true,
    },
  ];

  useEffect(() => setCurrent(props.path), []);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const renderItem = (item) => (
    <AntMenu.Item key={item.to}>
      <Link
        to={item.to}
        data-slug={item.to}
      >
        {item.icon}
        {item.label}
      </Link>
    </AntMenu.Item>
  );

  const renderSubMenu = (item, index) => (
    <AntMenu.SubMenu
      key={index}
      title={(
        <span>
          <SettingOutlined />
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
            <Icon type="user" style={{ fontSize: '16px', color: '#08c' }} theme="outlined" />
            {subItem.icon}
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

  const { sub, picture, nickname } = getUserInfo();
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
                      {renderItem({ to: '/testedInterviews', icon: <SettingOutlined />, label: 'Pass Interviews' })}
                      {renderItem({ to: '/manageInterviews', icon: <SettingOutlined />, label: 'My Interviews' })}
                      {renderItem({ to: `/profile/${sub}`, icon: <SettingOutlined />, label: 'Profile' })}
                      {renderItem({ to: '/setting', icon: <SettingOutlined />, label: 'Setting' })}
                      <AntMenu.Item onClick={() => logout()}>
                        <LogoutOutlined />
                        Login out
                      </AntMenu.Item>
                    </AntMenu.SubMenu>
                  );
                }
                return (
                  <AntMenu.Item key={item.to} onClick={() => login()}>
                    {item.icon}
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
