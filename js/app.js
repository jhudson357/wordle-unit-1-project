/*-------------------------------- Constants --------------------------------*/
const keys = [
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
  'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'
]


/*-------------------------------- Variables --------------------------------*/
let randomWord, row, numGuesses, winner, letter
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

// startGame()

// function startGame() {

// }

function playerGuess(evt) {
  if(evt.target.id !== 'keyboard-container' && evt.target.id !== 'first-row' && evt.target.id !== 'second-row' && evt.target.id !== 'third-row') {
    if(evt.target.id !== 'ENTER' && evt.target.id !== 'BACK') {
      letter = evt.target.id
      console.log(letter, 'LETTER CLICKED')
      //storeFullGuess()
      if(guess.length <5) {
        guess.push(letter)
        console.log(guess, 'guess array')
        letter = ''
      }
      if(guess.length === 5) {
        checkGuess()
        numGuesses++
        guess = []
      }
    } else if (evt.target.id === 'BACK') {
      guess.pop(letter)
      console.log(guess)
    }
  }
}

// function storeFullGuess() {
//   if(guess.length <5) {guess.push(letter)}
//   console.log(guess, 'guess array')
//   if(guess.length === 5) {
//     checkGuess()
//     numGuesses++
//     guess = []
//   }
// }

function checkGuess() {
  let secretWordArray = secretWord.toUpperCase().split('')
  console.log(secretWordArray, 'secret word array')
  for(let i=0; i<5; i++) {
    if(secretWordArray.includes(guess[i])) {
      if(guess[i] === secretWordArray[i]) {
        console.log(`${guess[i]} is a match!`)
      } else {
        console.log(`${guess[i]} is in the secret word, but in a dif location`)
      }
    } else {
      console.log(`${guess[i]} is not in the secret word`)
    }
  }
}