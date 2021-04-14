import React from 'react';
import TestedInterviewList from '../TestedInterviews/TestedInterviewList';
import { FormattedMessage } from 'gatsby-plugin-intl';


const PassInterview = () => (
  <>
    <h2 id="passinterview"><FormattedMessage defaultMessage="Passed Interviews"/></h2>
    <TestedInterviewList/>
  </>
);
PassInterview.propTypes = {};

export default PassInterview;
