import React from 'react';
import {
  Avatar, Col, Descriptions, Row,
} from 'antd';
import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MyInterview from './MyInterview';
import PassInterview from './PassInterview';
import LikedInterviews from '../Interviews/LikedInterviews';


const StyledBasicProfileRow = styled(Row)`
padding-bottom: 50px;
`;
const Profile = () => (
  <>
    {/* <AnchorSider anchors={[ */}
    {/*  { href: '#myinterview', title: 'My Interview' }, */}
    {/*  { href: '#passinterview', title: 'Passed Interview' }]} */}
    {/* /> */}
    <StyledBasicProfileRow align="middle">
      <Col span={8}>
        <Avatar size={200} src="https://avatars0.githubusercontent.com/u/5819635?s=400&u=28fed09b4c20e36c8dfa58063d3dedfa93bee04c&v=4" />
      </Col>
      <Col span={16}>
        <Descriptions column={1}>
          <Descriptions.Item>
                Raymans
          </Descriptions.Item>
          <Descriptions.Item
            label={<MailOutlined />}
          >
                raymanspeng@geekhub.tw
          </Descriptions.Item>
          <Descriptions.Item label={<GithubOutlined />}><a href="https://github.com/Raymans?tab=stars" target="_blank">https://github.com/Raymans?tab=stars</a></Descriptions.Item>
          <Descriptions.Item label="Company">GeekHub.TW</Descriptions.Item>
        </Descriptions>
      </Col>
    </StyledBasicProfileRow>
    <LikedInterviews />
    <MyInterview />
    <PassInterview />
  </>
);
Profile.propTypes = {};

export default Profile;
