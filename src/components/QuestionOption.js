import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAnswered, setAnswerIsCorrect } from '../redux/action';

const QuestionOption = (props) => {
  const { option } = props;
  const dispatch = useDispatch();
  const answered = useSelector((state) => state.allAnswerInfo.answered);
  const currentCorrectAnswer = useSelector((state) => state.allAnswerInfo.currentRightAnswer);
  const correctAnswerCount = useSelector((state) => state.allAnswerInfo.correctAnswerCount); 
  //!for tests, swith 'hasThisOptionBeenSelected' as desired 
  const [hasThisOptionBeenSelected, setHasThisOptionBeenSelected] = useState(false);
      
  useEffect (() => {
    if (!answered){
      setHasThisOptionBeenSelected(false);
    }
  },[answered])      
      
  const handleOptionClick =  () => {
    if (!answered) {
      if (option.id === currentCorrectAnswer.id && option.option === currentCorrectAnswer.option) {
        const newCorrectAnswerCount = correctAnswerCount + 1;
        setAnswerIsCorrect(dispatch, newCorrectAnswerCount);
      }
      setAnswered(dispatch);
      setHasThisOptionBeenSelected(true);
    }
  };

  //!conditions for when question has been answered
  if(answered){
    //!conditions for selected answers
    if(hasThisOptionBeenSelected){
      //?chosen && right = GREEN BORDER
      if (option.id === currentCorrectAnswer.id && option.option === currentCorrectAnswer.option){
          return (
            <div className="optionDiv">
              <button data-testid='chosen-correct-answer' className = "chosenAndRight">
                {option.id}. {option.option}
              </button>
            </div>
          )}
      else {
          //?chosen && wrong = RED BORDER && Struck out
          return (
            <div className="optionDiv">
              <button data-testid='wrong-answer' className = "chosenAndWrong" >
                <strike>
                  {option.id}. {option.option}
                </strike>
              </ button>
            </div>
          )};
    //!conditions for non selected answers
    }else{
      //?not chosen && right = GREEN BORDER
      if (option.id === currentCorrectAnswer.id && option.option === currentCorrectAnswer.option){
          return (
            <div className="optionDiv">
              <button data-testid='not-chosen-but-right-answer' className = "notChosenButRight" >
                {option.id}. {option.option}
              </ button>
            </div>
          )}
      else {
        //?not chosen && wrong = NO BORDER
        return (
          <div className="optionDiv">
            <button data-testid= 'not-chosen-and-wrong-answer'
            className = "notChosenAndWrong" >
              {option.id}. {option.option}
            </button>
          </div>
        )};
    }
  }
  else{//!condition for no answer where there is no answer yet = NO BORDER
    return (
      <div className="optionDiv" onClick={() => handleOptionClick()}>
        <button className = "nothingChosen">
          {option.id}. {option.option}
        </button>
      </div>
    )};
};

export default QuestionOption;