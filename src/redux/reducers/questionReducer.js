//This would have been used if I was doing Option B
import {
  SET_QUIZZES,
  SET_CURRENT_QUIZ,
  SET_CURRENT_QUESTIONS_SET
} from '../actionTypes';

const initialState = {
  quizzes: '',
  //this is just to give welcome screen useEffect something that won't trigger a re-rendering
  preventWelcomeScreenRerender: '',
  currentQuiz: '',
  currentQuestion: '',
  currentQuestionsSet: '',
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUIZZES:
      return {
        ...state,
        quizzes: action.payload,
      };

    case SET_CURRENT_QUIZ:
      return {
        ...state,
        currentQuiz: action.payload,
      };

    case SET_CURRENT_QUESTIONS_SET:
      return {
        ...state,
        currentQuestionsSet: action.payload,
      };

    default:
      return state;
  }
};

export default questionReducer;
