import {
  SET_QUIZZES,
  SET_CURRENT_QUIZ,
  SET_CURRENT_QUESTIONS_SET
} from '../actionTypes';

const testData = [{
    title: 'Basics of HTML',
    questions: [{
        text: 'Which element is used for a top-level heading?',
        correctAnswer: 'h1',
        incorrectAnswers: ['div', 'h0', 'p'],
      },
    ],
  }
];

const initialState = {
  quizzes: '',
  //this is just to give welcome screen useEffect something that won't trigger a re-rendering
  // preventWelcomeScreenRerender: '',
  // currentQuiz: '',
  // currentQuestionsSet: '',

  //Comment below in and above out for testing
  currentQuiz: testData[0],
  currentQuestionsSet: testData[0].questions,


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
  };
};

export default questionReducer;
