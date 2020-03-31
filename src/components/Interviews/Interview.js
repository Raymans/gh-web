import {
  Badge, Descriptions, Form, Layout,
} from 'antd';
import React from 'react';
import AnchorSilder from '../Sider/AnchorSider';

const Interview = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Layout>
        <AnchorSilder />
        <Layout.Content>
          <Descriptions title="User Info">
            <Descriptions.Item label="Description">Description test</Descriptions.Item>

            <Descriptions.Item label="Speciality">Sr UI Engineer</Descriptions.Item>
            <Descriptions.Item label="Job Title">UI Engineer</Descriptions.Item>
            <Descriptions.Item label="Status"><Badge status="processing" text="Published" /></Descriptions.Item>
          </Descriptions>
          {/* <h2 id="sections1">Q.1</h2> */}
          {/* <QuestionGrid questionId={1} showAuthor={false} answerDisplayMode="inline" /> */}
          {/* <QuestionGrid questionId={2} /> */}
          {/* <QuestionGrid questionId={3} /> */}
          {/* <h2 id="sections2">Q.2</h2> */}
          {/* <QuestionGrid questionId={4} /> */}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default Interview;
