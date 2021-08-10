import { Input, Layout } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';

import { useAuth0 } from '@auth0/auth0-react';
import FilterSider from '../Sider/FilterSider';
import Headline from '../Article/Headline';
import CardList from '../CardList';
import InterviewGrid from './InterviewGrid';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { StoreContext } from '../../context/ContextProvider';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import styled from 'styled-components';
import queryString from 'query-string';
import { navigate } from 'gatsby-link';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Content } = Layout;

const StyledSearchBar = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-direction: column;
    .ant-select, .ant-input-search {
      width: 100% !important;
      margin-bottom: 10px;
    }
  }

  .ant-input-search {
    width: 300px;
    margin-left: auto
  }
`;

const filterOptions = [
  {
    value: 'explore',
    message: <FormattedMessage defaultMessage="Explore"/>
  },
  {
    value: 'mine',
    message: <FormattedMessage defaultMessage="Mine"/>
  },
  {
    value: 'liked',
    message: <FormattedMessage defaultMessage="Liked"/>
  },
  // {value: 'assessed', message: <FormattedMessage defaultMessage="Assessed"/>},
  {
    value: 'pending',
    message: <FormattedMessage defaultMessage="Pending assess"/>
  }
];

const InterviewList = ({ location }) => {
  const intl = useIntl();
  const { isAuthenticated } = useAuth0();
  const {
    getInterviews,
    getInterviewsByUserLiked
  } = useApi();
  const {
    interviews,
    setInterviews,
    searchedInterviewCriteria,
    setSearchedInterviewCriteria,
    userId,
    isLoading,
    organization
  } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();
  const searchInterviews = ({
    isAppend = false,
    showLoading = true,
    url
  } = {}) => {
    setLoading(showLoading);
    const getInterviewAPI = searchedInterviewCriteria.tab === 'liked' ? getInterviewsByUserLiked : getInterviews;
    return getInterviewAPI({
      url,
      userId: userId,
      ...searchedInterviewCriteria,
      owner: searchedInterviewCriteria.tab === 'mine',
      invited: searchedInterviewCriteria.tab === 'pending',
      organization: searchedInterviewCriteria.tab === 'org'
    })
      .then((res) => {
        setInterviews(isAppend ? interviews.concat(res.results) : res.results);
        setNext(res.next);
        setLoading(false);
      });
  };

  const handleSpecSelect = (specialization) => {
    setSearchedInterviewCriteria({
      ...searchedInterviewCriteria,
      specialization
    });
  };

  const handleSearch = (keyword) => {
    setSearchedInterviewCriteria({
      ...searchedInterviewCriteria,
      keyword
    });
  };

  const handleTabChange = ({ target }) => {
    const qs = queryString.parse(location.search);
    navigate(`${location.pathname}?${queryString.stringify({
      ...qs,
      tab: target.value
    })}`, { replace: true });
  };

  const handleLoadMore = () => searchInterviews({
    isAppend: true,
    showLoading: false,
    url: next
  });

  const { tab = 'explore' } = queryString.parse(location?.search);

  // TODO double run this hook, maybe remount by upper component.
  // Reproduce by: enter detail page and back to interviews via menu.
  useEffect(() => {
    if (searchedInterviewCriteria.tab === tab) {
      return;
    }
    setSearchedInterviewCriteria({
      ...searchedInterviewCriteria,
      owner: tab === 'mine',
      tab: tab ?? 'explore'
    });
  }, [tab]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!searchedInterviewCriteria.tab) {
      return;
    }
    if (searchedInterviewCriteria.tab !== tab) {
      return;
    }
    searchInterviews();
  }, [isLoading, searchedInterviewCriteria.tab, searchedInterviewCriteria.keyword]);
  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: <FormattedMessage defaultMessage="List Assessments"/>,
        path: '/interviews'
      }]}/>
      <Headline title={intl.formatMessage({ defaultMessage: 'List Assessments' })}>
        {isAuthenticated &&
        <Link to="/interviews/create"><PlusOutlined/> <FormattedMessage
          defaultMessage="Create Assessment"/></Link>}
      </Headline>
      {/* <GatsbyLink to={'/interviews/1/test'}>Test interview 1</GatsbyLink> */}
      <div className="form">
        <div>
          <Layout>
            {!isLoading && isAuthenticated && searchedInterviewCriteria.tab &&
            <FilterSider onChange={handleTabChange}
                         defaultOpenKeys={searchedInterviewCriteria.tab}
                         options={organization ? [...filterOptions, {
                           value: 'org',
                           message: <FormattedMessage defaultMessage="Organization"/>
                         }] : filterOptions}
                         disabled={loading}
            />
            }
            <Content>
              <StyledSearchBar>
                {/*<Specialization onSelect={handleSpecSelect}*/}
                {/*                selected={searchedInterviewCriteria.specialization}/>*/}
                <Search
                  placeholder={intl.formatMessage({ defaultMessage: 'search assessment' })}
                  onSearch={handleSearch}
                  defaultValue={searchedInterviewCriteria.keyword}
                />
              </StyledSearchBar>

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
                    // specialization={item.specialization}
                    likeCount={item.likeCount}
                    liked={item.liked}
                    lastModifiedDate={item.lastModifiedDate}
                    interviewSessions={item.groupedInterviewSessions}
                  />
                )}
              />
            </Content>
          </Layout>
        </div>
      </div>
      <Seo subTitle="Assessments"/>
    </>
  );
};

InterviewList.propTypes = {};

export default InterviewList;
