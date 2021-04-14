import React from 'react';
import { Router, useMatch } from '@reach/router';
import QuestionList from './QuestionList';
import Question from './Question';
import QuestionForm from './QuestionForm';

const Questions = () => {
  const matchDefault = useMatch('/questions/*') ? '/questions' : '/:locale/questions';
  return (
    <Router
      basepath={matchDefault}
    >
      <QuestionList path="/"/>
      <Question path="/:id"/>
      <QuestionForm path="/create"/>
      <QuestionForm path="/:id/edit"/>
    </Router>
  );
};

Questions.propTypes = {};

export default Questions;
