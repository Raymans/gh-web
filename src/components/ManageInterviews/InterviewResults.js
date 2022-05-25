import React, { useEffect, useState } from 'react';
import { Badge, Spin, Table } from 'antd';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import Moment from 'react-moment';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Headline from '../Article/Headline';
import CustomBreadcrumb from '../CustomBreadcrumb';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import useGetStarted from '../../hooks/useGetStarted';
import InterviewSummaryChart from '../Chart/InterviewSummaryChart';

const StyledScore = styled.span`
  color: cadetblue;
  font-weight: bold;
  font-size: 14px;
`;
const StyledRank = styled.span`
  &.rank_1 {
    color: #d7d608;
    font-weight: bold;
    font-size: 20px;
  }

  &.rank_2 {
    color: #aeaeae;
    font-weight: bold;
    font-size: 16px;
  }

  &.rank_3 {
    color: #7c4b4b;
    font-weight: bold;
    font-size: 14px;
  }
`;

const StyledTable = styled(Table)`
  margin-top: 50px;
`;

const buildColumns = (isGetStarted = false, setStep = () => {
}) => [
  {
    dataIndex: 'rank',
    render: (rank, interviewSession, index) =>
      <StyledRank
        className={`rank_${index + 1}`}>{index + 1}</StyledRank>
  },
  {
    title: 'Candidate',
    dataIndex: 'candidateUser',
    render: (candidateUser) => candidateUser?.name
  },
  {
    title: 'Score',
    dataIndex: 'totalScore',
    render: (totalScore, { interviewEndDate }) => {
      if (!interviewEndDate) {
        return '';
      }
      return (<StyledScore>{totalScore * 100}</StyledScore>);
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
    title: <FormattedMessage defaultMessage="Complete Date"/>,
    dataIndex: 'interviewEndDate',
    responsive: ['md'],
    render: (endDate) => {
      if (!endDate) {
        return '';
      }
      return (
        <Moment date={endDate}/>
      );
    }
  },
  {
    title: 'Action',
    key: 'action',
    width: 150,
    render: (action, { id }) => (
      isGetStarted ?
        <span>
        <Link to={`/get-started`} onClick={() => setStep(3)}>
          <FormattedMessage defaultMessage="See Result"/>
        </Link>
      </span> :
        <span>
        <Link to={`/manageInterviews/${action.interview.id}/${id}`}>
          <FormattedMessage defaultMessage="See Result"/>
        </Link>
      </span>
    )
  }
];

const InterviewResults = ({
  id,
  location
}) => {
  const {
    getInterviewSessions,
    getInterview
  } = useApi();
  const intl = useIntl();
  const [myInterviewsSessions, setMyInterviewsSessions] = useState([]);
  const [interview, setInterview] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    isGetStarted,
    setStep
  } = useGetStarted();
  useEffect(() => {
    getInterview(id)
      .then((data) => {
        setInterview(data);
      });

    getInterviewSessions({
      interviewId: id,
      owner: false
    })
      .then(({ results: iss }) => {
        iss.sort((isa, isb) => isb.score - isa.score);
        setMyInterviewsSessions(iss);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      {
        !isGetStarted &&
        <>
          <CustomBreadcrumb crumbs={[{
            label: <FormattedMessage id="breadcrumb.browse.title"/>,
            path: '/interviews'
          }, {
            label: location?.state?.interviewName,
            path: location?.pathname
          }]}
          />
          <Headline title={intl.formatMessage({ defaultMessage: 'Manage Interviews' })}>
            <Link to={`/interviews/${id}`}><FormattedMessage
              defaultMessage={'See Assessment detail'}/></Link>
          </Headline>
        </>
      }

      <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
        <InterviewSummaryChart interview={interview}
                               interviewSessions={myInterviewsSessions}/>

        <StyledTable
          rowKey={(interviewSession) => interviewSession.id}
          showHeader={false}
          columns={buildColumns(isGetStarted, setStep)}
          dataSource={myInterviewsSessions}
          pagination={false}
        />
      </Spin>
      <Seo subTitle={location?.state?.interviewName}/>
    </>
  );
};
InterviewResults.propTypes = {};

export default InterviewResults;
