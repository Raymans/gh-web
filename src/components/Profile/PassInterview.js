import React from 'react';
import { Avatar, Badge, Table } from 'antd';


const PassInterview = () => {
  const expandedRowRender = () => {
    const columns = [
      { dataIndex: 'date', key: 'date' },
      { dataIndex: 'score', key: 'score' },
      {

        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        ),
      },
      {
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <a>view</a>
        ),
        align: 'right',
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12',
        score: 78,
      });
    }
    return <Table showHeader={false} columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Times', dataIndex: 'times', key: 'times' },
    { title: 'Avg Score', dataIndex: 'avgScore', key: 'avgScore' },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (v) => (
        <div style={{ 'white-space': 'nowrap' }}>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <span>{v}</span>
        </div>
      ),
    },
    { title: 'Created on', dataIndex: 'createdOn', key: 'createdOn' },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Frontend Interview',
      description: 'test interview description',
      times: 3,
      avgScore: 87,
      owner: 'Google',
      createdOn: '2014-12-24 23:12:00',
    });
  }

  return (
    <>
      <h2 id="passinterview">Pass Interview</h2>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />
    </>
  );
};
PassInterview.propTypes = {};

export default PassInterview;
