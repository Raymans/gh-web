import {
  Anchor, Form, Input, Layout,
} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import QuestionForm from '../Question';
import AnchorSilder from '../Sider/AnchorSider';

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
      <AnchorSilder />
      <Content>
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
          <QuestionForm />
          <StyledDivider orientation="left" id="question2">Question2</StyledDivider>
          <QuestionForm id="question2" />
          <StyledDivider orientation="left" id="question3">Question3</StyledDivider>
          <QuestionForm id="question3" />
          <StyledDivider>Question4</StyledDivider>
          <QuestionForm id="question4" />
          <QuestionForm id="question5" />
          <QuestionForm id="question6" />
          <QuestionForm id="question7" />
        </Form>
      </Content>
    </Layout>
  </>
);

export default InterviewForm;
