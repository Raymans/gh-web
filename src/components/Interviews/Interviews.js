import React from 'react';
import { Router } from '@reach/router';
import Interview from './Interview';
import InterviewList from './InterviewList';
import InterviewTest from './InterviewTest';

const Interviews = (props) => (
  <Router basepath="/interviews">
    <InterviewList path="/" />
    <Interview path="/:id" />
    <InterviewTest path="/:id/test" />
  </Router>
);

Interviews.propTypes = {};

export default Interviews;
