import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledLoading = styled.div`
  width: 100vh;
  height: 100vh;
`;
const NotFoundPage = () => {
  return (
    <Spin spinning={true} indicator={<LoadingOutlined spin/>}>
      <StyledLoading></StyledLoading>
    </Spin>
  );
};

export default NotFoundPage;
