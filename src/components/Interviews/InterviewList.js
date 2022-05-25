import { Input, Layout, Radio } from 'antd';
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
import { AppstoreOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons';
import useLocalStorage from '../../hooks/useLocalStorage';
import useLayout from '../../hooks/useLayout';

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

  .ant-input-search, .ant-radio-group {
    margin-left: auto
  }

  .ant-input-search {
    width: 300px;
  }

  padding-bottom: 10px;
`;

const filterOptions = [
  {
    value: 'explore',
    message: <FormattedMessage id="browse.tab.explore"/>
  },
  {
    value: 'mine',
    message: <FormattedMessage id="browse.tab.mine"/>
  },
  {
    value: 'liked',
    message: <FormattedMessage id="browse.tab.liked"/>
  },
  // {value: 'assessed', message: <FormattedMessage defaultMessage="Assessed"/>},
  {
    value: 'pending',
    message: <FormattedMessage id="browse.tab.pending"/>
  }
];

const InterviewList = ({ location }) => {
  const intl = useIntl();
  const { isAuthenticated } = useAuth0();
  const [layout] = useLayout();
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
  const [gridMode, setGridMode] = useLocalStorage('interview-list-mode');
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

  const handleModeChange = (e) => setGridMode(e.target.value);

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
        label: <FormattedMessage id="breadcrumb.browse.title"/>,
        path: '/interviews'
      }]}/>
      <Headline title={intl.formatMessage({ id: 'breadcrumb.browse.title' })}>
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
              {
                !layout.isWidthLower768 &&
                <StyledSearchBar>
                  <Radio.Group onChange={handleModeChange} value={gridMode} size={'middle'}>
                    <Radio.Button value="gridMode"><AppstoreOutlined/></Radio.Button>
                    <Radio.Button value="listMode"><UnorderedListOutlined/></Radio.Button>
                  </Radio.Group>
                </StyledSearchBar>
              }

              <CardList
                gridMode={layout.isWidthLower768 ? false : gridMode === 'gridMode'}
                loading={loading}
                hasMore={!!next}
                dataSource={interviews}
                onLoadMore={handleLoadMore}
                renderItem={(item) => (
                  <InterviewGrid
                    interview={item}
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
