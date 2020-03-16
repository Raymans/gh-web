import React from 'react';
import { Layout } from 'antd';
import { AnchorSider } from '../Sider';
import QuestionList from '../Questions/QuestionList';

const Interview = (props) => {
  const { id } = props;
  return (
    <Layout>
      <AnchorSider />
      <Layout.Content>
        <QuestionList />
      </Layout.Content>
    </Layout>
  );
};

Interview.propTypes = {};

export default Interview;
