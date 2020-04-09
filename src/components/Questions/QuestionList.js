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
    padding: 22px;
    margin: 22px 0;
    border: 1px solid #e8e8e8;
    border-radius: 9px;
  }
  .ant-list-item:hover {
    //background-color: aliceblue;
    border-width: 3px;
    transition: border-width 0.3s;
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
