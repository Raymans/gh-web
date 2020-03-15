import {
  Anchor, Form, Input, Layout,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import Question from '../Question';

const {
  Sider, Content,
} = Layout;

const { Link } = Anchor;

const StyledDivider = styled(Divider)`
  background: #a8d0e7;
`;

const InterviewForm = () => (
  <>
    <Layout>
      <Sider theme="light">
        <Anchor offsetTop={60}>
          <Link href="#question1" title="Title of Question1" />
          <Link href="#question2" title="Title of Question2" />
          <Link href="#question3" title="Title of Question3" />
        </Anchor>
      </Sider>
      <Content style={{
        background: '#fff', padding: 24, margin: 0,
      }}
      >
        <Form>
          <FormItem name="interviewName" rules={[{ required: true, whitespace: true }]}>
            <Input placeholder="Interview name" />
          </FormItem>
          <FormItem name="position">
            <Input placeholder="Position" />
          </FormItem>
          <FormItem
            name="interviewDes"
            rules={[{
              required: true,
              message: 'Interview description',
              whitespace: true,
            }]}
          >
            <TextArea placeholder="Interview description" autoSize={{ minRows: 2, maxRows: 6 }} />
          </FormItem>
          <StyledDivider orientation="left" id="question1">Question1</StyledDivider>
          <Question />
          <StyledDivider orientation="left" id="question2">Question2</StyledDivider>
          <Question id="question2" />
          <StyledDivider orientation="left" id="question3">Question3</StyledDivider>
          <Question id="question3" />
          <StyledDivider>Question4</StyledDivider>
          <Question id="question4" />
          <Question id="question5" />
          <Question id="question6" />
          <Question id="question7" />
        </Form>
      </Content>
    </Layout>
  </>
);

export default InterviewForm;
