import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Checkbox, Modal, Result, Steps, Tabs,
} from 'antd';
import styled from 'styled-components';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'gatsby-plugin-intl';
import { addAnswerToInterviewSession, submitInterviewSession } from '../../utils/api';


const defaultInterviewSession = {
  id: '',
  interview: {
    sections: [
      {
        title: '',
        questions:
          [{ id: '', question: '' }],
      }],
  },
};

const StyledQuestionBlock = styled.div`
  margin: 24px;
`;
const InterviewSession = ({
  interviewSession: { id, interviewEndDate, interview } = defaultInterviewSession, preview = false, onEndInterviewSession = () => {
  },
}) => {
  const [isSubmitted, setIsSubmitted] = useState(!!interviewEndDate);
  const handleSubmitQuestionAttempt = (sectionId, questionId, values) => {
    if (preview) {
      return;
    }
    addAnswerToInterviewSession({
      id,
      sectionId,
      questionId,
      answerId: values,
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
  return (
    <>
      {
        isSubmitted
        && (
          <Result
            status="success"
            title="Summit your interview result Successfully!"
            extra={[
              <Link to="/interviews">Let's go to Explore more Interview!</Link>,
            ]}
          />
        )
      }

      {
        !isSubmitted
        && (
          <>
            <Tabs>
              {
                interview.sections.map(({ id: sectionId, title, questions = [] }) => (
                  <Tabs.TabPane tab={title} key={sectionId}>
                    <Steps progressDot>
                      {
                        questions.map((question, questionIndex) => (
                          <Steps.Step status="finish" title={`Q${questionIndex + 1}`} />
                        ))
                      }

                    </Steps>
                    {
                      questions.map(({ id: questionId, possibleAnswers = [], ...question }, questionIndex) => (
                        <>
                          <h2>{`Q${questionIndex + 1}`}</h2>
                          <StyledQuestionBlock>
                            <h3 key={question.id}>{question.question}</h3>
                            <Checkbox.Group
                              name={questionId}
                              options={possibleAnswers.map((possibleAnswer) => (
                                {
                                  label: possibleAnswer.answer,
                                  value: possibleAnswer.answerId,
                                }
                              ))}
                              // defaultValue={[]}
                              onChange={handleSubmitQuestionAttempt.bind(this, sectionId, questionId)}
                            />
                          </StyledQuestionBlock>
                        </>
                      ))
                    }
                  </Tabs.TabPane>
                ))
              }
            </Tabs>
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
