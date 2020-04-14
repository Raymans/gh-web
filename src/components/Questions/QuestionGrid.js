import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import {
  Avatar, Button, Checkbox, Collapse, Divider, List, message, Modal, Space, Spin,
} from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { navigate } from 'gatsby-plugin-intl';
import { deleteQuestion as deletedQuestionApi } from '../../utils/api';
import { getUserInfo } from '../../utils/auth';

const { Panel } = Collapse;

const StyledListItem = styled(List.Item)`
  .ant-list-item-extra{
    position: absolute;
    float: left;
    right: 25px;
  }
`;

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
    id: questionId, possibleAnswers, email, question, answerDisplayMode, showAuthor,
  } = props;
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const deleteQuestion = () => {
    setSaving(true);
    deletedQuestionApi(questionId).then(() => {
      setDeleted(true);
      message.success(`Question has been deleted: ${question}`);
    });
  };
  let updateActions = [];
  if (email === getUserInfo().email) {
    updateActions = [
      [
        <Space>
          <Button size="small" shape="circle" icon={<EditOutlined />} onClick={() => { navigate(`questions/${questionId}/edit`); }} />
          <Button
            size="small"
            danger
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => setIsDeleteModalVisible(true)}
          />
        </Space>]];
  }
  return (
    <>
      {
        !deleted
        && (
          <>
            <Modal
              title="Delete Question"
              visible={isDeleteModalVisible}
              onOk={deleteQuestion}
              onCancel={() => setIsDeleteModalVisible(false)}
            >
              <p>{`Are you sure to delete the question: ${question}?`}</p>
            </Modal>
            <Spin spinning={saving} indicator={<LoadingOutlined spin />}>
              <StyledListItem
                key={questionId}
                extra={updateActions}
              >
                <List.Item.Meta
                  title={(
                    <>
                      {question}
                    </>
                  )}
                />
                {possibleAnswers.map((possibleAnswer) => (
                  <>
                    {
                      (answerDisplayMode === 'inline'
                        && <Checkbox checked={possibleAnswer.correctAnswer}>{possibleAnswer.answer}</Checkbox>)
                    }
                    {
                      (answerDisplayMode === 'block' && <Checkbox>{possibleAnswer.answer}</Checkbox>)
                    }
                    <br />
                  </>
                ))}
                {
                  answerDisplayMode === 'block'
                  && (
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
                  )
                }
                {
                  showAuthor
                  && (
                    <>
                      <Divider orientation="left">Author</Divider>
                      <Avatar
                        src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"
                      >
                        {email}
                      </Avatar>
                      <span>{email}</span>
                    </>
                  )
                }
              </StyledListItem>
            </Spin>
          </>
        )
      }
    </>
  );
};

QuestionGrid.propTypes = {
  answerDisplayMode: PropTypes.string,
  email: PropTypes.string,
  possibleAnswers: PropTypes.string,
  question: PropTypes.string,
  id: PropTypes.string.isRequired,
  showAuthor: PropTypes.bool,
};

IconText.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

QuestionGrid.defaultProps = {
  answerDisplayMode: 'block',
  showAuthor: true,
  email: '',
};

export default QuestionGrid;
