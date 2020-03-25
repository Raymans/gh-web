import PropTypes from 'prop-types';
import React from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import {
  Avatar, Checkbox, Collapse, Divider, List, Tag,
} from 'antd';
import styled from 'styled-components';

const { Panel } = Collapse;

const StyledAnswer = styled.div`
  padding-top: 20px;
  .ant-collapse-item > .ant-collapse-header {
    background-color: #1187ae94;
    color: #ffffff70;
    padding: 4px 40px;
  }
`;

const IconText = ({ type, text }) => (
  <span>
    <LegacyIcon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

const QuestionGrid = (props) => {
  const {
    questionId, specialization, possibleAnswers, clientAccount: { clientName }, question,
  } = props;
  return (
    <List.Item
      key={questionId}
    >
      <List.Item.Meta
        description={(
          <div>
            {/* <Tag color="blue">{specialization}</Tag> */}
          </div>
        )}
        title={(
          <>
            {question}
          </>
        )}
      />
      {question}
      <br />
      <br />
      {possibleAnswers.map((possibleAnswer) => (
        <>
          <Checkbox>{possibleAnswer.answer}</Checkbox>
          <br />
        </>
      ))}
      <StyledAnswer>
        <Collapse>
          <Panel header="Show Me the Right Answer!" key="possibleAnswers">
            {possibleAnswers.map((possibleAnswer) => (
              possibleAnswer.correctAnswer
                ? <p>{possibleAnswer.answer}</p> : <></>
            ))}
          </Panel>
        </Collapse>
      </StyledAnswer>
      <Divider orientation="left">Author</Divider>
      <Avatar
        src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"
      >
        {clientName}
      </Avatar>
      <span>{clientName}</span>
    </List.Item>
  );
};

QuestionGrid.propTypes = {
  clientName: PropTypes.string,
  possibleAnswers: PropTypes.string,
  question: PropTypes.string,
  questionId: PropTypes.string.isRequired,
  specialization: PropTypes.string,
};

IconText.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};


export default QuestionGrid;
