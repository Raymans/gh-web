/* eslint no-unused-vars: 0 */

import { Input, Card, Tag, Avatar, Divider, List, Icon, message, Spin, Cascader, Radio, Menu, Layout, Affix } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';

import {getQuestions} from '../../utils/api';


const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Footer, Sider, Content } = Layout;

import React from "react";

import { ThemeContext } from "../../layouts";

const options = [{
  value: 'js',
  label: 'JavaScript',
  children: [{
    value: 'basic',
    label: 'Basic'
  },{
    value: 'closure',
    label: 'Closure'
  }],
}, {
  value: 'java',
  label: 'Java',
  children: [{
    value: 'basic',
    label: 'Basic'
    }, {
      value: 'OOP',
      label: 'OOP',
    }],
}];



const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Questions extends React.Component{
  state = {
    data: [],
    loading: false,
    hasMore: true,
  }
  
  handleClick  = (value) => {
    console.log(value);
  }

  getData = (callback) => {
    getQuestions({text: 'matter', category: 'General', topic: 'dummy'}).then(callback)
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        data: res.content,
      });
    });
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (this.state.hasMore) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.content);
      this.setState({
        data,
        loading: false,
        hasMore: !res.last
      });
    });
  }

  render() {
    const menu = (
      <Affix offsetTop={60}>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['explore']}
          mode="inline"
          style={{ height: '100%' }}
        >
          <Menu.Item key="explore">Explore</Menu.Item>
          <Menu.Item key="saved">Saved</Menu.Item>
          <Menu.Item key="mine">Mine</Menu.Item>
        </Menu>
      </Affix>
    );
    
    return (
      <React.Fragment>
        <div className="form">
          <ThemeContext.Consumer>
            {theme => (
              <div>
                <Layout>
                  <Sider theme="light">{menu}</Sider>
                  <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                    <Cascader
                      options={options}
                      expandTrigger="hover"
                      displayRender={this.displayRender}
                      onChange={this.onChange}
                    />
                    <Search
                      placeholder="search question"
                      onSearch={value => console.log(value)}
                      style={{ width: 200, float: 'right' }}
                    />
  
                    <InfiniteScroll
                      initialLoad={false}
                      pageStart={0}
                      loadMore={this.handleInfiniteOnLoad}
                      hasMore={!this.state.loading && this.state.hasMore}
                      useWindow={true}
                      loader={<Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />}
                    >
    
                      <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.state.data}
                        renderItem={item => (
                          <List.Item
                            key={item.id}
                            actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            //extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                          >
                            <List.Item.Meta
                              description={<div>
                                <Tag color="green">{item.category}</Tag>
                                <Tag color="green">{item.topic}</Tag>
                                <Tag color="green">{item.difficulty}</Tag>
                                <Tag color="green">{item.status}</Tag>
                                <Tag color="green">{item.visibilityScope}</Tag>
                              </div>}
                            />
                            <span className="content">{item.question}</span>
                            <Divider orientation="left">Author</Divider>
                            <Avatar src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A">
                              Raymans- {item.contributedBy}
                            </Avatar>
                            <span>Raymans@DigitalRiver</span>
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </Content>
                </Layout>
                
                {/*<List*/}
                  {/*grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}*/}
                  {/*dataSource={data}*/}
                  {/*renderItem={item => (*/}
                    {/*<List.Item>*/}
                      {/*<Card title={item.title}>*/}
                        {/*<Tag color="blue">JavaScript</Tag>*/}
                        {/*<Tag color="blue">closure</Tag>*/}
                        {/*<p>Question description.............</p>*/}
                        {/*<Divider orientation="left">Author</Divider>*/}
                        {/*<Avatar src={item.src} >Raymans</Avatar>*/}
                        {/*<span>Raymans Peng@DigitalRiver</span>*/}
                      {/*</Card>*/}
                    {/*</List.Item>*/}
                  {/*)}*/}
                {/*/>*/}
                <style jsx>{`
                  span.content {
                    color: rgba(0, 0, 0, 1)
                  }
                  :global(.ant-list-vertical .ant-list-item-meta-title){
                    margin: 18px 0;
                    font-size: 24px;
                  }
                  :global(.ant-list-split .ant-list-item){
                    border-bottom-color: ${theme.color.neutral.blue};
                    padding: 22px;
                  }
                  :global(.ant-list-split .ant-list-item):nth-child(even){
                    background-color: #e1e3e30f;
                  }
              `}</style>
              </div>
            )}
          </ThemeContext.Consumer>
        </div>
        
      </React.Fragment>
    );
  }
}
Questions.propTypes = {
};

export default Questions;
