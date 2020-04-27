import React from 'react';
import {
  Badge, Collapse, Progress, Table,
} from 'antd';

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

const ManageInterviews = () => (
  <>
    <Collapse>
      <Collapse.Panel
        header={(
          <span>
            <div>Interview abc</div>
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
        key="1"
      >
        <Table showHeader={false} columns={columns} dataSource={data} pagination={false} />
      </Collapse.Panel>
      <Collapse.Panel header="This is panel header 2" key="2">
        <div>test</div>
      </Collapse.Panel>
      <Collapse.Panel header="This is panel header 3" key="3">
        <div>test</div>
      </Collapse.Panel>
    </Collapse>
  </>
);
ManageInterviews.propTypes = {};

export default ManageInterviews;
