import React from 'react';
import { Router } from '@reach/router';
import Interview from './Interview';
import InterviewList from './InterviewList';
import InterviewTest from './InterviewTest';
import InterviewForm from './InterviewForm';

const Interviews = (props) => (
  <Router basepath="/interviews">
    <InterviewList path="/" />
    <Interview path="/:id" />
    <InterviewTest path="/:id/test" />
    <InterviewForm path="/create" />
  </Router>
);

Interviews.propTypes = {};

export default Interviews;
