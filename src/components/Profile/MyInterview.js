import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import InterviewsSummary from '../ManageInterviews/InterviewsSummary';

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
      <h2 id="myinterview">Own Interviews</h2>
      <InterviewsSummary />
    </>
  );
};
MyInterview.propTypes = {
};

export default MyInterview;
