import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Modal, Result, Tabs,
} from 'antd';
import styled from 'styled-components';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../../hooks/useApi';

const defaultInterviewSession = {
  id: '',
  interview: {
    sections: [
      {
        title: '',
        questions:
          [{
            id: '',
            question: '',
          }],
      }],
  },
};

const StyledQuestionBlock = styled.div`
  margin: 24px;
`;

const StyledCheckbox = styled(Checkbox)`
  display: block;
  margin-left: 0 !important;
  padding: 4px;
  &.wrong{
    color: red;
    .ant-checkbox-checked .ant-checkbox-inner{
      background-color: red;
      border-color: red;
    }
  }
  &.correct{
    color: green;
    .ant-checkbox-checked .ant-checkbox-inner{
      background-color: green;
      border-color: green;
    }
  }

  &.answer {
      margin: 0 8px;
  }
  &.answer > span:nth-child(2) {
    border-bottom: ${(props) => `2px solid ${props.theme.color.brand.primary}`};
  }
`;

const StyledQuestionH2 = styled.h2`
  display: flex;
  span {
    margin-left: auto;
  }
`;
const InterviewSession = ({
  interviewSession: {
    id, interviewEndDate, interview, answerAttemptSections = null,
  } = defaultInterviewSession, preview = false, viewResult = true, endSession = false, onEndInterviewSession = () => {
  },
}) => {
  const {
    user,
  } = useAuth0();
  const { addAnswerToInterviewSession, submitInterviewSession } = useApi();
  const isOwner = user?.sub === interview.clientUser.id;
  const [isSubmitted, setIsSubmitted] = useState(!!interviewEndDate);
  const handleSubmitQuestionAttempt = (sectionId, questionId, values) => {
    if (preview) {
      return;
    }

    addAnswerToInterviewSession({
      id, sectionId, questionSnapshotId: questionId, answerId: values,
    });
  };
  const handleSubmitInterviewSession = () => {
    Modal.confirm({
      title: 'Submit your interview result?',
      icon: <ExclamationCircleOutlined />,
      content: 'Once you submit your result, you cannot change it anymore. Are you sure submit it now?',
      onOk() {
        return submitInterviewSession(id)
          .then(() => {
            setIsSubmitted(true);
            onEndInterviewSession();
          });
      },
      onCancel() {
      },
    });
  };

  useEffect(() => {
    if (endSession) {
      submitInterviewSession(id)
        .then(() => {
          setIsSubmitted(true);
          onEndInterviewSession();
        });
    }
  }, [endSession]);

  return (
    <>
      {
        !preview && isSubmitted
        && (
          <Result
            status="success"
            title="Summit your interview result Successfully!"
            extra={<Link to="/interviews">Let's go to Explore more Interview!</Link>}
          />
        )
      }

      {
        (preview || !isSubmitted)
        && (
          <>
            {
              interview.sections
              && (
                <Tabs>
                  {
                    interview.sections.map(({ id: sectionId, title, questions = [] }) => (
                      <Tabs.TabPane tab={title} key={sectionId}>
                        {
                          questions.map(({ id: questionId, possibleAnswers = [], ...question }, questionIndex) => {
                            const correctAnswers = possibleAnswers.filter((possibleAnswer) => possibleAnswer.correctAnswer)
                              .map((possibleAnswer) => possibleAnswer.answerId);
                            const answerAttemptQuestionIds = !answerAttemptSections || !answerAttemptSections[sectionId] || !answerAttemptSections[sectionId].answerAttempts[questionId] ? [] : answerAttemptSections[sectionId].answerAttempts[questionId].answerIds;
                            const valueProps = !viewResult && isOwner ? { value: correctAnswers } : isSubmitted && (answerAttemptQuestionIds.length > 0 ? { value: answerAttemptQuestionIds } : { value: [] });
                            const correct = isOwner ? answerAttemptQuestionIds.length > 0 && answerAttemptQuestionIds.every((v) => correctAnswers.includes(v)) : answerAttemptSections[sectionId]?.answerAttempts[questionId]?.correct;
                            return (
                              <div key={questionId}>
                                <StyledQuestionH2>
                                  {`Q${questionIndex + 1}`}
                                  {
                                    preview && viewResult && (isOwner ? correctAnswers?.length > 0 : true) && (correct
                                      ? <CheckCircleTwoTone />
                                      : <CloseCircleTwoTone twoToneColor="red" />)
                                  }
                                </StyledQuestionH2>
                                <StyledQuestionBlock>
                                  <h3>{question.question}</h3>
                                  <Checkbox.Group
                                    name={questionId}
                                    {...valueProps}
                                    defaultValue={answerAttemptQuestionIds}
                                    onChange={handleSubmitQuestionAttempt.bind(this, sectionId, questionId)}
                                  >
                                    {possibleAnswers.map((possibleAnswer) => {
                                      const correctOption = correctAnswers.includes(possibleAnswer.answerId);
                                      const answered = answerAttemptQuestionIds.includes(possibleAnswer.answerId);
                                      return (
                                        <StyledCheckbox
                                          key={possibleAnswer.answerId}
                                          value={possibleAnswer.answerId}
                                          className={preview && viewResult && isOwner && (correctOption ? ' answer ' : '') + ((correctOption && answered) ? 'correct' : (!correctOption && !answered) || 'wrong')}
                                        >
                                          {possibleAnswer.answer}
                                        </StyledCheckbox>
                                      );
                                    })}
                                  </Checkbox.Group>
                                </StyledQuestionBlock>
                              </div>
                            );
                          })
                        }
                      </Tabs.TabPane>
                    ))
                  }
                </Tabs>
              )
            }
            {
              !preview
              && <Button type="primary" onClick={handleSubmitInterviewSession}>Submit</Button>
            }
          </>
        )
      }
    </>
  );
};

InterviewSession.propTypes = {
  interviewSession: PropTypes.object,
};


export default InterviewSession;
