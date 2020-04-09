import { Input, Layout, Menu, Radio, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { getQuestions } from '../../utils/api';
import FilterSider from '../Sider/FilterSider';
import QuestionList from './QuestionList';
import styled from 'styled-components';

const {Search} = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const {SubMenu} = Menu;
const MenuItemGroup = Menu.ItemGroup;
const {Header, Footer, Sider, Content} = Layout;

const StyledSearchFilter = styled.div`
    text-align: end;
    flex: auto;
`;
let filters = {keyword: '', tab: 'explore'};

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const searchQuestions = () => {
    // getQuestions({text: '', category: 'General', topic: 'dummy', belong: queryData}).then(callback)
    setLoading(true);
    getQuestions(filters).then(res => {
      setLoading(false);
      setQuestions(res.results);
      if(!res.next) {
        setHasMore(false);
      }
    });

  };

  useEffect(() => {
    searchQuestions();
  }, []);

  const handleChange = ({target}) => {
    if (target.value === 'mine') {
      filters = { ...filters, owner: true };
    } else {
      filters = { ...filters, owner: false };
    }
    searchQuestions();
  };

  const onSearch = keyword => {
    filters = {...filters, keyword};
    searchQuestions();
  };
  return (
    <>
      <div className="form">
        <div>
          <Layout>
            <FilterSider onChange={handleChange}/>
            <Content>
              <StyledSearchFilter>
                <Search
                  placeholder="search question"
                  onSearch={onSearch}
                  style={{width: 200}}
                />
              </StyledSearchFilter>
              <Spin
                spinning={loading}
                style={{width: '100%'}}
                indicator={<LoadingOutlined spin/>}
              >
                <QuestionList dataSource={questions}/>
              </Spin>
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
};

Questions.propTypes = {};

export default Questions;
