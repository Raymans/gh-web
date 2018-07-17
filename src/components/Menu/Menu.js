import React from 'react';
import PropTypes from 'prop-types';

require('core-js/fn/array/from');

import Link from 'gatsby-link';
import {Menu as AntMenu, Icon} from 'antd';
import {AuthConsumer} from 'react-check-auth';

class Menu extends React.Component {
  state = {
    current: 'Home'
  };

  constructor(props) {
    super(props);
    const pages = props.pages.map(page => ({
      to: page.node.fields.slug,
      label: page.node.frontmatter.menuTitle
        ? page.node.frontmatter.menuTitle
        : page.node.frontmatter.title,
      icon: page.node.icon
    }));

    this.items = [
      {to: '/', label: 'Home', icon: 'home'},
      {to: '/login', label: 'Login', icon: 'user', needAuth: true},
      {to: '/question', label: 'Question', icon: 'question'},
      {to: '/questions', label: 'Questions', icon: 'question-circle-o'},
      {
        label: 'About', subMenu: [
          ...pages,
          {to: '/contact', label: 'Contact', icon: 'mail'}
        ]
      }
    ];
  }
  
  componentDidMount = () =>
    this.setState({current: this.props.path});

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  };

  renderItem = item => (
    <AntMenu.Item key={item.to}>
      <Link
        to={item.to}
        data-slug={item.to}
      >
        <Icon type={item.icon}/>{item.label}
      </Link>
    </AntMenu.Item>);

  renderSubMenu = item =>
    (
      <AntMenu.SubMenu key={item.to} title={<span><Icon type="setting"/>{item.label}</span>}>
        {item.subMenu.map(subItem =>
          <AntMenu.Item key={subItem.to}>
            <Link
              to={subItem.to}
              data-slug={subItem.to}
            >
              <Icon type={subItem.icon}/>{subItem.label}
            </Link>
          </AntMenu.Item>
        )}
      </AntMenu.SubMenu>
    );

  render() {
    return (
      <AuthConsumer>
        {({userInfo}) => {
          return <React.Fragment>
            <AntMenu
              selectedKeys={[this.state.current]}
              onClick={this.handleClick}
              mode="horizontal"
              style={{borderBottom: 'none', background: 'transparent'}}
            >
              {
                this.items.map(item => {
                  if (item.label === 'Login') {
                    if (userInfo) {
                      return <span>Hi, {userInfo.username}</span>
                    }
                    return this.renderItem(item);
                  }
                  if (!item.needAuth || userInfo) {
                    if (item.subMenu) {
                      return this.renderSubMenu(item)
                    }
                    return this.renderItem(item);
                  }
                })
              }
            </AntMenu>
          </React.Fragment>
        }}
      </AuthConsumer>
    );
  }
}

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string
};

export default Menu;
