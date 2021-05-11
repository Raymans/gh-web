import React from 'react';
import { Router, useMatch } from '@reach/router';
import InterviewsSummary from './InterviewsSummary';
import InterviewResults from './InterviewResults';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import InterviewResult from './InterviewResult';
import { useIntl } from 'gatsby-plugin-intl';

const ManageInterviews = (props) => {
  const matchDefault = useMatch('/manageInterviews/*') ? '/manageInterviews' : '/:locale/manageInterviews';
  const intl = useIntl();
  return (
    <Router
      basepath={matchDefault}
    >
      <InterviewsSummary
        path="/"
        breadcrumbs={<CustomBreadcrumb crumbs={[{
          label: intl.formatMessage({ defaultMessage: 'Manage Assessments' }),
          path: '/manageInterviews'
        }]}/>}
        headline={<Headline title={intl.formatMessage({ defaultMessage: 'Manage Assessments' })}/>}
      />
      <InterviewResults path="/:id/"/>
      <InterviewResult path="/:id/:sessionId"/>
    </Router>
  );
};

ManageInterviews.propTypes = {};

export default ManageInterviews;
