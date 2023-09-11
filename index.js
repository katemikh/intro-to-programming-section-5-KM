const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');
const belowZeroMessage = document.getElementById("below-zero");
const aboveHundredMessage = document.getElementById("above-hundred");

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const messageList = document.querySelector('.message-list');
const errorMessage = document.createElement('p');
messageList.appendChild(errorMessage);

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);

  if (isNaN(guess)) {
    // added code if the user cliked button - nothing happened
    return;
  }
  console.log(guess);

  guessInput.value = "";

  hideAllMessages();
  // changed logic : if less then 1 and if more then 100 show existing message
  if (guess <= 0) {
    belowZeroMessage.style.display = "block";
    return;
  }

  if (guess > 99) {
    aboveHundredMessage.style.display = "block";
    return;
  }

  //moved line that the checks are performed first, and then the attempt is counted. If the test fails, the attempt is not counted.
  attempts = attempts + 1;

  const guessOrGuesses = (numberOfGuesses) => {
    if (numberOfGuesses === 1) {
      return "guess";
    } else {
      return "guesses";
    }
  };

  numberOfGuessesMessage.style.display = "";

  if (guess === targetNumber) {
    numberOfGuessesMessage.innerHTML = `You made ${attempts} ${guessOrGuesses(
      attempts
    )}`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
    return;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = "";
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessOrGuesses(
      remainingAttempts
    )} remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    maxGuessesMessage.style.display = "";
  }

  resetButton.style.display = "";
}

function hideAllMessages() {
  for (
    let elementIndex = 0; 
    elementIndex <= messages.length - 1; 
    elementIndex++
    ) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  // maxNumberOfAttempts = 5; //deleted line as it declined on line 15th
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false; // corrected spell
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
