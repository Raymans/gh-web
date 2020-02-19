import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import { Avatar, Icon, Menu as AntMenu } from 'antd'
import { AuthConsumer } from 'react-check-auth'

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
        <Icon type={item.icon}/>{item.label}
      </Link>
    </AntMenu.Item>)

  renderSubMenu = (item, index) =>
    (
      <AntMenu.SubMenu key={index} title={<span><Icon type="setting"/>{item.label}</span>}>
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
    )

  render(){
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
                this.items.map((item, index) => {
                  if(item.label === 'Login') {
                    if(userInfo) {
                      return (
                        <AntMenu.SubMenu key={index} title={<span><Avatar
                          src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"/>Raymans</span>}>
                          <AntMenu.Item>
                            <Icon type='logout'/>Login out
                          </AntMenu.Item>
                        </AntMenu.SubMenu>
                      )
                    }
                    return this.renderItem(item)
                  }
                  if(!item.needAuth || userInfo) {
                    if(item.subMenu) {
                      return this.renderSubMenu(item, index)
                    }
                    return this.renderItem(item)
                  }
                })
              }
            </AntMenu>
          </React.Fragment>
        }}
      </AuthConsumer>
    )
  }
}

Menu.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string
}

export default Menu
