import React from 'react';
import {
  Anchor, Layout,
} from 'antd';

import AnchorLink from 'antd/lib/anchor/AnchorLink';
import MyInterview from './MyInterview';
import PassInterview from './PassInterview';

const {
  Sider, Content,
} = Layout;

const Profile = () => (
  <>
    <Layout>
      <Sider theme="light">
        <Anchor offsetTop={60}>
          <AnchorLink href="#myinterview" title="My Interview" />
          <AnchorLink href="#passinterview" title="Passed Interview" />
        </Anchor>
      </Sider>
      <Content>
        <MyInterview />
        <br />
        <PassInterview />
      </Content>
    </Layout>
  </>
);
Profile.propTypes = {
};

export default Profile;
