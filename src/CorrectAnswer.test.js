import React from 'react'
import '@testing-library/jest-dom'
import QuestionCard from './components/QuestionCard'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux';

//create and import mock question and answers reducers
import answerReducer from './redux/reducers/answerReducer'
import questionReducer from './redux/reducers/questionReducer';

//Create root reducer so as to have combined reducers.
const rootReducer = combineReducers({
    allAnswerInfo: answerReducer,
    allQuestionInfo: questionReducer,
});
//Create redux store
const storeObj = createStore(rootReducer);

it('check presence of "Next Button" after question is answered', () => {
    const {getByText} = render(<Provider store={storeObj}><QuestionCard /></Provider> );
    //We are using Quiz summary here because the way the testData is set up, it has only one quiz left. If we wanted to test for 
    //'Next Question', we would have to increse th no of quizzes in the testData
    expect(getByText('Quiz Summary')).toBeInTheDocument()
})

it('check presence of "correct" if answered correctly', () => {
    const {getByText} = render(<Provider store={storeObj}><QuestionCard /></Provider> );
    expect(getByText('Correct!')).toBeInTheDocument()

})

it('check that when a right answer is selected, the botton has the right class', () => {
    const {getByTestId} = render(<Provider store={storeObj}><QuestionCard /></Provider> );
    const chosenAndRightButton = getByTestId('chosen-correct-answer')
    expect(chosenAndRightButton).toHaveClass('chosenAndRight')
})

