import {
  Avatar, Divider, Input, Layout, List, Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import GatsbyLink from 'gatsby-link';
import { Link } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { getInterviews } from '../../utils/api';

import FilterSider from '../Sider/FilterSider';
import Headline from '../Article/Headline';
import Specialization from '../Specialization';

const { Search } = Input;
const { Content } = Layout;

const StyledAvatar = styled(Avatar)`
  margin: 0 5px;
`;

const StyledList = styled(List)`
  .ant-list-item-meta-title{
    margin: 18px 0;
    font-size: 24px;
  }
  .ant-list-item{
    padding: 22px;
    margin: 22px 0;
    border: 1px solid #e8e8e8;
    border-radius: 9px;
  }
  .ant-list-item:hover {
    //background-color: aliceblue;
    border-width: 3px;
    transition: border-width 0.3s;
  }
`;

let filters = { keyword: '', tab: 'explore' };

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchInterviews = () => {
    setLoading(true);
    getInterviews(filters).then((res) => {
      setInterviews(res.results);
      setLoading(false);
    });
  };

  useEffect(() => {
    searchInterviews();
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
    if (target.value === 'mine') {
      filters = { ...filters, owner: true };
    } else {
      filters = { ...filters, owner: false };
    }
    searchInterviews();
  };

  return (
    <>
      <Headline title="Interviews"><Link to="/interviews/create">Create</Link></Headline>
      {/* <GatsbyLink to={'/interviews/1/test'}>Test interview 1</GatsbyLink> */}
      <div className="form">
        <div>
          <Layout>
            <FilterSider onChange={handleTabChange} />

            <Content>
              <Specialization onSelect={handleSpecSelect} />

              <Search
                placeholder="search interview"
                onSearch={handleSearch}
                style={{ width: 200, float: 'right' }}
              />
              <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
                <StyledList
                  itemLayout="vertical"
                  size="large"
                  dataSource={interviews}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                    >
                      <h1><GatsbyLink to={`/interviews/${item.id}`}>{item.title}</GatsbyLink></h1>
                      <span className="content">{item.description}</span>
                      <Divider orientation="left">Author</Divider>
                      <StyledAvatar
                        src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"
                      >
                        {item.clientAccount.email.split('@')[0]}
                      </StyledAvatar>
                      <span>{item.clientAccount.email}</span>
                    </List.Item>
                  )}
                />
              </Spin>
            </Content>
          </Layout>
        </div>
      </div>
    </>
  );
};

InterviewList.propTypes = {};

export default InterviewList;
