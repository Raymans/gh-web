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
    id, category, topic, difficulty, answer, contributedBy, question, like, star, comments,
  } = props;
  const commentCount = comments.length;
  return (
    <List.Item
      key={id}
      actions={[
        <IconText type="star-o" text={star} key="star" />,
        <IconText type="like-o" text={like} key="like" />,
        <IconText type="message" text={commentCount} key="message" />]}
    >
      <List.Item.Meta
        description={(
          <div>
            <Tag color="geekblue">{category}</Tag>
            <Tag color="blue">{topic}</Tag>
          </div>
)}
        title={(
          <>
            {question}
            {'   '}
            <Tag color="green">{difficulty}</Tag>
          </>
)}
      />
      {question}
      <br />
      <br />
      <Checkbox>1</Checkbox>
      <br />
      <Checkbox>2</Checkbox>
      <br />
      <Checkbox>3</Checkbox>
      <br />
      <Checkbox>4</Checkbox>
      <StyledAnswer>
        <Collapse>
          <Panel header="Show Me the Right Answer!" key="answer">
            <p>{answer}</p>
          </Panel>
        </Collapse>
      </StyledAnswer>
      <Divider orientation="left">Author</Divider>
      <Avatar
        src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"
      >
      Raymans-
        {' '}
        {contributedBy}
      </Avatar>
      <span>Raymans@DigitalRiver</span>
    </List.Item>
  );
};

QuestionGrid.propTypes = {
  answer: PropTypes.string,
  category: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object),
  contributedBy: PropTypes.string,
  difficulty: PropTypes.string,
  id: PropTypes.string.isRequired,
  like: PropTypes.number,
  question: PropTypes.string,
  star: PropTypes.number,
  topic: PropTypes.string,
};

IconText.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};


export default QuestionGrid;
