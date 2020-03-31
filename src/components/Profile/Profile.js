import React from 'react';
import { Layout } from 'antd';
import MyInterview from './MyInterview';
import PassInterview from './PassInterview';
import { AnchorSider } from '../Sider';


const {
  Content,
} = Layout;

const Profile = () => (
  <>
    <Layout>
      <AnchorSider anchors={[
        { href: '#myinterview', title: 'My Interview' },
        { href: '#passinterview', title: 'Passed Interview' }]}
      />
      <Content>
        <MyInterview />
        <br />
        <PassInterview />
      </Content>
    </Layout>
  </>
);
Profile.propTypes = {};

export default Profile;
