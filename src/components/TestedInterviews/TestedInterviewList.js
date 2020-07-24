import React, { useEffect, useState } from 'react';
import { Badge, Spin, Table } from 'antd';
import { Link } from 'gatsby-plugin-intl';
import Moment from 'react-moment';
import { LoadingOutlined } from '@ant-design/icons';
import { getInterviewSessions } from '../../utils/api';
import Headline from '../Article/Headline';

const columns = [
  {
    title: 'Interview',
    dataIndex: 'interview',
    render: (interview) => <Link to={`/interviews/${interview.id}`}>{interview.title}</Link>,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    render: (score, { interviewEndDate }) => {
      if (!interviewEndDate) {
        return '';
      }
      return score * 100;
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 150,
    render: (status) => (
      <span>
        {
          status === 'STARTED'
          && <Badge status="processing" text="In Testing" />
        }
        {
          status === 'ENDED'
          && <Badge status="success" text="Completed" />
        }
      </span>
    ),
  },
  {
    title: 'Complete Date',
    dataIndex: 'interviewEndDate',
    render: (endDate) => (
      <Moment date={endDate} format="lll" />
    ),
  },
  {
    title: 'Action',
    key: 'action',
    width: 150,
    render: (action, { id, status }) => (
      <span>
        {
          status === 'STARTED'
          && <Link to={`/interviews/${id}/test`}>Go test</Link>
        }
        {
          status === 'ENDED'
          && <Link to={`/testedInterviews/${id}`}>Result</Link>
        }
      </span>
    ),
  },
];

const TestedInterviewList = ({ headline = null,  breadcrumbs = null }) => {
  const [myInterviewsSessions, setMyInterviewsSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInterviewSessions()
      .then(({ results: iss }) => {
        setMyInterviewsSessions(iss);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {breadcrumbs}
      {headline}
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <Table
          rowKey={(interviewSession) => interviewSession.id}
          showHeader={false}
          columns={columns}
          dataSource={myInterviewsSessions}
          pagination={false}
        />
      </Spin>
    </>
  );
};

TestedInterviewList.propTypes = {};

export default TestedInterviewList;
