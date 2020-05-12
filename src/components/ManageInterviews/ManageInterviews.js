import React from 'react';
import { Router, useMatch } from '@reach/router';
import InterviewsSummary from './InterviewsSummary';
import InterviewResults from './InterviewResults';
import InterviewResult from './InterviewResult';

const ManageInterviews = (props) => {
  const matchDefault = useMatch('/manageInterviews/*') ? '/manageInterviews' : '/:locale/manageInterviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <InterviewsSummary path="/" />
      <InterviewResults path="/:id/" />
      <InterviewResult path="/:id/:interviewSession" />
    </Router>
  );
};

ManageInterviews.propTypes = {};

export default ManageInterviews;
