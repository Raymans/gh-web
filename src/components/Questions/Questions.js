import { Affix, Avatar, Cascader, Checkbox, Collapse, Divider, Icon, Input, Layout, List, Menu, Radio, Tag } from 'antd'
import { getQuestions } from '../../utils/api'
import options from '../Question/data'
import React from 'react'
import styled from 'styled-components'
import QuestionGrid from './QuestionGrid'


const Search = Input.Search
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
const {Header, Footer, Sider, Content} = Layout




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

const StyledSider = styled(Sider)`
  position: absolute;
  top: 232px;
  left: 50px;
`

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
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['explore']}
          mode="inline"
          style={{height: '100%'}}
        >
          <SubMenu
            key="explore"
            title={
              <span>
              <Icon type="mail" />
              <span>Explore</span>
            </span>
            }
          >
              <Menu.Item key="1">All</Menu.Item>
              <Menu.Item key="2">JavaScript</Menu.Item>
          </SubMenu>
          <Menu.Item key="saved">Saved</Menu.Item>
          <Menu.Item key="mine">Mine</Menu.Item>
        </Menu>
      </Affix>
    )

    return (
      <React.Fragment>
        <div className="form">
          <div>
            <Layout>
              <StyledSider theme="light">{menu}</StyledSider>
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
                    <QuestionGrid key={item.id} {...item} />
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

Questions.propTypes = {}

export default Questions
