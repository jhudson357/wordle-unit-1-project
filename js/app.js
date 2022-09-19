import { getSecretWord, words } from "../data/words.js";

/*-------------------------------- Constants --------------------------------*/
const kazoo = new Audio('../audio/kazoo-audio.wav')
const loseSound = new Audio('../audio/loser.wav')

/*-------------------------------- Variables --------------------------------*/
let secretWord, numGuesses, letter, keyPressed, ms, row, col, secretTally
let gamesPlayed = 0
let gamesWon = 0
let winPercent = 0
let currentStreak = 0
let maxStreak = 0
let colCount = 0
let guessLetters = []


/*------------------------ Cached Element References ------------------------*/
// const boardEl = document.querySelector('#board-container')
const keyboardEl = document.querySelector('#keyboard-container')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset-btn')
const firstRowKeys = document.querySelector('#first-row').children
const secondRowKeys = document.querySelector('#second-row').children
const thirdRowKeys = document.querySelector('#third-row').children
const squareEl = document.querySelectorAll('.board-square')
const modalEl = document.querySelector('#stats-modal')
const statsBtn = document.querySelector('#stats-button')
const closeBtn = document.querySelector('#close-btn')
const playedNum = document.querySelector('#played-num')
const percentNum = document.querySelector('#percent-num')
const currentStreakNum = document.querySelector('#current-streak-num')
const maxStreakNum = document.querySelector('#max-streak-num')


/*----------------------------- Event Listeners -----------------------------*/
keyboardEl.addEventListener('click', virtualKeyboardGuess)
resetBtnEl.addEventListener('click', startGame)
document.addEventListener('keyup', physicalKeyboardGuess)
statsBtn.addEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)


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
  clearBoard()
  clearKeyboard()
}


function clearBoard() {
  for(let i=0; i<squareEl.length; i++) {
    squareEl[i].textContent = ''
    squareEl[i].className = 'board-square'
    squareEl[i].style = ''
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


function openModal() {
  modalEl.style.display = 'block'
}


function closeModal() {
  modalEl.style.display = 'none'
}


function renderGuess() {
  if (guessLetters.length < 5) {
    squareEl[numGuesses].textContent = letter
  }
}


function virtualKeyboardGuess(evt) {
  if(evt.target.id !== 'keyboard-container' && evt.target.id !== 'first-row' && evt.target.id !== 'second-row' && evt.target.id !== 'third-row') {
    if(evt.target.id !== 'enter' && evt.target.id !== 'back' && evt.target.id !== 'back-img') {
      if(guessLetters.length < 5) {
        letter = evt.target.id
        numGuesses += 1
        renderGuess()
        squareEl[numGuesses].id = `r${row}c${col}`
        col += 1
        guessLetters.push(letter)
        letter = ''
      }
    } else if (evt.target.id === 'back' || evt.target.id === 'back-img') {
      if (guessLetters.length !== 0) {
        guessLetters.pop(letter)
        renderGuess()
        squareEl[numGuesses].id = `r${row}c${col}`
        numGuesses -= 1
        col -= 1
      }
    } else {
      if(guessLetters.length === 5) {
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


function physicalKeyboardGuess(evt) {
  keyPressed = evt.key
  let charCode = evt.keyCode
  if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8 || charCode === 13) {
    if(keyPressed !== 'Enter' && keyPressed !== 'Backspace') {
      if(guessLetters.length < 5) {
        letter = keyPressed.toUpperCase()
        numGuesses += 1
        renderGuess()
        squareEl[numGuesses].id = `r${row}c${col}`
        col += 1
        guessLetters.push(letter)
        letter = ''
      }
    } else if (keyPressed === 'Backspace') {
      if(guessLetters.length !== 0) {
        guessLetters.pop(letter)
        renderGuess()
        squareEl[numGuesses].id = `r${row}c${col}`
        numGuesses -= 1
        col -= 1
      }
    } else {
      if(guessLetters.length === 5) {
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
  let guessedWord = guessLetters.join('').toLowerCase()
  if(words.includes(guessedWord)) {
    // WORD IS VALID
    flipSquares()
    countLetters()
    addColorStyles()
    row += 1
    col = 0
    guessLetters = []
    colCount=0
  } else {
    // WORD IS NOT VALID
    messageEl.style.display = ''
    messageEl.textContent = 'Not in word list'
    setTimeout(function() {
      messageEl.style.display = 'none'
    }, 1500)
  }
}


function countLetters() {
  secretTally = secretWord.split('').reduce(function (prev, char) {
    prev[char] = prev[char] ? prev[char]+1 : 1
    return prev
  }, {})
  return secretTally
}


function addColorStyles() {
  // CHECK FOR GREENS FIRST AND SET CLASS
  for(let i=0; i<5; i++) {
    let squareBeingChecked = document.getElementById(`r${row}c${i}`)
    let squareLetter = squareBeingChecked.textContent.toLowerCase()
    let secretWordArray = secretWord.split('')
    if(secretWordArray[i] === squareLetter) {
      squareBeingChecked.classList.add('green', 'temp-color')
      secretTally[squareLetter] -= 1
    }
  }
  // CHECK FOR YELLOWS AND GRAYS AFTER GREENS ARE SET
  for(let i=0; i<5; i++) {
    let squareBeingChecked = document.getElementById(`r${row}c${i}`)
    let squareLetter = squareBeingChecked.textContent.toLowerCase()
    if(!squareBeingChecked.classList.contains('green')) {
      if(secretWord.includes(squareLetter)) {
        // YELLOW LETTER
        if(secretTally[squareLetter]>0) {
          secretTally[squareLetter] -= 1
          if(squareBeingChecked.className !== 'green'){
            squareBeingChecked.classList.add('yellow', 'temp-color')
          }
        } else {
          // GRAY LETTER
          if(squareBeingChecked.className !== 'green'){
            squareBeingChecked.classList.add('gray', 'temp-color')
          }
        }
      } else {
        // GRAY LETTER
        if(squareBeingChecked.className !== 'green'){
          squareBeingChecked.classList.add('gray', 'temp-color')
        }
      }
    }
  }  
  isWinner()
  renderColors()
}


function flipSquares() {
  ms = 0
  for(let i=0; i<5; i++) {
    let squareBeingFlipped = document.getElementById(`r${row}c${i}`)
    squareBeingFlipped.style.animation = `flip 1s ease ${ms}ms`
    ms += 400
  }
}


function renderColors() {
  setTimeout(function () {
    let squareBeingFlipped = document.getElementById(`r${row-1}c${colCount}`)
    squareBeingFlipped.classList.remove('temp-color')
    
    // UPDATE KEYBOARD COLORS
    let secretWordArray = secretWord.split('')
    let squareLetter = squareBeingFlipped.textContent.toLowerCase()
    
    // GREEN KEYS
    if(secretWordArray[colCount] === squareLetter) {
      document.getElementById(`${squareLetter.toUpperCase()}`).className = 'green'
    }
    // YELLOW AND GRAY KEYS
    if(!squareBeingFlipped.classList.contains('green')) {
      if(secretWord.includes(squareLetter)) {
        // YELLOW LETTER
        if(secretTally[squareLetter]+1 >0) {
          if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green') {
            document.getElementById(`${squareLetter.toUpperCase()}`).className = 'yellow'
          }
        } else {
          // GRAY LETTER
          if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green' && document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'yellow') {
            document.getElementById(`${squareLetter.toUpperCase()}`).className = 'gray'
          }
        }  
      } else {
        // GRAY LETTER
        if(document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'green' && document.getElementById(`${squareLetter.toUpperCase()}`).className !== 'yellow') {
          document.getElementById(`${squareLetter.toUpperCase()}`).className = 'gray'
        }
      }
    }
    colCount++
    if(colCount<5) {
      renderColors()
    }
  }, 400)
}


function isWinner() {
  if(guessLetters.join('') === secretWord.toUpperCase()) {
    // WIN
    renderModal()
    messageEl.textContent = 'Congrats, you won!'
    setTimeout(function() {
      messageEl.style.display = ''
      resetBtnEl.style.display = ''
      keyboardEl.style.display = 'none'
      kazoo.volume = .10
      kazoo.play()
      confetti.start(2000)
    }, 2400)
  } else if(numGuesses === 29) {
    // LOSE
    renderModal()
    messageEl.textContent = `You lose. The word was ${secretWord}.`
    setTimeout(function() {
      messageEl.style.display = ''
      resetBtnEl.style.display = ''
      keyboardEl.style.display = 'none'
      loseSound.play()
    }, 2400)
  }
}


function renderModal() {
  // GAMES PLAYED
  gamesPlayed += 1
  playedNum.textContent = gamesPlayed
  // STREAKS
  if(guessLetters.join('') === secretWord.toUpperCase()) {
    // WIN
    gamesWon += 1
    currentStreak += 1
    currentStreakNum.textContent = currentStreak
    if(parseInt(maxStreak.textContent) === 0 || currentStreak > maxStreak) {
      maxStreak = currentStreak
    }
    maxStreakNum.textContent = maxStreak
  } else if(numGuesses === 29) {
    // LOSE
    currentStreak = 0
    currentStreakNum.textContent = currentStreak
  }
  // WIN PERCENT
  winPercent = Math.trunc((gamesWon / gamesPlayed)*100)
  percentNum.textContent = winPercent
}