import React from 'react';
import { Router, useMatch } from '@reach/router';
import TestedInterviewList from './TestedInterviewList';
import TestedInterview from './TestedInterview';
import Headline from '../Article/Headline';

const TestedInterviews = (props) => {
  const matchDefault = useMatch('/testedInterviews/*') ? '/testedInterviews' : '/:locale/testedInterviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <TestedInterviewList path="/" headline={<Headline title="Tested Interviews" />} />
      <TestedInterview path="/:sessionId" />
    </Router>
  );
};

TestedInterviews.propTypes = {};

export default TestedInterviews;
