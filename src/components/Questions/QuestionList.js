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
import { isAuthenticated } from '../../utils/auth';

const StyledSearchFilter = styled.div`
    text-align: end;
    flex: auto;
`;

const StyledSelected = styled.div`
  &.selected .ant-list-item {
    border-width: 3px !important;
    transition: margin 0.3s, border-width 0.3s;
    margin: 20px -2px;
    border-color: ${(props) => `${props.theme.color.brand.primary} !important`};
  }
`;


let filters = {
  keyword: '',
  tab: 'explore',
  pageSize: 10,
};

const QuestionList = (props) => {
  const { isModal, onSelectQuestion, selectedQuestions = [] } = props;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();

  const searchQuestions = ({ isAppend = false, showLoading = true, url } = {}) => {
    setLoading(showLoading);
    return getQuestions(isAppend ? { url } : { url, ...filters })
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
      {
        !isModal
        && (
        <Headline>
          <span>Questions</span>
          { isAuthenticated() && <Link to="/questions/create">Create</Link>}
        </Headline>
        )
      }
      <Layout>
        { isAuthenticated() && <FilterSider onChange={handleChange} />}
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
            hasMore={!!next}
            dataSource={questions}
            onLoadMore={handleLoadMore}
            renderItem={(item) => {
              const selectedClass = selectedQuestions.includes(item.id) ? 'selected' : '';
              return (
                <StyledSelected
                  key={item.id}
                  onClick={() => { onSelectQuestion(item); }}
                  className={selectedClass}
                >
                  <QuestionGrid
                    clientUser={item.clientUser}
                    {...item}
                    showActionButtons={!isModal}
                  />
                </StyledSelected>
              );
            }}
          />
        </Layout.Content>
      </Layout>
    </div>
  );
};

QuestionList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
  isModal: PropTypes.bool,
  onSelectQuestion: PropTypes.func,
  selectedQuestions: PropTypes.arrayOf(PropTypes.string),
};

export default QuestionList;

QuestionList.defaultProps = {
  isModal: false,
  onSelectQuestion: () => {},
};
