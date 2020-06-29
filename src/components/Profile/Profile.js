import React, { useEffect, useState } from 'react';
import {
  Avatar, Col, Descriptions, Row, Spin,
} from 'antd';
import {
  GithubOutlined, LinkedinOutlined, LoadingOutlined, MailOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import MyInterview from './MyInterview';
import PassInterview from './PassInterview';
import LikedInterviews from '../Interviews/LikedInterviews';
import { getUserProfile } from '../../utils/api';


const StyledBasicProfileRow = styled(Row)`
padding-bottom: 50px;
`;
const Profile = ({ userId }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserProfile(userId).then((res) => {
      setProfile(res);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <StyledBasicProfileRow align="middle">
          <Col span={8}>
            <Avatar size={200} src="https://avatars0.githubusercontent.com/u/5819635?s=400&u=28fed09b4c20e36c8dfa58063d3dedfa93bee04c&v=4" />
          </Col>
          <Col span={16}>
            <Descriptions column={1}>
              <Descriptions.Item>
                {profile.nickname}
              </Descriptions.Item>
              <Descriptions.Item
                label={<MailOutlined />}
              >
                {profile.email}
              </Descriptions.Item>
              <Descriptions.Item label={<GithubOutlined />}>{profile.metadata?.github}</Descriptions.Item>
              <Descriptions.Item label={<LinkedinOutlined />}>{profile.metadata?.linkedIn}</Descriptions.Item>
              <Descriptions.Item label="Company">{profile.metadata?.companyName}</Descriptions.Item>
              <Descriptions.Item>{profile.metadata?.note}</Descriptions.Item>
            </Descriptions>
          </Col>
        </StyledBasicProfileRow>
      </Spin>
      <LikedInterviews />
      <MyInterview />
      <PassInterview />
    </>
  );
};
Profile.propTypes = {};

export default Profile;
