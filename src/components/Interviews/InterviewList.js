import { Input, Layout } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'gatsby-plugin-intl';
import { getInterviews } from '../../utils/api';

import FilterSider from '../Sider/FilterSider';
import Headline from '../Article/Headline';
import Specialization from '../Specialization';
import CardList from '../CardList';
import InterviewGrid from './InterviewGrid';
import { isAuthenticated } from '../../utils/auth';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { StoreContext } from '../../context/ContextProvider';

const { Search } = Input;
const { Content } = Layout;

let filters = { keyword: '', pageSize: 10 };

const InterviewList = ({ location }) => {
  const store = useContext(StoreContext);
  // const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();
  const searchInterviews = ({ isAppend = false, showLoading = true, url } = {}) => {
    setLoading(showLoading);
    return getInterviews({ url, ...filters }).then((res) => {
      store.setInterviews(isAppend ? store.interviews.concat(res.results) : res.results);
      setNext(res.next);
      setLoading(false);
    });
  };

  useEffect(() => {
    searchInterviews();
    filters.pageSize = null;
  }, []);

  const handleSpecSelect = (specialization) => {
    filters = { ...filters, specialization };
    searchInterviews();
  };

  const handleSearch = (keyword) => {
    filters = { ...filters, keyword };
    searchInterviews();
  };

  const handleTabChange = ({ target }) => {
    filters = { ...filters, owner: target.value === 'mine' };
    searchInterviews();
  };

  const handleLoadMore = () => searchInterviews({ isAppend: true, showLoading: false, url: next });

  return (
    <>
      <CustomBreadcrumb crumbs={[{ label: 'List Interviews', path: '/interviews' }]} />
      <Headline title="Interviews">
        { isAuthenticated() && <Link to="/interviews/create">Create</Link>}
      </Headline>
      {/* <GatsbyLink to={'/interviews/1/test'}>Test interview 1</GatsbyLink> */}
      <div className="form">
        <div>
          <Layout>
            { isAuthenticated() && <FilterSider onChange={handleTabChange} />}
            <Content>
              <Specialization onSelect={handleSpecSelect} />

              <Search
                placeholder="search interview"
                onSearch={handleSearch}
                style={{ width: 200, float: 'right' }}
              />
              <CardList
                loading={loading}
                hasMore={!!next}
                dataSource={store.interviews}
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
