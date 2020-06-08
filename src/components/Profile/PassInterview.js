import React from 'react';
import { Avatar, Badge, Table } from 'antd';
import TestedInterviewList from '../TestedInterviews/TestedInterviewList';


const PassInterview = () => (
  <>
    <h2 id="passinterview">Pass Interview</h2>
    <TestedInterviewList />
  </>
);
PassInterview.propTypes = {};

export default PassInterview;
