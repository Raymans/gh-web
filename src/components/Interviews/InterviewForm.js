import { Affix, Anchor, Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
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
      <Content style={{
        background: '#fff', padding: 24, margin: 0,
      }}
      >
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
      </Content>
      <Sider theme="light">
        <Affix offsetTop={60}>
          <Anchor>
            <Link href="#question1" title="Title of Question1" />
            <Link href="#question2" title="Title of Question2" />
            <Link href="#question3" title="Title of Question3" />
          </Anchor>
        </Affix>
      </Sider>
    </Layout>
  </>
);

export default InterviewForm;
