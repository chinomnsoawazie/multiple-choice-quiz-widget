import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from '../data/messages';
import { resetForAFreshStart, resetForNewQuiz, resetForRetakeQuiz} from '../redux/action';
import { quizzes } from '../data/quizzes';

const Summary = (props) => {
    const {push} = props;
    const dispatch = useDispatch();
    const currentQuiz = useSelector((state) => state.allQuestionInfo.currentQuiz);
    const noOfQuestionsCorrectlyAnswered = useSelector((state) => state.allAnswerInfo.correctAnswerCount);
    const totalNoOfQuestions = useSelector((state) => state.allQuestionInfo.currentQuiz.questions).length;
    const currentQuizes = useSelector((state) => state.allQuestionInfo.quizzes);
    const noOfTries = useSelector((state) => state.allAnswerInfo.currentNoOfTries);

    //This handles 'Next Quiz' and 'Restart Test' buttons
    const handleNextClick = () => {        
        const newQuizes = currentQuizes.slice(1);
        //Next for scenerio where no quiz is left ('Restart Test')
        if(newQuizes.length === 0){
            const newCurrentNoOfTries = noOfTries + 1;
            resetForAFreshStart(dispatch, quizzes, newCurrentNoOfTries, push);
        //Next for scenerio where there is a quiz ('Next Quiz')
        }else{
            resetForNewQuiz(dispatch, newQuizes, push);
        };
    };

    //This retakes the last quiz
    const handleRetakeClick = () => {
        resetForRetakeQuiz(dispatch, currentQuiz, push);
    };

    const showNoOfAtempts = () => {
        //Case where there are remaining quizes
        if(currentQuizes.slice(1).length > 0){
            return null;
        //Case where this is the first end of the entire quiz
        } else if (noOfTries === 0 && currentQuizes.slice(1).length === 0) {
            return 'This is your first attempt of entire test';
        //Case where the entire quiz has been attempted before
        } else if (noOfTries !== 0 && currentQuizes.slice(1).length === 0) {
        return <p>This is attempt no <b>{noOfTries + 1}</b> at the entire test </p>;
        };
    };

    //Tried to make the next button clearer
    const showWhichNext = () => {
        if (currentQuizes.slice(1).length > 0){
            return  <button className='next' onClick={() => handleNextClick()}>Next Quiz</button>;
        }else{
            return  <button className='next' onClick={() => handleNextClick()}>Restart Test</button>;
        };
    };

    return (
        <>
        <h2 className='header'>{currentQuiz.title}</h2>
        <div style={{textAlign: 'center', marginTop: '10%'}}>
            <p>You got <b>{noOfQuestionsCorrectlyAnswered}</b> of <b>{totalNoOfQuestions}</b> questions right</p>
        </div>
        <div style={{textAlign: 'center', marginTop: '5%'}}>
            {getMessage()}        
        </div>
        <div style={{textAlign: 'center', marginTop: '5%'}}>
            { showNoOfAtempts()}
        </div>

        <div style={{textAlign: 'center', marginTop: '5%'}}>
            {showWhichNext()}
            <button className='next_big' onClick={() => handleRetakeClick()}>Retake last Quiz</button>
        </div>
        </>
    );
};

export default Summary;
