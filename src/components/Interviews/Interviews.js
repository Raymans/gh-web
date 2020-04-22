import React from 'react';
import { Router, useMatch } from '@reach/router';
import Interview from './Interview';
import InterviewList from './InterviewList';
import InterviewForm from './InterviewForm';

const Interviews = (props) => {
  const matchDefault = useMatch('/interviews/*') ? '/interviews' : '/:locale/interviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <InterviewList path="/" />
      <Interview path="/:id" />
      <Interview path="/:sessionId/test" />
      <InterviewForm path="/create" />
      <InterviewForm path="/:id/edit" />
      <Interview path="/:id/published" />
    </Router>
  );
};

Interviews.propTypes = {};

export default Interviews;
