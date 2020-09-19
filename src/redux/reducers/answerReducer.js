import {
  SET_NO_OF_TRIES,
  SET_CURRENT_RIGHT_ANSWER,
  SET_ANSWERED,
  SET_CORRECT_ANSWER_COUNT,
  SET_IS_ANSWER_CORRECT
} from '../actionTypes';

const testData = [{
  title: 'Basics of HTML',
  questions: [{
      text: 'Which element is used for a top-level heading?',
      correctAnswer: 'h1',
      incorrectAnswers: ['div', 'h0', 'p'],
    },
  ],
}];



const initialState = {
  correctAnswerCount: 0,
  currentNoOfTries: 0,
  //comment out next three lines for testing
  // currentRightAnswer: '',
  // answered: false,
  // isCurrentAnswerRight: false,

  // //comment below in for testing
  currentRightAnswer: testData[0].questions[0].correctAnswer,
  answered: true,
  // //for right answer test, comment this out
  // isCurrentAnswerRight: false,
  // //for wrong answer test comment this out
  isCurrentAnswerRight: true,
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
        correctAnswerCount: initialState.correctAnswerCount + action.payload,
      };

    case SET_IS_ANSWER_CORRECT:
      return {
        ...state,
        isCurrentAnswerRight: action.payload,
      };

    default:
      return state;
  };
};

export default answerReducer;
