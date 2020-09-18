import React, { useEffect, useState } from 'react';
import QuestionOption from './QuestionOption';
import { useDispatch, useSelector} from 'react-redux';
import { resetForNextQuestion, setCurrentRightAnswer} from '../redux/action';
import {shuffleArray, mySort, searchForCorrectAnsOption} from '../utilities/Utilities'
import { SET_ANSWERED } from '../redux/actionTypes';

const QuestionCard = (props) => {
  const {push} = props
  const dispatch = useDispatch();
  const currentQuestionsSet = useSelector ((state) => state.allQuestionInfo.currentQuestionsSet);
  const currentQuiz = useSelector((state) => state.allQuestionInfo.currentQuiz);
  const checkIfAnswerIsCorrect = useSelector((state) => state.allAnswerInfo.isCurrentAnswerRight);
  const checkedIfAnswerHasBeenChosen = useSelector((state) => state.allAnswerInfo.answered);
  const currentNoOfTries = useSelector((state) => state.allAnswerInfo.currentNoOfTries);
  const question = currentQuestionsSet[0]; 
  const [shuffledAnswersToQuestionOptionComponent, setShuffledAnswersToQuestionOpton] = useState([])

  useEffect(() => {
    if(checkedIfAnswerHasBeenChosen === false){
      const correctAnswer = question.correctAnswer;
      const wrongAnswers = question.incorrectAnswers;
      //combine both correct and incorrect answers to create a whole answer options
      const unshuffledAllAnswers = [...wrongAnswers, correctAnswer];
      //create and suffle the options index
      const unshuffledOptionsList = ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, unshuffledAllAnswers.length);
      const suffledOptionsList = shuffleArray(unshuffledOptionsList);
      //create a new array of objects with key(option) value(option) pairs
      const arrayToPreventModification = unshuffledAllAnswers.map((answerOption, index) => {
        const modifiedOption = {};
        modifiedOption.id = suffledOptionsList[index];
        modifiedOption.option = answerOption
        return modifiedOption
      });
      //shuffle  and sort the created array of answer options objects
      const sortedShuffledAnswers = shuffleArray(arrayToPreventModification).sort(mySort);
      //pick out the correct answer and save it in the store
      const correctAnswerObj = searchForCorrectAnsOption(correctAnswer, sortedShuffledAnswers);
      setCurrentRightAnswer(correctAnswerObj, dispatch);
      setShuffledAnswersToQuestionOpton(sortedShuffledAnswers)
    }
  }, [checkedIfAnswerHasBeenChosen])

  const showAnswerFeedBack = () => {
    if (checkedIfAnswerHasBeenChosen && checkIfAnswerIsCorrect) {
      return <p className = "correct" > < i > Correct! </i></p > ;
    } else if (checkedIfAnswerHasBeenChosen && !checkIfAnswerIsCorrect) {
      return <p className = "wrong" > < i > Incorrect! </i></p > ;
    }
  };

  const handleNextClick = () => {
    const newCurrentQuestionsSet = currentQuestionsSet.slice(1);
    if (newCurrentQuestionsSet.length === 0) {
    } else {
      resetForNextQuestion(dispatch, newCurrentQuestionsSet);
    }
  };

  const handleFinishClick = () => {
    dispatch({type: SET_ANSWERED, payload: false})
    push('/summary')
  }

  const buttonToShow = () => {
    if(checkedIfAnswerHasBeenChosen && currentQuestionsSet.length >= 2){
      return <button className="next" onClick={() => handleNextClick()}> Next Question</button> 
    }else if(checkedIfAnswerHasBeenChosen && currentQuestionsSet.length === 1){
      //It made sense to use "Quiz summary here instead of next"
      return <button className="finish" onClick={() => handleFinishClick()}>Quiz Summary</button>
    }
  }


  return (
    <>
    <h2 className='header'>{currentQuiz.title}</h2>
    <div className="header">
      <h5>{question.text}</h5>
      <div>{shuffledAnswersToQuestionOptionComponent.map((option) => <QuestionOption key={option.id} option={option} />)}</div>
      <div>{showAnswerFeedBack()}</div>
      <div>
        {buttonToShow()}
      </div>
    </div>
    </>
  );
};

export default QuestionCard;
