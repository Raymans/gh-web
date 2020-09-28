import React, { useEffect, useState } from 'react';
import {
  Badge, Descriptions, List, Spin,
} from 'antd';
import { Link } from 'gatsby-plugin-intl';
import { LoadingOutlined } from '@ant-design/icons';
import Headline from '../Article/Headline';
import useApi from '../../hooks/useApi';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 150,
    render: (text) => (
      <span>
        <Badge status="success" />
        {text}
      </span>
    ),
  },
  {
    title: 'Complete Date',
    dataIndex: 'completeDate',
  },
];

const InterviewsSummary = ({ headline = null, breadcrumbs = null }) => {
  const getInterviews = useApi().getInterviews({ owner: true });
  const [myInterviews, setMyInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myInterviewsSessions, setMyInterviewsSessions] = useState({});
  useEffect(() => {
    getInterviews()
      .then(({ results: myIvs }) => {
        setMyInterviews(myIvs);
        setLoading(false);
        // myIvs.map((myIv) => {
        //   getInterviewSessions({ interviewId: myIv.id }).then(({ results: iss }) => {
        //     myInterviewsSessions[myIv.id] = iss;
        //     setMyInterviewsSessions(myInterviewsSessions);
        //   });
        // });
      });
  }, []);
  return (
    <>
      {breadcrumbs}
      {headline}
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        <List
          itemLayout="horizontal"
          dataSource={myInterviews}
          renderItem={(interview) => {
            let totalGeeks = 0;
            for (const key in interview.interviewSessions) {
              totalGeeks += interview.interviewSessions[key]?.length;
            }

            return (
              <List.Item
                actions={[
                  <>
                    <Link
                      to={`/manageInterviews/${interview.id}`}
                      state={{ interviewName: interview.title }}
                    >
                      {`${totalGeeks} geeks`}
                    </Link>
                    {interview.interviewSessions.STARTED > 0 && `${interview.interviewSessions.STARTED} pending)`}
                  </>]}
              >
                <List.Item.Meta
                  title={<h1><Link to={`/interviews/${interview.id}`}>{interview.title}</Link></h1>}
                  description={(
                    <>
                      <Descriptions column={2}>
                        <Descriptions.Item
                          label="Specialization"
                        >
                          {interview.specialization.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Job Title">{interview.jobTitle}</Descriptions.Item>
                        <Descriptions.Item span={2}>{interview.description}</Descriptions.Item>
                      </Descriptions>
                    </>
                )}
                />

              </List.Item>
            );
          }}
        />
      </Spin>
    </>
  );
};
InterviewsSummary.propTypes = {};

export default InterviewsSummary;
