import React from 'react';
import { Router, useMatch } from '@reach/router';
import TestedInterviewList from './TestedInterviewList';
import TestedInterview from './TestedInterview';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';

const TestedInterviews = (props) => {
  const matchDefault = useMatch('/testedInterviews/*') ? '/testedInterviews' : '/:locale/testedInterviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <TestedInterviewList
        path="/"
        breadcrumbs={<CustomBreadcrumb crumbs={[{ label: 'Tested Interviews', path: '/testedInterviews' }]} />}
        headline={<Headline title="Tested Interviews" />}
      />
      <TestedInterview path="/:sessionId" />
    </Router>
  );
};

TestedInterviews.propTypes = {};

export default TestedInterviews;
