import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Empty, List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { FormattedMessage } from 'gatsby-plugin-intl';

const StyledList = styled(List)`

  .ant-list-item-meta-title {
    margin: 18px 0;
    font-size: 24px;
  }

  .ant-list-item {
    padding: 22px;
    margin: 22px 0;
    border-top: 2px solid #1088ae !important;
    border-radius: 12px;
  }

  // grid item
  &.ant-list-grid .ant-col > .ant-list-item {
    padding: ${(props) => !props.gridMode ? '54px 22px 22px;' : ''};
    margin-top: 0;
  }
`;

const CardList = (props) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const {
    loading,
    dataSource,
    renderItem,
    hasMore,
    onLoadMore,
    gridMode
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
      <Button onClick={handleLoadMore} loading={loadingMore}><FormattedMessage
        defaultMessage="loading more"/></Button>
    </div>
  ) : null;
  const grid = gridMode ? {
    gutter: 16,
    column: 2
  } : null;
  return (
    <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
      <StyledList
        grid={grid}
        itemLayout="vertical"
        size="large"
        dataSource={dataSource}
        loadMore={loadMore}
        renderItem={renderItem}
        locale={{ emptyText: <Empty description={false}/> }}
      />
    </Spin>
  );
};
CardList.propTypes = {
  dataSource: PropTypes.array,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  onLoadMore: PropTypes.func,
  renderItem: PropTypes.func,
  gridMode: PropTypes.bool
};

export default CardList;
