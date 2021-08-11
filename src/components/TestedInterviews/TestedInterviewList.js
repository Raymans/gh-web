import React, { useEffect, useState } from 'react';
import { Badge, Spin, Table } from 'antd';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import Moment from 'react-moment';
import { LoadingOutlined } from '@ant-design/icons';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';

const columns = [
  {
    title: 'Interview',
    dataIndex: 'interview',
    render: (interview) => <Link to={`/interviews/${interview.id}`}>{interview.title}</Link>
  },
  {
    title: 'Score',
    dataIndex: 'totalScore',
    render: (score, { interviewEndDate }) => {
      if (!interviewEndDate) {
        return '';
      }
      return score * 100;
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 150,
    render: (status) => (
      <span>
        {
          status === 'STARTED'
          && <Badge status="processing" text={<FormattedMessage defaultMessage="In Testing"/>}/>
        }
        {
          status === 'ENDED'
          && <Badge status="success" text={<FormattedMessage defaultMessage="Completed"/>}/>
        }
      </span>
    )
  },
  {
    title: 'Complete Date',
    dataIndex: 'interviewEndDate',
    render: (endDate) => (
      endDate && <Moment date={endDate} format="lll"/>
    )
  },
  {
    title: 'Action',
    key: 'action',
    width: 150,
    render: (action, {
      id,
      status
    }) => (
      <span>
        {
          (status === 'STARTED' || status === 'NOT_STARTED')
          && <Link to={`/interviews/${id}/test`}><FormattedMessage defaultMessage="Go test"/></Link>
        }
        {
          status === 'ENDED'
          && <Link to={`/testedInterviews/${id}`}><FormattedMessage defaultMessage="Result"/></Link>
        }
      </span>
    )
  }
];

const TestedInterviewList = ({
  headline = null,
  breadcrumbs = null
}) => {
  const intl = useIntl();
  const { getInterviewSessions } = useApi();
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
      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
        <Table
          rowKey={(interviewSession) => interviewSession.id}
          showHeader={false}
          columns={columns}
          dataSource={myInterviewsSessions}
          pagination={false}
        />
      </Spin>
      <Seo subTitle={intl.formatMessage({ defaultMessage: 'Passed Assessments' })}/>
    </>
  );
};

TestedInterviewList.propTypes = {};

export default TestedInterviewList;
