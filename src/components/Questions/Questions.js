/* eslint no-unused-vars: 0 */

import { Affix, Avatar, Cascader, Collapse, Divider, Icon, Input, Layout, List, Menu, Radio, Tag } from 'antd'
import { getQuestions } from '../../utils/api'
import options from '../Question/data'
import React from 'react'
import { ThemeContext } from '../../layouts'
import styled from 'styled-components'


const Search = Input.Search
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const {Header, Footer, Sider, Content} = Layout

const Panel = Collapse.Panel

const StyledAnswer = styled.div`
  padding-top: 20px;
  .ant-collapse-item > .ant-collapse-header {
    background-color: #1187ae94;
    color: #ffffff70;
  }
`

const StyledList = styled(List)`
  .ant-list-item-meta-title{
    margin: 18px 0;
    font-size: 24px;
  }
  .ant-list-item{
    border-color: '#dadbdc';
    padding: 22px;
    margin: 22px 0;
    border: 1px solid #e8e8e8;
  }
`
const IconText = ({type, text}) => (
  <span>
    <Icon type={type} style={{marginRight: 8}}/>
    {text}
  </span>
)

class Questions extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  }

  handleClick = (value) => {
    this.getData((res) => {
      this.setState({
        data: res,
        loading: false,
        hasMore: true
      })
    }, value.key)
  }

  getData = (callback, queryData = '') => {
    // getQuestions({text: '', category: 'General', topic: 'dummy', belong: queryData}).then(callback)
    getQuestions({}).then(callback)
  }

  componentDidMount(){
    this.getData((res) => {
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
        <div className="form">
          <ThemeContext.Consumer>
            {theme => (
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
                      placeholder="search question"
                      onSearch={value => console.log(value)}
                      style={{width: 200, float: 'right'}}
                    />
                    <StyledList
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
                          <List.Item.Meta
                            description={<div>
                              <Tag color="geekblue">{item.category}</Tag>
                              <Tag color="blue">{item.topic}</Tag>
                              <Tag color="green">{item.difficulty}</Tag>
                              <Tag color="#108ee9" style={{float: 'right'}}>{item.visibilityScope}</Tag>
                            </div>}
                            title={item.question}
                          />
                          <span className="content">{item.question}</span>
                          <StyledAnswer>
                            <Collapse>
                              <Panel header="Show Me Right Answer!" key="1">
                                <p>{item.answer}</p>
                              </Panel>
                            </Collapse>
                          </StyledAnswer>
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
            )}
          </ThemeContext.Consumer>
        </div>

      </React.Fragment>
    )
  }
}

Questions.propTypes = {}

export default Questions
