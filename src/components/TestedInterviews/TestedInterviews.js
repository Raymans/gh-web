import React from 'react';
import { Router, useMatch } from '@reach/router';
import TestedInterviewList from './TestedInterviewList';
import TestedInterview from './TestedInterview';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import { FormattedMessage, useIntl } from 'gatsby-plugin-intl';

const TestedInterviews = (props) => {
  const intl = useIntl();
  const matchDefault = useMatch('/testedInterviews/*') ? '/testedInterviews' : '/:locale/testedInterviews';
  return (
    <Router
      basepath={matchDefault}
    >
      <TestedInterviewList
        path="/"
        breadcrumbs={<CustomBreadcrumb crumbs={[{
          label: <FormattedMessage defaultMessage="Passed Interviews"/>,
          path: '/testedInterviews'
        }]}/>}
        headline={<Headline title={intl.formatMessage({ defaultMessage: 'Passed Interviews' })}/>}
      />
      <TestedInterview path="/:sessionId"/>
    </Router>
  );
};

TestedInterviews.propTypes = {};

export default TestedInterviews;
