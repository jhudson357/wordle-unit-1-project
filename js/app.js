import { getSecretWord, words } from "../data/words.js";

/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let secretWord, numGuesses, winner, letter, keyPressed, ms, row, col
let guess = []


/*------------------------ Cached Element References ------------------------*/
// const boardEl = document.querySelector('#board-container')
const keyboardEl = document.querySelector('#keyboard-container')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset-btn')
const firstRowKeys = document.querySelector('#first-row').children
const secondRowKeys = document.querySelector('#second-row').children
const thirdRowKeys = document.querySelector('#third-row').children
const squareEl = document.querySelectorAll('.board-square')
console.log(squareEl, 'length')

console.log(firstRowKeys[0].id)

/*----------------------------- Event Listeners -----------------------------*/
keyboardEl.addEventListener('click', virtualKeyboardGuess)
resetBtnEl.addEventListener('click', startGame)
document.addEventListener('keyup', physicalKeyboardGuess)


/*-------------------------------- Functions --------------------------------*/

startGame()

function startGame() {
  numGuesses = -1
  ms = 0
  row = 0
  col = 0
  resetBtnEl.style.display = 'none'
  messageEl.style.display = 'none'
  keyboardEl.style.display = ''
  secretWord = getSecretWord()
  console.log(secretWord)
  clearBoard()
  clearKeyboard()
}

function clearBoard() {
  for(let i=0; i<squareEl.length; i++) {
    squareEl[i].textContent = ''
    squareEl[i].className = 'board-square'
  }
}

function clearKeyboard() {
  for(let i=0; i<firstRowKeys.length; i++) {
    firstRowKeys[i].className = ''
  }
  for(let i=0; i<secondRowKeys.length; i++) {
    secondRowKeys[i].className = ''
    thirdRowKeys[i].className = ''
  }
}

function renderGuess() {
  if (guess.length < 5) {
    squareEl[numGuesses].textContent = letter
    squareEl[numGuesses].id = `${row}=${col}`
  }
}

function virtualKeyboardGuess(evt) {
  if(evt.target.id !== 'keyboard-container' && evt.target.id !== 'first-row' && evt.target.id !== 'second-row' && evt.target.id !== 'third-row') {
    if(evt.target.id !== 'enter' && evt.target.id !== 'back') {
      if(guess.length < 5) {
        letter = evt.target.id
        numGuesses += 1
        // console.log(numGuesses, 'numGuesses')
        renderGuess()
        guess.push(letter)
        // console.log(guess, 'guess array')
        letter = ''
      }
    } else if (evt.target.id === 'back') {
      if(guess.length !== 0) {
        // console.log('pop')
        guess.pop(letter)
        // console.log(guess, 'guesss')
        // console.log(numGuesses, 'numGuessess')
        renderGuess()
        numGuesses -= 1
        // console.log(guess)
      }
    } else {
      if(guess.length === 5) {
        checkWordValidity()

      } else {
        messageEl.style.display = ''
        messageEl.textContent = 'Not enough letters'
        // console.log("Not enough letters")
        setTimeout(function() {
          messageEl.style.display = 'none'
        }, 1500)
      }
    }
  }
}

function physicalKeyboardGuess(evt) {
  keyPressed = evt.key
  let charCode = evt.keyCode
  console.log(charCode, 'charCode')
  console.log(keyPressed, 'keyPressed')
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8 || charCode === 13) {
    if(keyPressed !== 'Enter' && keyPressed !== 'Backspace') {
        if(guess.length < 5) {
        letter = keyPressed.toUpperCase()
        numGuesses += 1
        renderGuess()
        col += 1
        guess.push(letter)
        letter = ''
      }
    } else if (keyPressed === 'Backspace') {
      if(guess.length !== 0) {
        guess.pop(letter)
        renderGuess()
        numGuesses -= 1
        col -= 1
      }
    } else {
      if(guess.length === 5) {
        checkWordValidity()
      } else {
        messageEl.style.display = ''
        messageEl.textContent = 'Not enough letters'
        setTimeout(function() {
          messageEl.style.display = 'none'
        }, 1500)
      }
    }
  }
}

function checkWordValidity() {
  let guessedWord = guess.join('').toLowerCase()
  console.log(guessedWord)
  if(words.includes(guessedWord)) {
    // console.log('word is valid')
    row += 1
    col = 0
    checkGuess()
    guess = []
  } else {
    // console.log('word is NOT valid')
    messageEl.style.display = ''
    messageEl.textContent = 'Not in word list'
    setTimeout(function() {
      messageEl.style.display = 'none'
    }, 1500)
  }
}

function checkGuess() {
  let secretWordArray = secretWord.toUpperCase().split('')
  
  flipTiles()
  for(let i=0; i<5; i++) {
    let squareLetter = squareEl[i].textContent
    console.log(squareLetter, 'square letter')


    if(secretWordArray.includes(guess[i])) {
      if(guess[i] === secretWordArray[i]) {
        // GREEN LETTER
        flipTiles()
        if(numGuesses === 4){
          squareEl[i].classList.add('green')
          console.log(squareEl[i].className)
          document.getElementById(`${squareEl[i].textContent}`).classList.add('green')
        } else if(numGuesses === 9) {
          squareEl[i+5].classList.add('green')
          document.getElementById(`${squareEl[i+5].textContent}`).className = 'green'
        } else if(numGuesses === 14) {
          squareEl[i+10].classList.add('green')
          document.getElementById(`${squareEl[i+10].textContent}`).className = 'green'
        } else if(numGuesses === 19) {
          squareEl[i+15].classList.add('green')
          document.getElementById(`${squareEl[i+15].textContent}`).className = 'green'
        } else if(numGuesses === 24) {
          squareEl[i+20].classList.add('green')
          document.getElementById(`${squareEl[i+20].textContent}`).className = 'green'
        } else if(numGuesses === 29) {
          squareEl[i+25].classList.add('green')
          document.getElementById(`${squareEl[i+25].textContent}`).className = 'green'  
        }    
      } else {
        // YELLOW LETTER
        flipTiles()
        if(numGuesses === 4){
          squareEl[i].classList.add('yellow')
          if(document.getElementById(`${squareEl[i].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i].textContent}`).className = 'yellow'}
        } else if(numGuesses === 9) {
          squareEl[i+5].classList.add('yellow')
          if(document.getElementById(`${squareEl[i+5].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+5].textContent}`).className = 'yellow'}
        } else if(numGuesses === 14) {
          squareEl[i+10].classList.add('yellow')
          if(document.getElementById(`${squareEl[i+10].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+10].textContent}`).className = 'yellow'}
        } else if(numGuesses === 19) {
          squareEl[i+15].classList.add('yellow')
          if(document.getElementById(`${squareEl[i+15].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+15].textContent}`).className = 'yellow'}
        } else if(numGuesses === 24) {
          squareEl[i+20].classList.add('yellow')
          if(document.getElementById(`${squareEl[i+20].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+20].textContent}`).className = 'yellow'}
        } else if(numGuesses === 29) {
          squareEl[i+25].classList.add('yellow')
          if(document.getElementById(`${squareEl[i+25].textContent}`).className !== 'green') {document.getElementById(`${squareEl[i+25].textContent}`).className = 'yellow'}  
        }
      }
    } else {
      // GRAY LETTER
      flipTiles()
      if(numGuesses === 4) {
        squareEl[i].classList.add('gray')
        document.getElementById(`${squareEl[i].textContent}`).className = 'gray'
      } else if(numGuesses === 9) {
        squareEl[i+5].classList.add('gray')
        document.getElementById(`${squareEl[i+5].textContent}`).className = 'gray'
      } else if(numGuesses === 14) {
        squareEl[i+10].classList.add('gray')
        document.getElementById(`${squareEl[i+10].textContent}`).className = 'gray'
      } else if(numGuesses === 19) {
        squareEl[i+15].classList.add('gray')
        document.getElementById(`${squareEl[i+15].textContent}`).className = 'gray'
      } else if(numGuesses === 24) {
        squareEl[i+20].classList.add('gray')
        document.getElementById(`${squareEl[i+20].textContent}`).className = 'gray'
      } else if(numGuesses === 29) {
        squareEl[i+25].classList.add('gray')
        document.getElementById(`${squareEl[i+25].textContent}`).className = 'gray'  
      }
    }
  }
  isWinner()
}

function flipTiles() {
  // squareEl[0].style.animation = 'flip 1s ease 0ms'
  // squareEl[1].style.animation = 'flip 1s ease 100ms'
  // squareEl[2].style.animation = 'flip 1s ease 200ms'
  // squareEl[3].style.animation = 'flip 1s ease 300ms'
  // squareEl[4].style.animation = 'flip 1s ease 40ms'
  if(numGuesses === 4) {
    ms = 0
    for(let i=0; i<5; i++) {
      squareEl[i].style.animation = `flip 1s ease ${ms}ms`
      ms += 300
    }
  }
}


function isWinner() {
  if(guess.join('') === secretWord.toUpperCase()) {
    messageEl.textContent = 'Congrats, you won!'
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
// score count
// allow keyboard to function 
// only highlight one color square




// STOP UNDOING HERE