import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuiz, setCurrentQuestionSet } from '../redux/action';
import { SET_QUIZZES } from '../redux/actionTypes';

const WelcomeScreen = (props) => {
  const { push} = props
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.allQuestionInfo.quizzes);
  const preventWelcomeScreenRerender = useSelector((state) => state.allQuestionInfo.preventWelcomeScreenRerender);
  const currentQuiz = quizzes[0];
  const remainingQuizes = quizzes.slice(1);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if(rendered){
      dispatch({type: SET_QUIZZES, payload: remainingQuizes});
      setRendered(true);
    }
  }, [preventWelcomeScreenRerender]);

  const handleSelectQuiz = (quiz) => {
    const currentQuestions = quiz.questions;
    setCurrentQuestionSet(currentQuestions, dispatch);
    setCurrentQuiz(quiz, dispatch, push);
  };

  return (
    <div className="welcome">
      <h2>Welcome to MultipleChoiceQuiz Widget</h2>
      <h4>Start this Quiz </h4>
      <div>
        <div>
          <button className='quizButton'  onClick={() => handleSelectQuiz(currentQuiz)}>{currentQuiz.title}</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
