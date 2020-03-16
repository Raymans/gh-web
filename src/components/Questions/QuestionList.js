import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { List } from 'antd';
import QuestionGrid from './QuestionGrid';

const StyledList = styled(List)`
  .ant-list-item-meta-title{
    margin: 18px 0;
    font-size: 24px;
  }
  .ant-list-item{
    border-color: '#dadbdc';
    padding: 22px;
    margin: 22px 0;
    border: 1px solid #e8e8e8;
  }
`;


const QuestionList = (props) => {
  const { dataSource } = props;
  return (
    <StyledList
      itemLayout="vertical"
      size="large"
      dataSource={dataSource}
      renderItem={(item) => (
        <QuestionGrid key={item.id} {...item} />
      )}
    />
  );
};

QuestionList.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object),
};

export default QuestionList;
