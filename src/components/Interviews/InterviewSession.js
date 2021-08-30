import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input, Result, Switch, Tabs, Tooltip } from 'antd';
import styled from 'styled-components';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { FormattedMessage, Link, useIntl } from 'gatsby-plugin-intl';
import { useAuth0 } from '@auth0/auth0-react';
import useApi from '../../hooks/useApi';
import ConfirmModal from '../Organization/ConfirmModal';
import useGetStarted from '../../hooks/useGetStarted';
import { ReactQuill } from '../../utils/ssrHelper';
import QuillHelpers from '../../utils/QuillHelpers';

const defaultInterviewSession = {
  id: '',
  interview: {
    sections: [
      {
        title: '',
        questions:
          [{
            id: '',
            question: ''
          }]
      }]
  }
};

const StyledTabs = styled(Tabs)`
  .ant-tabs-content {
    border: 1px solid #e0dddd;
    border-radius: 6px;
    margin-top: -17px;
    padding: 0 15px;
  }
`;
const StyledQuestionBlock = styled.div`
  div {
    flex-grow: 10;
    flex-basis: 50%;
    margin: 0 5px;
  }

  display: flex;
  flex-direction: row;
  justify-content: end;
  min-height: 140px;

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin-left: 0 !important;
  padding: 4px;

  &.wrong {
    color: red;

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: red;
      border-color: red;
    }
  }

  &.correct {
    color: ${(props) => `${props.theme.color.brand.primary}`};

    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${(props) => `${props.theme.color.brand.primary}`};
    }
  }

  &.answer {
    margin: 0 8px;
  }

  &.answer > span:nth-child(2) {
      //border-bottom: ${(props) => `2px solid ${props.theme.color.brand.primary}`};
  }
`;

const StyledQuestionSection = styled.div`
  padding: 10px;
  margin-bottom: 24px;

  :not(:last-child) {
    border-bottom: 1px solid #e0dddd;
  }

`;

const StyledQuestionH2 = styled.h2`
  display: flex;
  margin: 20px 0 0;
  font-weight: bold;

  > span, button {
    margin-left: auto;
  }
`;

const { TextArea } = Input;
const InterviewSession = ({
    interviewSession: {
      id,
      interviewEndDate,
      interview,
      answerAttemptSections = null
    } = defaultInterviewSession,
    preview = false,
    viewResult = true,
    endSession = false,
    onEndInterviewSession = () => {
    }
  }) => {
    const {
      user
    } = useAuth0();
    const {
      addAnswerToInterviewSession,
      markQuestionToInterviewSession,
      submitInterviewSession
    } = useApi();
    const intl = useIntl();
    const { isGetStarted } = useGetStarted();
    const isOwner = isGetStarted || user?.sub === interview.clientUser.id;
    const isAnswersVisible = isOwner || interview.releaseResult === 'YES';
    const [isSubmitted, setIsSubmitted] = useState(!!interviewEndDate);
    const handleSubmitQuestionAttempt = (sectionId, questionId, type, ...args) => {
      if (preview) {
        return;
      }
      let answer = {};
      if (type === 'SHORT_ANSWER') {
        answer = { answer: args[2].getHTML() };
      } else if (type === 'MULTI_CHOICE') {
        answer = { answerId: args[0] };
      }
      addAnswerToInterviewSession({
        id,
        sectionId,
        questionSnapshotId: questionId,
        ...answer
      });
    };
    const handleSubmitInterviewSession = () => {
      return submitInterviewSession(id)
        .then(() => {
          setIsSubmitted(true);
          return onEndInterviewSession(id);
        });
    };

    const handleMarkQuestion = (sectionId, questionId, correct) => {
      markQuestionToInterviewSession({
        id,
        sectionId,
        questionSnapshotId: questionId,
        correct
      });
    };

    useEffect(() => {
      if (endSession) {
        submitInterviewSession(id)
          .then(() => {
            setIsSubmitted(true);
            onEndInterviewSession(id);
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
              title={intl.formatMessage({ defaultMessage: 'Summit your assessment result Successfully!' })}
              extra={<Link to="/interviews">
                <FormattedMessage
                  defaultMessage="Let's go to Explore more Interview!"/> </Link>}
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
                  <StyledTabs>
                    {
                      interview.sections.map(({
                        id: sectionId,
                        title,
                        questions = []
                      }) => (
                        <Tabs.TabPane tab={title} key={sectionId}>
                          {
                            questions.map(({
                              id: questionId,
                              possibleAnswers = [],
                              ...question
                            }, questionIndex) => {
                              const correctAnswers = possibleAnswers.filter((possibleAnswer) => possibleAnswer.correctAnswer)
                                .map((possibleAnswer) => possibleAnswer.answerId);
                              const isNoAnswerAttemptForQuestion = !answerAttemptSections || !answerAttemptSections[sectionId] || !answerAttemptSections[sectionId].answerAttempts[questionId];
                              const answerAttemptQuestionIds = isNoAnswerAttemptForQuestion ? [] : answerAttemptSections[sectionId].answerAttempts[questionId].answerIds;
                              const answerAttemptQuestion = isNoAnswerAttemptForQuestion ? [] : answerAttemptSections[sectionId].answerAttempts[questionId].answer;
                              const valueProps = !viewResult && isOwner ? { value: correctAnswers } : isSubmitted && (answerAttemptQuestionIds?.length > 0 ? { value: answerAttemptQuestionIds } : { value: [] });
                              return (
                                <>
                                  <StyledQuestionH2>
                                    {`Q.${questionIndex + 1}`}
                                    {
                                      (() => {
                                          if (!preview || !viewResult || !isAnswersVisible) {
                                            return;
                                          }
                                          const isCorrect = isOwner ? answerAttemptSections?.[sectionId]?.answerAttempts[questionId]?.correct ||
                                            (answerAttemptQuestionIds?.length === correctAnswers?.length) && answerAttemptQuestionIds?.every((v) => correctAnswers.includes(v)) : answerAttemptSections[sectionId]?.answerAttempts[questionId]?.correct;
                                          if (isOwner && question.questionType !== 'MULTI_CHOICE') {
                                            return (
                                              <Tooltip
                                                title={intl.formatMessage({ defaultMessage: 'Mark whether it is correct answer' })}>
                                                <Switch
                                                  checkedChildren={<CheckCircleTwoTone/>}
                                                  unCheckedChildren={<CloseCircleTwoTone
                                                    twoToneColor="red"/>}
                                                  defaultChecked={isCorrect}
                                                  onChange={(value) => handleMarkQuestion(sectionId, questionId, value)}
                                                /></Tooltip>);
                                          }
                                          return (isOwner ? correctAnswers?.length > 0 : true) && (isCorrect
                                            ? <CheckCircleTwoTone/>
                                            : <CloseCircleTwoTone twoToneColor="red"/>);
                                        }
                                      )()
                                    }
                                  </StyledQuestionH2>
                                  <StyledQuestionSection key={questionId}>
                                    <StyledQuestionBlock>
                                      <div dangerouslySetInnerHTML={{ __html: question.question }}/>
                                      <div>
                                        {
                                          question.questionType === 'MULTI_CHOICE' &&
                                          <Checkbox.Group
                                            name={questionId}
                                            {...valueProps}
                                            defaultValue={answerAttemptQuestionIds}
                                            onChange={handleSubmitQuestionAttempt.bind(this, sectionId, questionId, question.questionType)}
                                          >
                                            {possibleAnswers.map((possibleAnswer) => {
                                              const correctOption = correctAnswers.includes(possibleAnswer.answerId);
                                              const answered = answerAttemptQuestionIds?.includes(possibleAnswer.answerId);
                                              return (
                                                <StyledCheckbox
                                                  key={possibleAnswer.answerId}
                                                  value={possibleAnswer.answerId}
                                                  className={preview && viewResult && isAnswersVisible && (correctOption ? ' answer ' : '') + ((correctOption && answered) ? 'correct' : (!correctOption && !answered) || 'wrong')}
                                                >
                                                <span
                                                  dangerouslySetInnerHTML={{ __html: possibleAnswer.answer }}/>
                                                </StyledCheckbox>
                                              );
                                            })}
                                          </Checkbox.Group>
                                        }
                                        {
                                          question.questionType === 'SHORT_ANSWER' &&
                                          <ReactQuill theme="snow"
                                                      modules={QuillHelpers.modules.slim}
                                                      onBlur={handleSubmitQuestionAttempt.bind(this, sectionId, questionId, question.questionType)}
                                                      defaultValue={answerAttemptQuestion}
                                                      readOnly={preview || (!isGetStarted && isOwner)}
                                          />
                                        }
                                      </div>
                                    </StyledQuestionBlock>
                                  </StyledQuestionSection>
                                </>
                              );
                            })
                          }
                        </Tabs.TabPane>
                      ))
                    }
                  </StyledTabs>
                )
              }
              {
                !preview
                &&
                <ConfirmModal
                  openButtonType={'primary'}
                  onOK={handleSubmitInterviewSession}
                  title={intl.formatMessage({ defaultMessage: 'Submit your assessment result?' })}
                  openButtonTitle={intl.formatMessage({ defaultMessage: 'Submit' })}
                  submitButtonTitle={intl.formatMessage({ defaultMessage: 'Submit' })}
                >
                  <FormattedMessage
                    defaultMessage={'Once you submit your result, you cannot change it anymore. Are you sure submit it now?'}/>
                </ConfirmModal>
              }
            </>
          )
        }
      </>
    );
  }
;

InterviewSession.propTypes = {
  interviewSession: PropTypes.object
};

export default InterviewSession;
