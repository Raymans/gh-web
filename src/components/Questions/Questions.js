/* eslint no-unused-vars: 0 */

import { Input, Card, Tag, Avatar, Divider, List, Icon, message, Spin, Cascader, Radio } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';

import {getQuestions} from '../../utils/api';


const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


import PropTypes from "prop-types";
import React from "react";

import { ThemeContext } from "../../layouts";

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];



const data = [
  {
    title: 'Title 1',
    src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A'
  },
  {
    title: 'Title 2',
    src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A'
  },
  {
    title: 'Title 3',
    src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c50.50.621.621/s240x240/941679_10151399630726945_727466790_n.jpg?_nc_cat=0&oh=067ece71da987d55f449584d09353d84&oe=5BB96159'
  },
  {
    title: 'Title 4',
    src: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/c50.50.621.621/s240x240/941679_10151399630726945_727466790_n.jpg?_nc_cat=0&oh=067ece71da987d55f449584d09353d84&oe=5BB96159'
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

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

  onChange = (value) => {
    console.log(value);
  }

// Just show the latest item.
  displayRender = (label) => {
    return label[label.length - 1];
  }


  getData = (callback) => {
    getQuestions().then(callback)
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

  handleInfiniteOnLoad = () => {
    console.log(123)
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="form">
          <ThemeContext.Consumer>
            {theme => (

              <div>
                <section style={{marginBottom: '42px'}}>
                  <RadioGroup defaultValue="a" size="large">
                    <RadioButton value="a">Explore</RadioButton>
                    <RadioButton value="b">Saved</RadioButton>
                    <RadioButton value="c">Mine</RadioButton>
                </RadioGroup>
                </section>
                <Divider />
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
                >

                  <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={listData}
                    renderItem={item => (
                      <List.Item
                        key={item.title}
                        actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                        //extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />}
                          title={<a href={item.href}>{item.title}</a>}
                          description={<div><Tag color="blue">JavaScript</Tag>
                            <Tag color="blue">closure</Tag>Raymans</div>}
                        />
                        {item.content}
                        <Divider orientation="left">Author</Divider>
                        <Avatar src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A">
                          Raymans
                        </Avatar>
                        <span>Raymans@DigitalRiver</span>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
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
