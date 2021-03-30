import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Button, Checkbox, Descriptions, List, message, Modal, Space, Spin, Tag,
} from 'antd';
import styled from 'styled-components';
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { navigate } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';
import QuestionLike from '../Like/QuestionLike';
import AuthorBy from '../AuthorBy';
import useApi from '../../hooks/useApi';

const StyledListItem = styled(List.Item)`
  h1{
    white-space: pre-wrap;
  }
  .ant-list-item-extra{
    position: absolute;
    float: left;
    right: 25px;
  }
`;

const StyledVisibilityTag = styled(Tag)`
  position: absolute;
  top: -9px;
  background-color: ${(props) => (props.theme.isDark ? 'darkslategray !important' : undefined)};
`;

const QuestionGrid = (props) => {
  const {
    user,
  } = useAuth0();
  const {
    id: questionId, possibleAnswers, clientUser, question, showAuthor, visibility, showActionButtons, likeCount: likeCountProp, liked: likeProp,
  } = props;
  const { deleteQuestion: deletedQuestionApi } = useApi();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [liked, setLiked] = useState(likeProp);
  const [likeCount, setLikeCount] = useState(likeCountProp);
  const deleteQuestion = () => {
    setSaving(true);
    deletedQuestionApi(questionId).then(() => {
      setDeleted(true);
      message.success(`Question has been deleted: ${question}`);
    });
  };
  let updateActions = [];
  if (showActionButtons && clientUser.id === user?.sub) {
    updateActions = [
      [
        <Space>
          <Button size="small" shape="circle" icon={<EditOutlined />} onClick={() => { navigate(`/questions/${questionId}/edit`); }} />
          <Button
            size="small"
            shape="circle"
            icon={<DeleteOutlined style={{ color: 'lightcoral' }} />}
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
                <Descriptions column={1}>
                  {possibleAnswers.length > 0
                  && (
                  <Descriptions.Item>
                    {possibleAnswers.map((possibleAnswer) => (
                      <div key={possibleAnswer.answerId}>
                        <Checkbox>{possibleAnswer.answer}</Checkbox>
                      </div>
                    ))}
                  </Descriptions.Item>
                  )}
                  <Descriptions.Item>
                    {
                      showAuthor
                      && (
                        <AuthorBy author={clientUser.nickname} avatarSrc={clientUser.avatar} />
                      )
                    }
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <QuestionLike id={questionId} liked={liked} likeCount={likeCount} />
                  </Descriptions.Item>
                </Descriptions>
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
