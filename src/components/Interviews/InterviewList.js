import { Input, Layout } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby-plugin-intl';

import { useAuth0 } from '@auth0/auth0-react';
import FilterSider from '../Sider/FilterSider';
import Headline from '../Article/Headline';
import Specialization from '../Specialization';
import CardList from '../CardList';
import InterviewGrid from './InterviewGrid';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { StoreContext } from '../../context/ContextProvider';
import useApi from '../../hooks/useApi';

const { Search } = Input;
const { Content } = Layout;

const InterviewList = () => {
  const { isAuthenticated } = useAuth0();
  const { getInterviews } = useApi();
  const {
    interviews, setInterviews, searchedInterviewCriteria, setSearchedInterviewCriteria,
  } = useContext(StoreContext);
  // const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();
  const searchInterviews = ({ isAppend = false, showLoading = true, url } = {}) => {
    setLoading(showLoading);
    return getInterviews({ url, ...searchedInterviewCriteria }).then((res) => {
      setInterviews(isAppend ? interviews.concat(res.results) : res.results);
      setNext(res.next);
      setLoading(false);
    });
  };

  const handleSpecSelect = (specialization) => {
    setSearchedInterviewCriteria({ ...searchedInterviewCriteria, specialization });
  };

  const handleSearch = (keyword) => {
    setSearchedInterviewCriteria({ ...searchedInterviewCriteria, keyword });
  };

  const handleTabChange = ({ target }) => {
    setSearchedInterviewCriteria({ ...searchedInterviewCriteria, owner: target.value === 'mine' });
  };

  const handleLoadMore = () => searchInterviews({ isAppend: true, showLoading: false, url: next });

  useEffect(() => {
    searchInterviews();
  }, [searchedInterviewCriteria.keyword, searchedInterviewCriteria.specialization, searchedInterviewCriteria.owner]);
  return (
    <>
      <CustomBreadcrumb crumbs={[{ label: 'List Interviews', path: '/interviews' }]} />
      <Headline title="Interviews">
        { isAuthenticated && <Link to="/interviews/create">Create</Link>}
      </Headline>
      {/* <GatsbyLink to={'/interviews/1/test'}>Test interview 1</GatsbyLink> */}
      <div className="form">
        <div>
          <Layout>
            { isAuthenticated && <FilterSider onChange={handleTabChange} defaultOpenKeys={searchedInterviewCriteria.owner ? 'mine' : 'explore'} />}
            <Content>
              <Specialization onSelect={handleSpecSelect} selected={searchedInterviewCriteria.specialization} />

              <Search
                placeholder="search interview"
                onSearch={handleSearch}
                style={{ width: 200, float: 'right' }}
                defaultValue={searchedInterviewCriteria.keyword}
              />
              <CardList
                loading={loading}
                hasMore={!!next}
                dataSource={interviews}
                onLoadMore={handleLoadMore}
                renderItem={(item) => (
                  <InterviewGrid
                    id={item.id}
                    visibility={item.visibility}
                    title={item.title}
                    description={item.description}
                    clientUser={item.clientUser}
                    jobTitle={item.jobTitle}
                    specialization={item.specialization}
                    likeCount={item.likeCount}
                    liked={item.liked}
                  />
                )}
              />
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
};

InterviewList.propTypes = {};

export default InterviewList;
