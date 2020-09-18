import {
  SET_NO_OF_TRIES,
  SET_CURRENT_RIGHT_ANSWER,
  SET_ANSWERED,
  SET_CORRECT_ANSWER_COUNT,
  SET_IS_ANSWER_CORRECT
} from '../actionTypes';

const initialState = {
  correctAnswerCount: 0,
  currentNoOfTries: 0,
  currentRightAnswer: '',
  answered: false,
  isCurrentAnswerRight: false,

};

const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NO_OF_TRIES:
      return {
        ...state,
        currentNoOfTries: initialState.currentNoOfTries + action.payload,
      };

    case SET_CURRENT_RIGHT_ANSWER:
      return {
        ...state,
        currentRightAnswer: action.payload,
      };

    case SET_ANSWERED:
      return {
        ...state,
        answered: action.payload,
      };

    case SET_CORRECT_ANSWER_COUNT:
      return {
        ...state,
        correctAnswerCount: initialState.correctAnswerCount + action.payload

      }

    case SET_IS_ANSWER_CORRECT:
      return {
        ...state,
        isCurrentAnswerRight: action.payload
      }

    default:
      return state;
  }
};

export default answerReducer;
