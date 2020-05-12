import React from 'react';
import { Router, useMatch } from '@reach/router';
import TestedInterviewList from './TestedInterviewList';
import TestedInterview from './TestedInterview';

const TestedInterviews = (props) => {
  const matchDefault = useMatch('/testedInterviews/*') ? '/testedInterviews' : '/:locale/testedInterviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <TestedInterviewList path="/" />
      <TestedInterview path="/:sessionId" />
    </Router>
  );
};

TestedInterviews.propTypes = {};

export default TestedInterviews;
