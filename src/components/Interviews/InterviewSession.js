import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Steps, Tabs } from 'antd';
import styled from 'styled-components';


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
const InterviewSession = ({ interviewSession: { interview } = defaultInterviewSession }) => {
  // const { questions, ...section } = interview.sections[0];
  const changeSection = (tab) => {
    console.log(tab);
  };
  return (
    <>

      <Tabs onChange={changeSection}>
        {
          interview.sections.map(({ title, questions = [] }) => (
            <Tabs.TabPane tab={title} key={title}>
              <Steps progressDot>
                {
                  questions.map((question, questionIndex) => (
                    <Steps.Step status="finish" title={`Q${questionIndex + 1}`} />
                  ))
                }

              </Steps>
              {
                questions.map(({ possibleAnswers = [], ...question }, questionIndex) => (
                  <>
                    <h2>{`Q${questionIndex + 1}`}</h2>
                    <StyledQuestionBlock>
                      <h3 key={question.id}>{question.question}</h3>
                      {
                        possibleAnswers.map((possibleAnswer) => (
                          <div><Checkbox>{possibleAnswer.answer}</Checkbox></div>
                        ))
                      }
                    </StyledQuestionBlock>
                  </>
                ))
              }
            </Tabs.TabPane>
          ))
        }
      </Tabs>
    </>
  );
};

InterviewSession.propTypes = {
  interviewSession: PropTypes.object,
};


export default InterviewSession;
