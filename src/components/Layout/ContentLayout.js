import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Skeleton, Spin } from 'antd';
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';


const StyledLayout = styled(Layout)`
  background-color: white !important;
  padding: 20px;
  box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 20%);
  min-height: 300px;
  border-radius: 8px;
  .ant-spin-nested-loading {
    width: 100%;
  }
`;

const ContentLayout = ({
  loading,
  children
}) => (
  <StyledLayout>
    <Spin spinning={loading} indicator={<LoadingOutlined spin/>}>
      {
        loading ? <Skeleton active/> : children
      }
    </Spin>
  </StyledLayout>
);


export default ContentLayout;

ContentLayout.propTypes = {
  children: PropTypes.element,
  loading: PropTypes.bool
};

ContentLayout.defaultProps = {
  loading: false
};
