import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';


import './styles.css';
import answerReducer from './redux/reducers/answerReducer';
import questionReducer from './redux/reducers/questionReducer';

//Create root reducer so as to have combined reducers. This is to account for
//a situation where we have more than one reducer
const rootReducer = combineReducers({
  allAnswerInfo: answerReducer,
  allQuestionInfo: questionReducer,
});

//Create redux store

const storeObj = createStore(rootReducer);


ReactDOM.render(
   <Provider store={storeObj}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
