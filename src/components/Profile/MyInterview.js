import React, { useEffect, useState } from 'react';
import {
  List, Avatar, Button, Skeleton, Badge,
} from 'antd';

const count = 3;

const fakelist = {
  results: [{
    name: 'First Interview',
  }, {
    name: 'Second Interview',
  }, {
    name: 'Third Interview',
  }],
};
const getData = (callback) => callback(fakelist);
const MyInterview = () => {
  const [loadingData, setLoadingData] = useState({
    initLoading: true,
    loading: false,
    data: [],
    list: [],
  });
  const onLoadMore = () => {
    setLoadingData({
      ...loadingData,
      loading: true,
      list: loadingData.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
    });
    getData((res) => {
      const data = loadingData.data.concat(res.results);
      setLoadingData({
        ...loadingData,
        data,
        list: data,
        loading: false,
      });
    });
  };

  useEffect(() => {
    getData((res) => {
      setLoadingData({
        ...loadingData,
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }, []);
  const { initLoading, loading, list } = loadingData;
  const loadMore = !initLoading && !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={onLoadMore}>loading more</Button>
    </div>
  ) : null;
  return (
    <>
      <h2 id="myinterview">My Interview</h2>
      <List
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[<Badge dot><a key="result">5 geeks</a></Badge>, <a key="delete">delete</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                title={<a href="#">{item.name}</a>}
                description="This is interview for Google Geeks"
              />
            </Skeleton>

          </List.Item>
        )}
      />
    </>
  );
};
MyInterview.propTypes = {
};

export default MyInterview;
