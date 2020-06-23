import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledList = styled(List)`
  .ant-list-item-meta-title{
    margin: 18px 0;
    font-size: 24px;
  }
  .ant-list-item{
    padding: 22px 0 0 22px;
    margin: 22px 0;
    border: 1px solid #e8e8e8 !important;
    border-top: 2px solid #1088ae !important;
    border-radius: 9px;
  }
`;

const CardList = (props) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const {
    loading, dataSource, renderItem, hasMore, onLoadMore
  } = props;

  const handleLoadMore = () => {
    setLoadingMore(true);
    onLoadMore()
      .then(() => {
        setLoadingMore(false);
      });
  };
  const loadMore = hasMore ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px'
      }}
    >
      <Button onClick={handleLoadMore} loading={loadingMore}>loading more</Button>
    </div>
  ) : null;
  return (
    <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
      <StyledList
        itemLayout="vertical"
        size="large"
        dataSource={dataSource}
        loadMore={loadMore}
        renderItem={renderItem}
      />
    </Spin>
  );
};
CardList.propTypes = {
  dataSource: PropTypes.array,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func,
  renderItem: PropTypes.func
};

export default CardList;
