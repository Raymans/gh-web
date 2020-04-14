import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Layout } from 'antd';
import { Link } from 'gatsby-plugin-intl';
import QuestionGrid from './QuestionGrid';
import FilterSider from '../Sider/FilterSider';
import { getQuestions } from '../../utils/api';
import Headline from '../Article/Headline';
import CardList from '../CardList';

const StyledSearchFilter = styled.div`
    text-align: end;
    flex: auto;
`;
let filters = {
  keyword: '',
  tab: 'explore',
  pageSize: 10,
};

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();

  const searchQuestions = ({ isAppend = false, showLoading = true, url } = {}) => {
    setLoading(showLoading);
    return getQuestions({ url, ...filters })
      .then((res) => {
        setQuestions(isAppend ? questions.concat(res.results) : res.results);
        setNext(res.next);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchQuestions();
  }, []);

  const handleChange = ({ target }) => {
    filters = {
      ...filters,
      owner: target.value === 'mine',
    };
    searchQuestions();
  };

  const onSearch = (keyword) => {
    filters = {
      ...filters,
      keyword,
    };
    searchQuestions();
  };

  const handleLoadMore = () => searchQuestions({
    isAppend: true,
    showLoading: false,
    url: next,
  });
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
          <CardList
            loading={loading}
            hasMore={next}
            dataSource={questions}
            onLoadMore={handleLoadMore}
            renderItem={(item) => (
              <QuestionGrid key={item.id} email={item.clientAccount.email} {...item} />
            )}
          />
        </Layout.Content>
      </Layout>
    </div>
  );
};

QuestionList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
};

export default QuestionList;
