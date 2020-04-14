import PropTypes from 'prop-types';
import {
  Avatar, Button, Descriptions, Divider, Input, Layout, List, message, Modal, Space, Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, navigate } from 'gatsby-plugin-intl';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { deleteInterview, getInterviews } from '../../utils/api';

import FilterSider from '../Sider/FilterSider';
import Headline from '../Article/Headline';
import Specialization from '../Specialization';
import { getUserInfo } from '../../utils/auth';

const { Search } = Input;
const { Content } = Layout;

const StyledListItem = styled(List.Item)`
  .ant-list-item-extra{
    position: absolute;
    float: left;
    right: 25px;
  }
`;

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
    border: 1px solid #e8e8e8 !important;
    border-radius: 9px;
  }
  .ant-list-item:hover {
    border-width: 3px !important;
    transition: margin 0.3s, border-width 0.3s;
    margin: 20px -2px;
  }
`;

let filters = { keyword: '', tab: 'explore' };

const InterviewGrid = (props) => {
  const {
    id, title, description, specialization: { name: specializationName }, jobTitle, email,
  } = props;
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleDeleteInterview = () => {
    setSaving(true);
    deleteInterview(id).then(() => {
      setDeleted(true);
      message.success(`Interview has been deleted: ${title}`);
    });
  };
  let updateActions = [];
  if (email === getUserInfo().email) {
    updateActions = [
      <Space>
        <Button
          size="small"
          shape="circle"
          icon={<EditOutlined />}
          onClick={() => {
            navigate(`/interviews/${id}/edit`);
          }}
        />
        <Button
          size="small"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => setIsDeleteModalVisible(true)}
        />
      </Space>];
  }
  return (
    <>
      {
        !deleted
        && (
          <>
            <Modal
              title="Delete Interview"
              visible={isDeleteModalVisible}
              onOk={handleDeleteInterview}
              onCancel={() => setIsDeleteModalVisible(false)}
            >
              <p>{`Are you sure to delete the interview: ${title}?`}</p>
            </Modal>
            <Spin spinning={saving} indicator={<LoadingOutlined spin />}>
              <StyledListItem
                key={id}
                extra={updateActions}
              >
                <h1><Link to={`/interviews/${id}`}>{title}</Link></h1>
                <Descriptions column={2}>
                  <Descriptions.Item label="Specialization">{specializationName}</Descriptions.Item>
                  <Descriptions.Item label="Job Title">{jobTitle}</Descriptions.Item>
                  <Descriptions.Item span={2}>{description}</Descriptions.Item>
                </Descriptions>
                <Divider orientation="left">Author</Divider>
                <StyledAvatar
                  src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"
                >
                  {email.split('@')[0]}
                </StyledAvatar>
                <span>{email}</span>
              </StyledListItem>
            </Spin>
          </>
        )
      }
    </>
  );
};
const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();
  const searchInterviews = ({ isAppend = false, url } = {}) => {
    setLoading(true);
    getInterviews({ url, ...filters }).then((res) => {
      setInterviews(isAppend ? interviews.concat(res.results) : res.results);
      setLoading(false);
      setNext(res.next);
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
    if (target.value === 'mine') {
      filters = { ...filters, owner: true };
    } else {
      filters = { ...filters, owner: false };
    }
    searchInterviews();
  };

  const handleLoadMore = () => {
    searchInterviews({ isAppend: true, url: next });
  };
  const loadMore = next && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={handleLoadMore}>loading more</Button>
    </div>
  ) : null;

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
                  loadMore={loadMore}
                  renderItem={(item) => (
                    <InterviewGrid
                      id={item.id}
                      title={item.title}
                      description={item.description}
                      email={item.clientAccount.email}
                      jobTitle={item.jobTitle}
                      specialization={item.specialization}
                    />
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

InterviewGrid.propTypes = {
  description: PropTypes.string.isRequired,
  email: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
