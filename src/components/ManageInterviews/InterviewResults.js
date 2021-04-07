import React, { useEffect, useState } from 'react';
import { Badge, Spin, Table } from 'antd';
import { Link } from 'gatsby-plugin-intl';
import Moment from 'react-moment';
import { LoadingOutlined } from '@ant-design/icons';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';

const columns = [
  {
    title: 'Candidate',
    dataIndex: 'candidateUser',
    render: (candidateUser) => candidateUser?.name,
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
    render: (endDate) => {
      if (!endDate) {
        return '';
      }
      return (
        <Moment date={endDate} format="lll" />
      );
    },
  },
  {
    title: 'Action',
    key: 'action',
    width: 150,
    render: (action, { id }) => (
      <span>
        <Link to={`/manageInterviews/${action.interview.id}/${id}`}>Result</Link>
      </span>
    ),
  },
];

const InterviewResults = ({ id, location }) => {
  const { getInterviewSessions } = useApi();
  const [myInterviewsSessions, setMyInterviewsSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInterviewSessions({
      interviewId: id,
      owner: false,
    })
      .then(({ results: iss }) => {
        iss.sort((isa, isb) => isb.score - isa.score);
        setMyInterviewsSessions(iss);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <CustomBreadcrumb crumbs={[{
        label: 'Manage Interviews',
        path: '/manageInterviews',
      }, {
        label: location.state?.interviewName,
        path: location.pathname,
      }]}
      />
      <Headline title="Manage Interviews">
        <Link to={`/interviews/${id}`}>{location.state?.interviewName}</Link>
      </Headline>
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <Table
          rowKey={(interviewSession) => interviewSession.id}
          showHeader={false}
          columns={columns}
          dataSource={myInterviewsSessions}
          pagination={false}
        />
      </Spin>
      <Seo subTitle={location.state?.interviewName} />
    </>
  );
};
InterviewResults.propTypes = {};

export default InterviewResults;
