import { Anchor, Layout } from 'antd';
import React from 'react';

const AnchorSilder = (props) => (
  <Layout.Sider theme="light">
    <Anchor offsetTop={60}>
      <Anchor.Link href="#question1" title="Title of Question1" />
      <Anchor.Link href="#question2" title="Title of Question2" />
      <Anchor.Link href="#question3" title="Title of Question3" />
    </Anchor>
  </Layout.Sider>

);
export default AnchorSilder;

AnchorSilder.propTypes = {};
