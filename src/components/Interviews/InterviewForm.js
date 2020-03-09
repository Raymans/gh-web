import { Affix, Anchor } from 'antd';
import React from 'react';
import styled from 'styled-components';
import Divider from 'antd/lib/divider';
import Question from '../Question';

const { Link } = Anchor;

const StyledDivider = styled(Divider)`
  background: #a8d0e7;
`;
const StyledAnchor = styled(Affix)`
  position: absolute;
  right: 20px;
`;

const InterviewForm = () => (
  <>
    <StyledAnchor offsetTop={60}>
      <Anchor>
        <Link href="#question1" title="Title of Question1" />
        <Link href="#question2" title="Title of Question2" />
        <Link href="#question3" title="Title of Question3" />
      </Anchor>
    </StyledAnchor>
    <Question id="question1" />
    <StyledDivider />
    <Question id="question2" />
    <StyledDivider />
    <Question id="question3" />
    <StyledDivider />
    <Question id="question4" />
    <Question id="question5" />
    <Question id="question6" />
    <Question id="question7" />
  </>
);

export default InterviewForm;
