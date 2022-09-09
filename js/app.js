/*-------------------------------- Constants --------------------------------*/
const keys = [
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
  'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
  'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'
]


/*-------------------------------- Variables --------------------------------*/
let randomWord, row, guesses, winner


/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector('#board-container')
const keyboardEl = document.querySelector('#keyboard-container')
console.log(keyboardEl)
console.log(boardEl)

/*----------------------------- Event Listeners -----------------------------*/
keyboardEl.addEventListener('click', () => {
  console.log('you clicked on the keyboard')
})


/*-------------------------------- Functions --------------------------------*/
