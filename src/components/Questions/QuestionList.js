import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Input, Layout, List, Spin,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Link } from 'gatsby-plugin-intl';
import QuestionGrid from './QuestionGrid';
import FilterSider from '../Sider/FilterSider';
import { getQuestions } from '../../utils/api';
import Headline from '../Article/Headline';

const StyledList = styled(List)`
  .ant-list-item-meta-title{
    margin: 18px 0;
    font-size: 24px;
  }
  .ant-list-item{
    padding: 22px;
    margin: 22px 0;
    border: 1px solid #e8e8e8 !important;
    border-radius: 9px;
  }
  .ant-list-item:hover {
    //background-color: aliceblue;
    border-width: 3px !important;
    transition: margin 0.3s, border-width 0.3s;
    margin: 20px -2px;
  }
`;

const StyledSearchFilter = styled.div`
    text-align: end;
    flex: auto;
`;
let filters = {
  keyword: '',
  tab: 'explore',
};

const QuestionList = (props) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const searchQuestions = () => {
    // getQuestions({text: '', category: 'General', topic: 'dummy', belong: queryData}).then(callback)
    setLoading(true);
    getQuestions(filters)
      .then((res) => {
        setLoading(false);
        setQuestions(res.results);
        if (!res.next) {
          setHasMore(false);
        }
      });
  };

  useEffect(() => {
    searchQuestions();
  }, []);

  const handleChange = ({ target }) => {
    if (target.value === 'mine') {
      filters = {
        ...filters,
        owner: true,
      };
    } else {
      filters = {
        ...filters,
        owner: false,
      };
    }
    searchQuestions();
  };

  const onSearch = (keyword) => {
    filters = {
      ...filters,
      keyword,
    };
    searchQuestions();
  };
  return (
    <div className="form">
      <Headline>
        <span>Questions</span>
        <Link to="/questions/create">Create</Link>
      </Headline>
      <Layout>
        <FilterSider onChange={handleChange} />
        <Layout.Content>
          <StyledSearchFilter>
            <Input.Search
              placeholder="search question"
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </StyledSearchFilter>
          <Spin
            spinning={loading}
            style={{ width: '100%' }}
            indicator={<LoadingOutlined spin />}
          >
            <StyledList
              itemLayout="vertical"
              size="large"
              dataSource={questions}
              renderItem={(item) => (
                <QuestionGrid key={item.id} email={item.clientAccount.email} {...item} />
              )}
            />
          </Spin>
        </Layout.Content>
      </Layout>
    </div>
  );
};

QuestionList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
};

export default QuestionList;
