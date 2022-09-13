import { getSecretWord, words } from "../data/words.js";

/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/
let secretWord, numGuesses, winner, letter, keyPressed, ms, row, col, secretTally
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
  // secretWord = getSecretWord()
  secretWord = 'whits'
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
        squareEl[numGuesses].id = `r${row}c${col}`
        col += 1
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
        squareEl[numGuesses].id = `r${row}c${col}`
        numGuesses -= 1
        col -= 1
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
  // console.log(charCode, 'charCode')
  // console.log(keyPressed, 'keyPressed')
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8 || charCode === 13) {
    if(keyPressed !== 'Enter' && keyPressed !== 'Backspace') {
        if(guess.length < 5) {
        letter = keyPressed.toUpperCase()
        numGuesses += 1
        renderGuess()
        squareEl[numGuesses].id = `r${row}c${col}`
        col += 1
        guess.push(letter)
        letter = ''
      }
    } else if (keyPressed === 'Backspace') {
      if(guess.length !== 0) {
        guess.pop(letter)
        renderGuess()
        squareEl[numGuesses].id = `r${row}c${col}`
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
  console.log(guessedWord, 'guessedWord')
  if(words.includes(guessedWord)) {
    // WORD IS VALID
    flipSquares()
    countLetters()
    // setTimeout(() => {renderColors()}, 1000)
    renderColors()
    row += 1
    col = 0
    guess = []
  } else {
    // WORD IS NOT VALID
    messageEl.style.display = ''
    messageEl.textContent = 'Not in word list'
    setTimeout(function() {
      messageEl.style.display = 'none'
    }, 1500)
  }
}


function renderColors() {
  // CHECK FOR GREENS FIRST
  for(let i=0; i<5; i++) {
    let squareBeingChecked = document.getElementById(`r${row}c${i}`)
    let squareLetter = squareBeingChecked.textContent.toLowerCase()
    let secretWordArray = secretWord.split('')
    if(secretWordArray[i] === squareLetter) {
        squareBeingChecked.classList.add('green')
        document.getElementById(`${squareLetter.toUpperCase()}`).className = 'green'
        // console.log(secretTally, 'secretTally before subtracting 1')
        secretTally[squareLetter] -= 1
        // console.log(secretTally, 'secretTally after subtracting 1')
    }
  }

  // CHECK FOR YELLOWS AND GRAYS AFTER GREENS ARE SET
  for(let i=0; i<5; i++) {
    let squareBeingChecked = document.getElementById(`r${row}c${i}`)
    let squareLetter = squareBeingChecked.textContent.toLowerCase()
    if(!squareBeingChecked.classList.contains('green')) {
      if(secretWord.includes(squareLetter)) {
        if(secretTally[squareLetter]>0) {
          secretTally[squareLetter] -= 1
          if(squareBeingChecked.className !== 'green'){
            squareBeingChecked.classList.add('yellow')
          }
          if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green') {
            document.getElementById(`${squareLetter.toUpperCase()}`).className = 'yellow'
          }
        } else {
          // GRAY LETTER
          if(squareBeingChecked.className !== 'green'){
            squareBeingChecked.classList.add('gray')
          }
          if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green' && document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'yellow') {
            document.getElementById(`${squareLetter.toUpperCase()}`).className = 'gray'
          }
        }
      } else {
        // GRAY LETTER
        if(squareBeingChecked.className !== 'green'){
          squareBeingChecked.classList.add('gray')
        }
        if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green' && document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'yellow') {
          document.getElementById(`${squareLetter.toUpperCase()}`).className = 'gray'
        }
      }
    }
  }  
  isWinner()
}



function countLetters() {
  // console.log(secretWord, 'secretWord in countLetters fucntion')
  secretTally = secretWord.split('').reduce(function (prev, char) {
    prev[char] = prev[char] ? prev[char]+1 : 1
    return prev
  }, {})
  // console.log(guessTally, 'guessTally')
  // console.log(guessTally[letter], 'guessTally[0]')
  console.log(secretTally, 'secretTally')
  return secretTally
}


function flipSquares() {
    ms = 0
    for(let i=0; i<5; i++) {
      console.log(row, 'row')
      let squareBeingFlipped = document.getElementById(`r${row}c${i}`)
      squareBeingFlipped.style.animation = `flip 1s ease ${ms}ms`
      ms += 400
      console.log(squareBeingFlipped, 'squareBeingFlipped')
    }
}


function isWinner() {
  if(guess.join('') === secretWord.toUpperCase()) {
    messageEl.textContent = 'Congrats, you won!'
    // messageEl.style.display = ''
    setTimeout(function() {
      messageEl.style.display = ''
      resetBtnEl.style.display = ''
      keyboardEl.style.display = 'none'
    }, 2500)
  } else if(numGuesses === 29) {
    messageEl.textContent = `You lose. The word was ${secretWord}`
    messageEl.style.display = ''
    resetBtnEl.style.display = ''
    keyboardEl.style.display = 'none'
  }
}


//!TO DO:
// score count
// flip animations
// shake animations
// style the message with CSS

// function renderColors1() {
//   for(let i=0; i<5; i++) {  // i iterates through the columns and updates squareLetter
//     let squareBeingChecked = document.getElementById(`r${row}c${i}`)
//     let squareLetter = squareBeingChecked.textContent.toLowerCase()
//     let secretWordArray = secretWord.split('')
//     if(secretWordArray.includes(squareLetter)) {
//       if(secretWordArray[i] === squareLetter) {
//         // GREEN LETTER
//         squareBeingChecked.classList.add('green')
//         document.getElementById(`${squareLetter.toUpperCase()}`).className = 'green'
//         console.log(secretTally, 'secretTally before subtracting 1')
//         secretTally[squareLetter] -= 1
//         console.log(secretTally, 'secretTally after subtracting 1')
//       } else {
//         // YELLOW LETTER
//         console.log(secretTally[guess[i]], `secretTally[guess[${i}]]`)
//         if(secretTally[squareLetter]>0) {
//           secretTally[squareLetter] -= 1
//           squareBeingChecked.classList.add('yellow')
//           if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green') {
//             document.getElementById(`${squareLetter.toUpperCase()}`).className = 'yellow'
//           }
//         } else {
//           // GRAY LETTER
//           squareBeingChecked.classList.add('gray')
//           if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green' && document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'yellow') {
//             document.getElementById(`${squareLetter.toUpperCase()}`).className = 'gray'
//           }
//         }
//       }
//     } else {
//       // GRAY LETTER
//       squareBeingChecked.classList.add('gray')
//       if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green' && document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'yellow') {
//         document.getElementById(`${squareLetter.toUpperCase()}`).className = 'gray'
//       }
//     }
//   isWinner()
//   }
// }