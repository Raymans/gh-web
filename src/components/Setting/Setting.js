import React from 'react';
import {
  Anchor, Form, Input, Layout,
} from 'antd';
import AnchorLink from 'antd/lib/anchor/AnchorLink';
import FormItem from 'antd/lib/form/FormItem';

const {
  Sider, Content,
} = Layout;

const Setting = () => (
  <>
    <Layout>
      <Sider theme="light">
        <Anchor offsetTop={60}>
          <AnchorLink href="#account" title="Account" />
          <AnchorLink href="#notification" title="Notification" />
        </Anchor>
      </Sider>
      <Content style={{
        background: '#fff', padding: 24, margin: 0,
      }}
      >
        <Form>
          <FormItem name="email" label="Email" rules={[{ type: 'email' }]}>
            <Input />
          </FormItem>
        </Form>
      </Content>
    </Layout>
  </>
);
Setting.propTypes = {
};

export default Setting;
