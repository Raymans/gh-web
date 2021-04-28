import React, { useEffect, useState } from 'react';
import { Avatar, Col, Descriptions, Row, Spin } from 'antd';
import { GithubOutlined, LinkedinOutlined, LoadingOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import PassInterview from './PassInterview';
import LikedInterviews from '../Interviews/LikedInterviews';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import InterviewsSummary from '../ManageInterviews/InterviewsSummary';
import { FormattedMessage } from 'gatsby-plugin-intl';

const StyledBasicProfileRow = styled(Row)`
  padding-bottom: 50px;
`;
const Profile = ({ userId }) => {
  const { getUserProfile } = useApi();
  const [profile, setProfile] = useState({ nickname: '' });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserProfile(userId)
      .then((res) => {
        setProfile(res);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: `${profile.nickname}`,
        path: location.pathname
      }]}/>
      <Headline title={<FormattedMessage defaultMessage="Profile - {nickname}"
                                         values={{ nickname: profile.nickname }}/>}/>
      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
        <StyledBasicProfileRow align="middle">
          <Col span={8}>
            <Avatar size={200} src={profile.avatar}/>
          </Col>
          <Col span={16}>
            <Descriptions column={1}>
              <Descriptions.Item>
                {profile.nickname}
              </Descriptions.Item>
              <Descriptions.Item
                label={<MailOutlined/>}
              >
                {profile.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={<GithubOutlined/>}>{profile.metadata?.github}</Descriptions.Item>
              <Descriptions.Item
                label={<LinkedinOutlined/>}>{profile.metadata?.linkedIn}</Descriptions.Item>
              <Descriptions.Item label="Company">{profile.metadata?.companyName}</Descriptions.Item>
              <Descriptions.Item>{profile.metadata?.note}</Descriptions.Item>
            </Descriptions>
          </Col>
        </StyledBasicProfileRow>
      </Spin>
      {/* <MyInterview /> */}
      <h2><FormattedMessage defaultMessage="{name}'s interviews"
                            values={{ name: profile.nickname }}/></h2>
      <InterviewsSummary userId={userId}/>
      <LikedInterviews/>
      <PassInterview/>
      <Seo subTitle={profile.nickname}/>
    </>
  );
};
Profile.propTypes = {};

export default Profile;
