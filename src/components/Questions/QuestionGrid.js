import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Avatar, Button, Checkbox, Collapse, Divider, List, message, Modal, Space, Spin, Tag,
} from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link, navigate } from 'gatsby-plugin-intl';
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

const StyledVisibilityTag = styled(Tag)`
  position: absolute;
  top: -9px;
`;

const QuestionGrid = (props) => {
  const {
    id: questionId, possibleAnswers, clientAccount, question, showAuthor, visibility, showActionButtons,
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
  if (showActionButtons && clientAccount.id === getUserInfo().sub) {
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
                {
                  visibility === 'PRIVATE' && <StyledVisibilityTag color="default">private</StyledVisibilityTag>
                }
                <h1>{question}</h1>
                {possibleAnswers.map((possibleAnswer) => (
                  <div key={possibleAnswer.answerId}>
                    <Checkbox>{possibleAnswer.answer}</Checkbox>
                  </div>
                ))}
                {
                  showAuthor
                  && (
                    <>
                      <Divider orientation="left">Author</Divider>
                      <Avatar
                        src="https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p32x32/28782617_10155159912751319_8014460284062164976_n.jpg?_nc_cat=0&oh=f9ef27fcf0cdc8cd3d215c141afa75b2&oe=5BB64F0A"
                      >
                        {clientAccount.name}
                      </Avatar>
                      <span>{clientAccount.name}</span>
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
  possibleAnswers: PropTypes.array,
  question: PropTypes.string,
  id: PropTypes.string.isRequired,
  showAuthor: PropTypes.bool,
  visibility: PropTypes.string,
  showActionButtons: PropTypes.bool,
};

QuestionGrid.defaultProps = {
  showAuthor: true,
};

export default QuestionGrid;
