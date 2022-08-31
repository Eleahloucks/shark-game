const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
//create global correct guess var
let correctGuess = 0

// this function gives us right amount of blank spaces for
// letters in the word
// first, loop over the chars in `word` and create divs
// function takes in a word, then creates a variable called
// wordContainer - use method querySelector to select the
// element with id #word-container
// then loop over each letter in word and call method
// insertAdjacentHTML and insert intou our wordContainer
// our div classes with each letter in the word
const createDivsForChars = (word) => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
// make button for every letter, we'll use these to fill in
// the blank spaces with guesses
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
// create var called disableLetterButton, assign it to the
// value of our arrow function, which takes in parameter buttonEl

const disableLetterButton = (buttonEl) => {
  buttonEl.disabled = true;
};

// created function that disables all letter buttons
const disableAllLetterButtons = () => {
  //select all buttons
  const allButtons = document.querySelectorAll('button');
  //loop through the buttons and disable all
  for( const button of allButtons){
    button.disabled = true;
  }
};

// Return `true` if `letter` is in the word.
// isLetterInWord takes in string called 'letter' and then selects an element
// with div class of the specified letter and if it finds the element
//
const isLetterInWord = (letter) => document.querySelector(`div.${letter}`) !== null;



// Called when `letter` is in word. Update contents of divs with `letter`
// write a function that takes a var called letter
//.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"> ${letter} </div>`);

//add word param
const handleCorrectGuess = (letter, word) => {
  //save var as letterDivs
  //select all divs in word that also have the class of that letter
  const correctLetters = document.querySelectorAll(`div.${letter}`);
  //loop over array of node/element div list
  for (const correctLetter of correctLetters){
    // console.log(correctLetter);
    //use .innerHTML to set letterdiv to letter
    correctLetter.innerHTML=letter;
    //set global var correctGuess +1
    correctGuess++
  }
  // if correct guesses equals the length of the word
  if(correctGuess === word.length){
    //disable all letter buttons
    disableAllLetterButtons();
    //display the win block
    document.querySelector('#win').style.display = "block";
  }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;

  document
    .querySelector('#shark-img img')
    .setAttribute('src', `/static/images/guess${numWrong}.png`);

  // if the wrong guess is 5
  if(numWrong === 5) {
    //disable all the letter buttons
    disableAllLetterButtons()
    //show the play again button by adding the syle display block
    document.querySelector('#play-again').style.display = 'block';
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  //create button var to select all buttons
  const buttons = document.querySelectorAll('button')
  //loop through each button
  for (const button of buttons) {
    // add an event handler to handle clicking on a letter button
    button.addEventListener('click', (evt) => {
      const clicked = evt.target;
      //call disable letter function on the button that was clicked
      disableLetterButton(clicked);
      //create letter var and set it to the clicked button
      const letter = clicked.innerHTML;
      //if the letter is in the word
      if (isLetterInWord(letter)){
        //call handle correct guess
        handleCorrectGuess(letter, word);
      //else handle incorrect guess
      } else {
        handleWrongGuess();
      }
    });
  }
  // add an event handler to handle clicking on the Play Again button
  // create play again button and use query selector to select the play again id
  // add an event listener that resets the game when the button is clicked.
  document.querySelector('#play-again').addEventListener('click', resetGame);
  //add win event listener
  document.querySelector('#win').addEventListener('click', resetGame);
})();
