/*-------------------------------- Constants --------------------------------*/
const keys = [
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
  'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'
]


/*-------------------------------- Variables --------------------------------*/
let randomWord, row, numGuess, winner, letter
let guess = []
let secretWord = 'mango'


/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board-container')
const keyboardEl = document.querySelector('#keyboard-container')

/*----------------------------- Event Listeners -----------------------------*/
keyboardEl.addEventListener('click', playerGuess)
// keyboardEl.addEventListener('click', () => {
//   console.log('you clicked on the keyboard')
// })


/*-------------------------------- Functions --------------------------------*/

function playerGuess(evt) {
  if(evt.target.id !== 'keyboard-container' && evt.target.id !== 'first-row' && evt.target.id !== 'second-row' && evt.target.id !== 'third-row') {
      letter = evt.target.id
      console.log(letter, 'LETTER CLICKED')
      storeFullGuess()
    }
    letter = ''
}

function storeFullGuess() {
  if(guess.length <5) {guess.push(letter)}
  console.log(guess, 'guess array')
  if(guess.length === 5) {
    checkGuess()
    guess = []
  }
}

function checkGuess() {
  let secretWordArray = secretWord.toUpperCase().split('')
  console.log(secretWordArray, 'secret word array')
  for(let i=0; i<5; i++) {
    if(guess[i] === secretWordArray[i]) {
      console.log(`${guess[i]} is a match`)
    } else {
      console.log(`${guess[i]} is not a match`)
    }
  }
}