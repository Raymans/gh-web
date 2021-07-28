import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Affix, Avatar, Button, Drawer, Menu as AntMenu } from 'antd';
import { FormattedMessage, Link, navigate, useIntl } from 'gatsby-plugin-intl';
import styled, { ThemeContext } from 'styled-components';
import Icon, {
  EyeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useAuth0 } from '@auth0/auth0-react';
import useLayout from '../../hooks/useLayout';
import useStore from '../../hooks/useStore';
import useGetStarted from '../../hooks/useGetStarted';

const StyledAlignSpan = styled.span`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const StyledMenu = styled.div`
  display: flex;

  .ant-menu {
    font-size: 16px;
  }
`;
const Menu = (props) => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading
  } = useAuth0();
  const { locale } = useIntl();

  const {
    userProfile,
    organization
  } = useStore();
  //const { userProfile } = useContext(StoreContext);
  const { switchDark } = useContext(ThemeContext);
  const [layout] = useLayout();
  const [menuVisible, setMenuVisible] = useState(false);
  const { step } = useGetStarted();

  const pages = props.pages.map((page) => ({
    to: page.node.fields.slug,
    label: page.node.frontmatter.menuTitle
      ? page.node.frontmatter.menuTitle
      : page.node.frontmatter.title
    // icon: page.node.frontmatter.icon,
  }));

  const items = [
    // {
    //   to: '/questions',
    //   label: <FormattedMessage defaultMessage="Questions"/>,
    //   icon: <QuestionCircleOutlined/>
    // },
    {
      to: '/interviews',
      label: <FormattedMessage defaultMessage="Assessments"/>,
      icon: <EyeOutlined/>,
      hideAfterAuth: true
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
      },
      ui_locales: locale === 'zh-tw' ? 'zh-TW' : locale
    });
  };
  const antdMenu = (
    <AntMenu
      selectedKeys={[props.path + props.location?.search]}
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
                <React.Fragment key={item.to}>
                  <AntMenu.SubMenu
                    key={`interview_${index}`}
                    icon={<EyeOutlined/>}
                    title={<FormattedMessage defaultMessage="Assessments"/>}
                  >
                    {renderItem({
                      to: '/interviews?tab=explore',
                      label: <FormattedMessage defaultMessage="Explore Assessments"/>
                    })}
                    {renderItem({
                      to: '/interviews?tab=mine',
                      label: <FormattedMessage defaultMessage="My Assessments"/>
                    })}
                    {renderItem({
                      to: '/interviews?tab=liked',
                      label: <FormattedMessage defaultMessage="Liked Assessments"/>
                    })}
                    {renderItem({
                      to: '/interviews?tab=pending',
                      label: <FormattedMessage defaultMessage="Pending Assessments"/>
                    })}
                    {renderItem({
                      to: '/testedInterviews',
                      label: <FormattedMessage defaultMessage="Assessed Assessments"/>
                    })}
                    {renderItem({
                      to: '/interviews/create',
                      label: <FormattedMessage defaultMessage="Create Assessments"/>
                    })}
                    {organization && renderItem({
                      to: '/interviews?tab=org',
                      label: <FormattedMessage defaultMessage="Organization Assessments"/>
                    })}
                  </AntMenu.SubMenu>
                  <AntMenu.SubMenu
                    key={index}
                    title={(
                      <span>
                      <Avatar src={userProfile?.avatar} style={{ marginRight: '5px' }}/>
                        {userProfile?.name}
                    </span>
                    )}
                  >
                    {renderItem({
                      to: `/profile/${userProfile?.id}`,
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
                </React.Fragment>
              );
            }
            return (
              <AntMenu.Item key={item.to} onClick={handleLogin}>
                {item.icon}
                {item.label}
              </AntMenu.Item>
            );
          }
          if (item.hideAfterAuth && isAuthenticated) {
            return;
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
    <StyledMenu>
      {layout.screenWidth < 700 && !isLoading
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

      {layout.screenWidth >= 700 && !isLoading
      &&
      <>
        {
          !isAuthenticated &&
          <span>
            <Button type={'primary'} onClick={() => navigate('/get-started')}>
            {
              step === 0 ?
                <FormattedMessage defaultMessage={'Get Started'}/> :
                <FormattedMessage defaultMessage={'Continue Get Started'}/>
            }
          </Button>
          </span>
        }
        <span>{antdMenu}</span></>
      }
    </StyledMenu>
  );
};

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string
};

export default Menu;
