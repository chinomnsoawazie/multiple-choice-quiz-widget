import React from 'react';
import { useDispatch } from 'react-redux';
import { quizzes } from './data/quizzes';
import MainContainer from './containers/MainContainer';
import { SET_QUIZZES } from './redux/actionTypes';

const App = () => {
  const dispatch = useDispatch();
  //All the quizzes are sent to the store
  dispatch({ type: SET_QUIZZES, payload: quizzes });

  return (
      <div>
        <MainContainer />
      </div>
  );
};

export default App;
