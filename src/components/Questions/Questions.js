import { Cascader, Input, Layout, Menu, Radio } from 'antd';
import { getQuestions } from '../../utils/api';
import options from '../Question/data';
import React from 'react';
import FilterSider from '../Sider/FilterSider';
import QuestionList from './QuestionList';

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Footer, Sider, Content } = Layout;


class Questions extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true
  };

  handleClick = (value) => {
    this.getData((res) => {
      this.setState({
        data: res.results,
        loading: false,
        hasMore: true
      });
    }, value.key);
  };

  getData = (callback, queryData = '') => {
    // getQuestions({text: '', category: 'General', topic: 'dummy', belong: queryData}).then(callback)
    getQuestions({}).then(callback);
  };

  componentDidMount(){
    this.getData((res) => {
      this.setState({
        data: res.results
      });
    });
  }

  render(){
    return (
      <React.Fragment>
        <div className="form">
          <div>
            <Layout>
              <FilterSider onClick={this.handleClick}/>
              <Content>
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

                <QuestionList dataSource={this.state.data}/>
              </Content>
            </Layout>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

Questions.propTypes = {};

export default Questions;
