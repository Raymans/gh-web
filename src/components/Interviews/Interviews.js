import React from 'react';
import { Router, useMatch } from '@reach/router';
import Interview from './Interview';
import InterviewList from './InterviewList';
import InterviewTest from './InterviewTest';
import InterviewForm from './InterviewForm';

const Interviews = (props) => {
  const matchDefault = useMatch('/interviews/*') ? '/interviews' : '/:locale/interviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <InterviewList path="/" />
      <Interview path="/:id" />
      <InterviewTest path="/:id/test" />
      <InterviewForm path="/create" />
    </Router>
  );
};

Interviews.propTypes = {};

export default Interviews;
