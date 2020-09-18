import {
  SET_CURRENT_QUIZ,
  SET_CURRENT_RIGHT_ANSWER,
  SET_ANSWERED,
  SET_IS_ANSWER_CORRECT,
  SET_CORRECT_ANSWER_COUNT,
  SET_CURRENT_QUESTIONS_SET, SET_NO_OF_TRIES, SET_QUIZZES
} from './actionTypes';

export const setCurrentQuiz = (quiz, dispatch, push) => {
  dispatch({ type: SET_CURRENT_QUIZ, payload: quiz });
  push('/question-card');
};

export const setCurrentQuestionSet = (questions, dispatch) => {
  dispatch({ type: SET_CURRENT_QUESTIONS_SET, payload: questions });
};

export const setCurrentRightAnswer = (answer, dispatch) => {
  dispatch({ type: SET_CURRENT_RIGHT_ANSWER, payload: answer });
};

export const setAnswered = (dispatch) => {
  dispatch({ type: SET_ANSWERED, payload: true });
};


export const setAnswerIsCorrect = (dispatch, currentCount) => {
  console.log(currentCount);
  dispatch({ type: SET_IS_ANSWER_CORRECT, payload: true });
  dispatch({ type: SET_CORRECT_ANSWER_COUNT, payload: currentCount });
};

//The default state of isAnswerCorrect  in answerReducer will be false, hence,
//when the answer is wrong, we don't have to carry out that computing overhead

export const resetAnswerIsCorrect = (dispatch) => {
  dispatch({ type: SET_IS_ANSWER_CORRECT, payload: false });
};

export const resetForNextQuestion = (dispatch, newQuestionsSet) => {
  dispatch({type: SET_IS_ANSWER_CORRECT, payload: false})
  dispatch({type:SET_ANSWERED, payload: false})
  dispatch({type: SET_CURRENT_QUESTIONS_SET, payload: newQuestionsSet})
}

export const resetForNewQuiz = (dispatch, newQuizzes, push) => {
  dispatch({type: SET_QUIZZES, payload: newQuizzes})
  dispatch({type: SET_CORRECT_ANSWER_COUNT, payload: 0})
  dispatch({type: SET_IS_ANSWER_CORRECT, payload: false})
  push('/')
}

export const resetForAFreshStart = (dispatch, quizzes, newCurrentNoOfTries, push) => {
  dispatch({type: SET_CORRECT_ANSWER_COUNT, payload: 0})
  dispatch({type: SET_IS_ANSWER_CORRECT, payload: false})
  dispatch({type: SET_NO_OF_TRIES, payload: newCurrentNoOfTries})
  dispatch({ type: SET_QUIZZES, payload: quizzes });
  dispatch({type: SET_CURRENT_QUESTIONS_SET, payload: ''})
  dispatch({ type: SET_CURRENT_QUIZ, payload: '' });
  push('/')
}

