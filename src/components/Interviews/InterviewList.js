/* eslint no-unused-vars: 0 */

import { Affix, Avatar, Cascader, Collapse, Divider, Icon, Input, Layout, List, Menu, Radio } from 'antd'
import { getInterviews } from '../../utils/api'
import options from '../Question/data'
import React from 'react'

import GatsbyLink from 'gatsby-link'

const Search = Input.Search
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const {Header, Footer, Sider, Content} = Layout

const Panel = Collapse.Panel


const listData = []
for(let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
  })
}


const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
)

class InterviewList extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  }

  handleClick = (value) => {
    getInterviews().then((res) => {
      this.setState({
        data: res
      })
    })
  }

  componentDidMount(){
    getInterviews().then((res) => {
      this.setState({
        data: res
      })
    })
  }

  render(){
    const menu = (
      <Affix offsetTop={60}>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['explore']}
          mode="inline"
          style={{height: '100%'}}
        >
          <Menu.Item key="explore">Explore</Menu.Item>
          <Menu.Item key="saved">Saved</Menu.Item>
          <Menu.Item key="mine">Mine</Menu.Item>
        </Menu>
      </Affix>
    )

    return (
      <React.Fragment>
        <GatsbyLink to={'/interviews/1/test'}>Test interview 1</GatsbyLink>
        <div className="form">
          <div>
            <Layout>
              <Sider theme="light">{menu}</Sider>
              <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                <Cascader
                  options={options}
                  expandTrigger="hover"
                  displayRender={this.displayRender}
                  onChange={this.onChange}
                />
                <Search
                  placeholder="search interview"
                  onSearch={value => console.log(value)}
                  style={{width: 200, float: 'right'}}
                />
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={this.state.data}
                  renderItem={item => (
                    <List.Item
                      key={item.id}
                      actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                        <IconText type="message" text="2"/>]}
                      //extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                      <h1><GatsbyLink to={`/interviews/${item.id}`}>interview 1</GatsbyLink></h1>
                      <span className="content">{item.description}</span>
                      <Divider orientation="left">Author</Divider>
                      <Avatar
                        src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A">
                        Raymans- {item.contributedBy}
                      </Avatar>
                      <span>Raymans@DigitalRiver</span>
                    </List.Item>
                  )}
                />
              </Content>
            </Layout>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

InterviewList.propTypes = {}

export default InterviewList
