import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom'
import QuestionCard from './components/QuestionCard'
import QuestionOption from './components/QuestionOption'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';


import './styles.css'

//create and import mock question and answers reducers
import answerReducer from './redux/reducers/answerReducer'
import questionReducer from './redux/reducers/questionReducer';

//Create root reducer so as to have combined reducers.
const rootReducer = combineReducers({
    allAnswerInfo: answerReducer,
    allQuestionInfo: questionReducer,
});

it('It checks presence of "Next Button" after question is answered', () => {
    //Create redux store
    const storeObj = createStore(rootReducer);
    const {getByText} = render(<Provider store={storeObj}><QuestionCard /></Provider> );
    expect(getByText('Quiz Summary')).toBeInTheDocument()
})

