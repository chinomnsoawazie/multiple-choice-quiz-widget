import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAnswered, setAnswerIsCorrect } from '../redux/action';

const QuestionOption = (props) => {
  const { option } = props;
  const dispatch = useDispatch();

  const answered = useSelector((state) => state.allAnswerInfo.answered);
  const currentCorrectAnswer = useSelector(
    (state) => state.allAnswerInfo.currentRightAnswer,
    );
    const correctAnswerCount = useSelector(
      (state) => state.allAnswerInfo.correctAnswerCount,
      );
      
      const [hasThisOptionBeenSelected, setHasThisOptionBeenSelected] = useState(false);
      const [newRender, setNewRender] = useState(true)
      
      useEffect (() => {
        if (!answered){
          setHasThisOptionBeenSelected(false);
          setNewRender(true)
        }
      },[answered])      
      
      const handleOptionClick =  (e) => {
        e.preventDefault();
        if (!answered) {
          // console.log('this is the chosen option', option)
          if (option.id === currentCorrectAnswer.id && option.option === currentCorrectAnswer.option) {
            const newCorrectAnswerCount = correctAnswerCount + 1;
            setAnswerIsCorrect(dispatch, newCorrectAnswerCount);
          }
          setAnswered(dispatch);
          setHasThisOptionBeenSelected(true);
        }
      };
      
// console.log('this option: ', option.option, '::Correct ans: ', currentCorrectAnswer.option, '::answered: ', answered, '::option id: ', option.id, '::hasBeenSelected: ', hasThisOptionBeenSelected)
  if (
    //this answer is chosen and correct
    answered &&
    hasThisOptionBeenSelected &&
    option.id === currentCorrectAnswer.id &&
    option.option === currentCorrectAnswer.option &&
    newRender
  ) {
        // console.log('chosen && right ==GREEN==')
        // console.log(' ')
    return (
      <div className="optionDiv">
        <button className = "chosenAndRight">
          {option.id}. {option.option}
        </button>
      </div>
    );
  } else if (
    //this ans is chosen and not correct
    answered &&
    hasThisOptionBeenSelected &&
    option.id !== currentCorrectAnswer.id &&
    option.option !== currentCorrectAnswer.option &&
    newRender
  ) {

    return (
      <div className="optionDiv">
        <button className = "chosenAndWrong" >
          <strike>
            {option.id}. {option.option}
          </strike>
        </ button>
      </div>
    );
  } else if (
    //situation where another answer CHOSEN is WRONG and THIS is RIght
    answered &&
    !hasThisOptionBeenSelected &&
    option.id === currentCorrectAnswer.id &&
    option.option === currentCorrectAnswer.option && 
    newRender
    ) {
      // console.log('not chosen && right ==GREEN==')
      // console.log(' ')

    return (
      <div className="optionDiv">
        <button className = "notChosenButRight" >
          {option.id}. {option.option}
        </ button>
      </div>
    );
  }  else if (
    //situation where another answer CHOSEN is RIGHT and hence THIS is WRONG
    answered &&
    !hasThisOptionBeenSelected &&
    option.id !== currentCorrectAnswer.id &&
    option.option !== currentCorrectAnswer.option && 
    newRender
    ) {
      // console.log('not chosen && wrong ==BLACK==')
      // console.log(' ')
    return (
      <div className="optionDiv">
        <button className = "notChosenAndWrong">
          {option.id}. {option.option}
        </button>
      </div>
    );
  } else {
    //Situation where there is no answer yet
          // console.log('nothing chosen ==NO BORDER')
          // console.log(' ')
    return (
      <div className="optionDiv" onClick={(e) => handleOptionClick(e)}>
        <button className = "nothingChosen">
          {option.id}. {option.option}
        </button>
      </div>
    );
  }
};

export default QuestionOption;
