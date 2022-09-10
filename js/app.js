/*-------------------------------- Constants --------------------------------*/
// const keys = [
//   'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
//   'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
//   'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'
// ]

const board = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', '']
]


/*-------------------------------- Variables --------------------------------*/
let randomWord, row, numGuesses, winner, letter
let guess = []
let secretWord = 'mango'


/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board-container')
const keyboardEl = document.querySelector('#keyboard-container')
const messageEl = document.querySelector('#message')
//const resetBtn = document.querySelector('#reset-btn')



/*----------------------------- Event Listeners -----------------------------*/
keyboardEl.addEventListener('click', playerGuess)
//resetBtn.addEventListener('click', startGame)



/*-------------------------------- Functions --------------------------------*/

startGame()

function startGame() {
  numGuesses = -1
  createBoard()
}

function createBoard() {
  for(let array of board) {
    for(let i of array) {
      let square = document.createElement('div')
      square.textContent = i
      square.id = 'board-square'
      boardEl.appendChild(square)
    }
  }
}

const squareEl = document.querySelectorAll('#board-square')
console.log(squareEl)

function renderGuess() {
  if (guess.length < 5) {
    squareEl[numGuesses].textContent = letter
  }
}



function playerGuess(evt) {
  if(evt.target.id !== 'keyboard-container' && evt.target.id !== 'first-row' && evt.target.id !== 'second-row' && evt.target.id !== 'third-row') {
    if(evt.target.id !== 'ENTER' && evt.target.id !== 'BACK') {
      letter = evt.target.id
      console.log(letter, 'LETTER CLICKED')
      if(guess.length <5) {
        numGuesses += 1
        console.log(numGuesses, 'numGuesses')
        renderGuess()
        guess.push(letter)
        console.log(guess, 'guess array')
        letter = ''
      }
    } else if (evt.target.id === 'BACK') {
      console.log('pop')
      guess.pop(letter)
      console.log(guess, 'guesss')
      console.log(numGuesses, 'numGuessess')
      renderGuess()
      numGuesses -= 1
      console.log(guess)
    } else {
      if(guess.length === 5) {
        checkGuess()
        guess = []
      } else {
        messageEl.textContent = 'Not enough letters'
        console.log("Not enough letters")
      }
    }
  }
}

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