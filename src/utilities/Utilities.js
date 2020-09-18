//Create a Fisher-Yates Algorithm shuffleArray function to keep code dry!
export const shuffleArray = (answerArray) => {
    for (let i = answerArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [answerArray[i], answerArray[j]] = [
            answerArray[j],
            answerArray[i],
        ];
    }
    return answerArray;
};

//create a sort function to be used later. Avoiding localeCompare in case IDs are not strings
//this will make this function good for every id (interger or string) scenerio
export const mySort = (a, b) => {
    if (a.id < b.id) {
        return -1;
    }
    if (a.id > b.id) {
        return 1;
    }
    return 0
}

//create search fucntion
export const searchForCorrectAnsOption = (correctAnswer, array) => {
    for (var i = 0; i < array.length; i++) {
        if (array[i].option === correctAnswer) {
            return array[i];
        }
    }
}


