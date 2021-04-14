import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Affix, Avatar, Button, Drawer, Menu as AntMenu } from 'antd';
import { FormattedMessage, Link } from 'gatsby-plugin-intl';
import styled, { ThemeContext } from 'styled-components';
import Icon, {
  EyeOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined
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
    logout
  } = useAuth0();

  const { switchDark } = useContext(ThemeContext);
  const [layout] = useLayout();
  const [menuVisible, setMenuVisible] = useState(false);

  const pages = props.pages.map((page) => ({
    to: page.node.fields.slug,
    label: page.node.frontmatter.menuTitle
      ? page.node.frontmatter.menuTitle
      : page.node.frontmatter.title
    // icon: page.node.frontmatter.icon,
  }));

  const items = [
    {
      to: '/',
      label: <FormattedMessage defaultMessage="Home"/>,
      icon: <HomeOutlined/>
    },
    {
      to: '/questions',
      label: <FormattedMessage defaultMessage="Questions"/>,
      icon: <QuestionCircleOutlined/>
    },
    {
      to: '/interviews',
      label: <FormattedMessage defaultMessage="Interviews"/>,
      icon: <EyeOutlined/>
    },
    {
      to: '/login',
      label: <FormattedMessage defaultMessage="Login"/>,
      icon: <UserOutlined/>,
      needAuth: true
    }
  ];

  const handleClick = () => {
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
          <SettingOutlined/>
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
            <Icon
              type="user"
              style={{
                fontSize: '16px',
                color: '#08c'
              }}
              theme="outlined"
            />
            {subItem.icon}
            {subItem.label}
          </Link>
        </AntMenu.Item>
      ))}
    </AntMenu.SubMenu>
  );

  const extractTheme = (vars) => {
    const theme = {};
    Object.keys(vars)
      .forEach((key) => {
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
    returnTo: window.location.origin
  });

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        targetUrl: '/'
      }
    });
  };
  const antdMenu = (
    <AntMenu
      selectedKeys={[props.path]}
      onClick={handleClick}
      mode={layout.screenWidth < 700 ? 'inline' : 'horizontal'}
      style={{
        borderBottom: 'none',
        background: 'transparent'
      }}
    >
      {
        items.map((item, index) => {
          if (item.to === '/login') {
            if (isAuthenticated) {
              return (
                <AntMenu.SubMenu
                  key={index}
                  title={(
                    <span>
                      <Avatar src={user.picture} style={{ marginRight: '5px' }}/>
                      {user.nickname}
                    </span>
                  )}
                >
                  {renderItem({
                    to: '/testedInterviews',
                    label: <FormattedMessage defaultMessage="Pass Interviews"/>
                  })}
                  {renderItem({
                    to: '/manageInterviews',
                    label: <FormattedMessage defaultMessage="My Interviews"/>
                  })}
                  {renderItem({
                    to: `/profile/${user.sub}`,
                    label: <FormattedMessage defaultMessage="Profile"/>
                  })}
                  {renderItem({
                    to: '/setting',
                    label: <FormattedMessage defaultMessage="Setting"/>
                  })}
                  {renderItem({
                    to: '/organization',
                    label: <FormattedMessage defaultMessage="Organization"/>
                  })}
                  <AntMenu.Item onClick={() => logoutWithRedirect()}>
                    <LogoutOutlined/>
                    <FormattedMessage defaultMessage="Login out"/>
                  </AntMenu.Item>
                </AntMenu.SubMenu>
              );
            }
            return (
              <AntMenu.Item key={item.to} onClick={handleLogin}>
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
  path: PropTypes.string
};

export default Menu;
