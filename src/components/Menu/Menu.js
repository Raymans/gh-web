import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Avatar, Menu as AntMenu } from 'antd';
import { isAuthenticated, getUserInfo, logout, login } from '../../utils/auth'
require('core-js/fn/array/from')

class Menu extends React.Component {
  state = {
    current: 'Home'
  }

  constructor(props){
    super(props)
    const pages = props.pages.map(page => ({
      to: page.node.fields.slug,
      label: page.node.frontmatter.menuTitle
        ? page.node.frontmatter.menuTitle
        : page.node.frontmatter.title,
      icon: page.node.frontmatter.icon
    }))

    this.items = [
      {to: '/', label: 'Home', icon: 'home'},
      {to: '/questions', label: 'Questions', icon: 'question-circle'},
      {to: '/interviews', label: 'Interviews', icon: 'eye'},
      {
        label: 'About', subMenu: [
          ...pages,
          {to: '/contact', label: 'Contact', icon: 'mail'}
        ]
      },
      {to: '/login', label: 'Login', icon: 'user', needAuth: true}
    ]
  }

  static getDerivedStateFromProps(props, state){
    if(props.path !== state.path) {
      return {
        current: props.path
      }
    }
    return null
  }

  componentDidMount = () =>
    this.setState({current: this.props.path})

  handleClick = (e) => {
    this.setState({
      current: e.key
    })
  }

  renderItem = item => (
    <AntMenu.Item key={item.to}>
      <Link
        to={item.to}
        data-slug={item.to}
      >
        <LegacyIcon type={item.icon}/>{item.label}
      </Link>
    </AntMenu.Item>)

  renderSubMenu = (item, index) =>
    (
      <AntMenu.SubMenu key={index} title={<span><LegacyIcon type="setting"/>{item.label}</span>}>
        {item.subMenu.map(subItem =>
          <AntMenu.Item key={subItem.to}>
            <Link
              to={subItem.to}
              data-slug={subItem.to}
            >
              <LegacyIcon type={subItem.icon}/>{subItem.label}
            </Link>
          </AntMenu.Item>
        )}
      </AntMenu.SubMenu>
    )

  render(){
    const {picture, nickname} = getUserInfo()
    return (
      <React.Fragment>
        <AntMenu
          selectedKeys={[this.state.current]}
          onClick={this.handleClick}
          mode="horizontal"
          style={{borderBottom: 'none', background: 'transparent'}}
        >
          {
            this.items.map((item, index) => {
              if(item.label === 'Login') {
                if(isAuthenticated()) {
                  return (
                    <AntMenu.SubMenu key={index} title={<span>
                      <Avatar src={picture}/>{nickname}</span>}>
                      <AntMenu.Item onClick={() => logout()}>
                        <LegacyIcon type='logout'/>Login out
                      </AntMenu.Item>
                    </AntMenu.SubMenu>
                  );
                }
                return (
                  <AntMenu.Item key={item.to} onClick={() => login()}>
                    <LegacyIcon type={item.icon}/>{item.label}
                  </AntMenu.Item>
                );
              }
              if(!item.needAuth) {
                if(item.subMenu) {
                  return this.renderSubMenu(item, index)
                }
                return this.renderItem(item)
              }
            })
          }
        </AntMenu>
      </React.Fragment>
    );
  }
}

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string
}

export default Menu
