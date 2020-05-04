import React, { useEffect, useState } from 'react';
import {
  Badge, Collapse, Progress, Table,
} from 'antd';
import Headline from '../Article/Headline';
import { getInterviews, getInterviewSessions } from '../../utils/api';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
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

const data = [{
  name: 'raymans',
  status: 'Started',
  completeDate: 'Now',
}, {
  name: 'raymans',
  status: 'Started',
  completeDate: 'Now',
}, {
  name: 'raymans',
  status: 'Started',
  completeDate: 'Now',
}];

const ManageInterviews = () => {
  const [myInterviews, setMyInterviews] = useState([]);
  const [myInterviewsSessions, setMyInterviewsSessions] = useState({});
  useEffect(() => {
    getInterviews({ owner: true }).then(({ results: myIvs }) => {
      setMyInterviews(myIvs);
      myIvs.map((myIv) => {
        getInterviewSessions({ interviewId: myIv.id }).then(({ results: iss }) => {
          myInterviewsSessions[myIv.id] = iss;
          setMyInterviewsSessions(myInterviewsSessions);
        });
      });
    });
  }, []);
  const handleOpenMyInterviews = (interviewId) => {
    getInterviewSessions(interviewId).then(({ results: iss }) => {
      setMyInterviewsSessions({ ...myInterviewsSessions }[interviewId] = iss);
    });
  };
  return (
    <>
      <Headline title="Manage Interviews" />
      <Collapse onChange={handleOpenMyInterviews}>
        {
          myInterviews.map((myInterview) => (
            <Collapse.Panel
              header={(
                <span>
                  <div>{myInterview.title}</div>
                  <span>Section 1:</span>
                  <Progress type="circle" percent={70} width={50} />
                  <span>Section 1:</span>
                  <Progress type="circle" percent={70} width={50} />
                  <span>Section 1:</span>
                  <Progress type="circle" percent={70} width={50} />
                  <span>5 geeks</span>
                  <span>Average score: </span>
                  <Progress type="circle" percent={70} width={50} />
                </span>
              )}
              key={myInterview.id}

            >
              {
                myInterviewsSessions[myInterview.id] && myInterviewsSessions[myInterview.id].map((is) => (
                  <Table showHeader={false} columns={columns} dataSource={is} pagination={false} />
                ))
              }

            </Collapse.Panel>
          ))
        }

        <Collapse.Panel header="This is panel header 2" key="2">
          <div>test</div>
        </Collapse.Panel>
        <Collapse.Panel header="This is panel header 3" key="3">
          <div>test</div>
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
ManageInterviews.propTypes = {};

export default ManageInterviews;
