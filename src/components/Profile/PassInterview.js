import React from 'react';
import TestedInterviewList from '../TestedInterviews/TestedInterviewList';
import { FormattedMessage } from 'gatsby-plugin-intl';


const PassInterview = () => (
  <>
    <h2 id="passinterview"><FormattedMessage defaultMessage="Passed Assessments"/></h2>
    <TestedInterviewList/>
  </>
);
PassInterview.propTypes = {};

export default PassInterview;
