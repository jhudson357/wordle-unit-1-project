/*-------------------------------- Constants --------------------------------*/
// const keys = [
//   'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
//   'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
//   'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'
// ]

// const board = [
//   ['', '', '', '', ''],
//   ['', '', '', '', ''],
//   ['', '', '', '', ''],
//   ['', '', '', '', ''],
//   ['', '', '', '', ''],
//   ['', '', '', '', '']
// ]



/*-------------------------------- Variables --------------------------------*/
let randomWord, row, numGuesses, winner, letter
let guess = []
let secretWord = 'mango'
let secretWordArray = secretWord.toUpperCase().split('')



/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board-container')
const keyboardEl = document.querySelector('#keyboard-container')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset-btn')
const squareEl = document.querySelectorAll('#board-square')
console.log(squareEl)



/*----------------------------- Event Listeners -----------------------------*/
keyboardEl.addEventListener('click', playerGuess)
resetBtnEl.addEventListener('click', startGame)



/*-------------------------------- Functions --------------------------------*/

startGame()

function startGame() {
  numGuesses = -1
  resetBtnEl.style.display = 'none'
  messageEl.style.display = 'none'
  keyboardEl.style.display = ''
  clearBoard()
}

function clearBoard() {
  for(let i=0; i<squareEl.length; i++) {
    squareEl[i].textContent = ''
    squareEl[i].className = ''
  }
}

function renderGuess() {
  if (guess.length < 5) {
    squareEl[numGuesses].textContent = letter
  }
}

function playerGuess(evt) {
  if(evt.target.id !== 'keyboard-container' && evt.target.id !== 'first-row' && evt.target.id !== 'second-row' && evt.target.id !== 'third-row') {
    if(evt.target.id !== 'ENTER' && evt.target.id !== 'BACK') {
      if(guess.length < 5) {
        letter = evt.target.id
      }
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
      if(guess.length !== 0) {
        console.log('pop')
        guess.pop(letter)
        console.log(guess, 'guesss')
        console.log(numGuesses, 'numGuessess')
        renderGuess()
        numGuesses -= 1
        console.log(guess)
      }
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
  for(let i=0; i<5; i++) {
    if(secretWordArray.includes(guess[i])) {
      if(guess[i] === secretWordArray[i]) {
        console.log(`${guess[i]} is a match!`)
        if(numGuesses === 4){
          squareEl[i].className = 'green'
          document.getElementById(`${squareEl[i].textContent}`).className = 'green'
        } else if(numGuesses === 9) {
          squareEl[i+5].className = 'green'
          document.getElementById(`${squareEl[i+5].textContent}`).className = 'green'
        } else if(numGuesses === 14) {
          squareEl[i+10].className = 'green'
          document.getElementById(`${squareEl[i+10].textContent}`).className = 'green'
        } else if(numGuesses === 19) {
          squareEl[i+15].className = 'green'
          document.getElementById(`${squareEl[i+15].textContent}`).className = 'green'
        } else if(numGuesses === 24) {
          squareEl[i+20].className = 'green'
          document.getElementById(`${squareEl[i+20].textContent}`).className = 'green'
        } else if(numGuesses === 29) {
          squareEl[i+25].className = 'green'
          document.getElementById(`${squareEl[i+25].textContent}`).className = 'green'  
        }    
      } else {
        console.log(`${guess[i]} is in the secret word, but in a dif location`)
        if(numGuesses === 4){
          squareEl[i].className = 'yellow'
          if(document.getElementById(`${squareEl[i].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i].textContent}`).className = 'yellow'}
        } else if(numGuesses === 9) {
          squareEl[i+5].className = 'yellow'
          if(document.getElementById(`${squareEl[i+5].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+5].textContent}`).className = 'yellow'}
        } else if(numGuesses === 14) {
          squareEl[i+10].className = 'yellow'
          if(document.getElementById(`${squareEl[i+10].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+10].textContent}`).className = 'yellow'}
        } else if(numGuesses === 19) {
          squareEl[i+15].className = 'yellow'
          if(document.getElementById(`${squareEl[i+15].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+15].textContent}`).className = 'yellow'}
        } else if(numGuesses === 24) {
          squareEl[i+20].className = 'yellow'
          if(document.getElementById(`${squareEl[i+20].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+20].textContent}`).className = 'yellow'}
        } else if(numGuesses === 29) {
          squareEl[i+25].className = 'yellow'
          if(document.getElementById(`${squareEl[i+25].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+25].textContent}`).className = 'yellow'}  
        }
      }
    } else {
      console.log(`${guess[i]} is not in the secret word`)
      if(numGuesses === 4){
        squareEl[i].className = 'gray'
        document.getElementById(`${squareEl[i].textContent}`).className = 'gray'
      } else if(numGuesses === 9) {
        squareEl[i+5].className = 'gray'
        document.getElementById(`${squareEl[i+5].textContent}`).className = 'gray'
      } else if(numGuesses === 14) {
        squareEl[i+10].className = 'gray'
        document.getElementById(`${squareEl[i+10].textContent}`).className = 'gray'
      } else if(numGuesses === 19) {
        squareEl[i+15].className = 'gray'
        document.getElementById(`${squareEl[i+15].textContent}`).className = 'gray'
      } else if(numGuesses === 24) {
        squareEl[i+20].className = 'gray'
        document.getElementById(`${squareEl[i+20].textContent}`).className = 'gray'
      } else if(numGuesses === 29) {
        squareEl[i+25].className = 'gray'
        document.getElementById(`${squareEl[i+25].textContent}`).className = 'gray'  
      }
    }
  }
  isWinner()
}

function isWinner() {
  if(guess.join('') === secretWord.toUpperCase()) {
    messageEl.textContent = 'Congrats, you win!'
    messageEl.style.display = ''
    resetBtnEl.style.display = ''
    keyboardEl.style.display = 'none'
  } else if(numGuesses === 29) {
    messageEl.textContent = `You lose. The word was ${secretWord}`
    messageEl.style.display = ''
    resetBtnEl.style.display = ''
    keyboardEl.style.display = 'none'
  }
}


//!TO DO:
// update colors for squares 
// add timer to message