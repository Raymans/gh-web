import React, { useEffect, useState } from 'react';
import {
  Badge, Descriptions, List, Spin,
} from 'antd';
import { Link } from 'gatsby-plugin-intl';
import { LoadingOutlined } from '@ant-design/icons';
import useApi from '../../hooks/useApi';
import Seo from '../Seo';
import AuthorBy from '../AuthorBy';

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

const InterviewsSummary = ({ headline = null, breadcrumbs = null, isOwnerChangeable = false }) => {
  const { getInterviews } = useApi();
  const [myInterviews, setMyInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myInterviewsSessions, setMyInterviewsSessions] = useState({});
  useEffect(() => {
    getInterviews({ owner: true })
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
                        <Descriptions.Item
                          label="Job Title"
                        >
                          {interview.jobTitle}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                          <Badge
                            status="processing"
                            text="In Testing"
                          />
                        </Descriptions.Item>
                        <Descriptions.Item label="Created Date">
                          2021-1-31 3:45
                          PM
                        </Descriptions.Item>
                        <Descriptions.Item
                          span={2}
                          style={{ whiteSpace: 'pre-line' }}
                        >
                          {interview.description}
                        </Descriptions.Item>
                      </Descriptions>
                      <AuthorBy isOwnerChangeable={isOwnerChangeable} />
                    </>
                  )}
                />

              </List.Item>
            );
          }}
        />
      </Spin>
      <Seo subTitle="Manage Interviews" />
    </>
  );
};
InterviewsSummary.propTypes = {};

export default InterviewsSummary;
