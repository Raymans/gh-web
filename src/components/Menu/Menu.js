import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Button, Menu as AntMenu, Popover, Switch, Drawer, Affix,
} from 'antd';
import { Link } from 'gatsby-plugin-intl';
import styled, { ThemeContext } from 'styled-components';
import Icon, {
  EyeOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import useLayout from '../../hooks/useLayout';

const StyledAlignSpan = styled.span`
    display: flex;
    align-items: center;
    font-weight: bold;
`;

const Menu = (props) => {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [current, setCurrent] = useState('Home');
  const { switchDark } = useContext(ThemeContext);
  const [layout] = useLayout();
  const [menuVisible, setMenuVisible] = useState(false);


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
    setMenuVisible(false);
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

  const showMenu = () => {
    setMenuVisible(true);
  };
  const onClose = () => {
    setMenuVisible(false);
  };

  const logoutWithRedirect = () => logout({
    returnTo: window.location.origin,
  });
  const antdMenu = (
    <AntMenu
      selectedKeys={[current]}
      onClick={handleClick}
      mode={layout.screenWidth < 700 ? 'inline' : 'horizontal'}
      style={{
        borderBottom: 'none',
        background: 'transparent',
      }}
    >
      {
        items.map((item, index) => {
          if (item.label === 'Login') {
            if (isAuthenticated) {
              return (
                <AntMenu.SubMenu
                  key={index}
                  title={(
                    <span>
                      <Avatar src={user.picture} style={{ marginRight: '5px' }} />
                      {user.nickname}
                    </span>
                  )}
                >
                  {renderItem({
                    to: '/testedInterviews',
                    icon: <SettingOutlined />,
                    label: 'Pass Interviews',
                  })}
                  {renderItem({
                    to: '/manageInterviews',
                    icon: <SettingOutlined />,
                    label: 'My Interviews',
                  })}
                  {renderItem({
                    to: `/profile/${user.sub}`,
                    icon: <SettingOutlined />,
                    label: 'Profile',
                  })}
                  {renderItem({
                    to: '/setting',
                    icon: <SettingOutlined />,
                    label: 'Setting',
                  })}
                  <AntMenu.Item onClick={() => logoutWithRedirect()}>
                    <LogoutOutlined />
                    Login out
                  </AntMenu.Item>
                </AntMenu.SubMenu>
              );
            }
            return (
              <AntMenu.Item key={item.to} onClick={loginWithRedirect}>
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
  );
  return (
    <>
      {layout.screenWidth < 700
      && (
      <>
        <Affix offsetTop={20}>
          <Button type="primary" onClick={showMenu}>
            {React.createElement(menuVisible ? MenuFoldOutlined : MenuUnfoldOutlined)}
          </Button>
        </Affix>
        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={menuVisible}
          bodyStyle={{ padding: 0 }}
        >
          {antdMenu}
        </Drawer>
      </>
      )}

      {layout.screenWidth >= 700
      && antdMenu}
    </>
  );
};

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string,
};

export default Menu;
