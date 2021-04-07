import React from 'react';
import { Router, useMatch } from '@reach/router';
import InterviewsSummary from './InterviewsSummary';
import InterviewResults from './InterviewResults';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import InterviewResult from './InterviewResult';

const ManageInterviews = (props) => {
  const matchDefault = useMatch('/manageInterviews/*') ? '/manageInterviews' : '/:locale/manageInterviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <InterviewsSummary
        path="/"
        breadcrumbs={<CustomBreadcrumb crumbs={[{ label: 'Manage Interviews', path: '/manageInterviews' }]} />}
        headline={<Headline title="Manage Interviews" />}
      />
      <InterviewResults path="/:id/" />
      <InterviewResult path="/:id/:sessionId" />
    </Router>
  );
};

ManageInterviews.propTypes = {};

export default ManageInterviews;
