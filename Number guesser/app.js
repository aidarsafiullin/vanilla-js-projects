/*
    Game function:
    - player must guess a number between a min & max
    - player gets a certain amount of guesses
    - notify player of guesses remaining
    - notify the player of the correct answer if loose
    - let player choose to play again
*/

// game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI element
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
        console.log('1 :>> ', 1);
    }
    
})

// listen for guess

guessBtn.addEventListener('click', function () {
    console.log('2 :>> ', 2);
    let guess = parseInt(guessInput.value);

    // validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Пожалуйста введите число от ${min} до ${max}`, 'red');
    }

    // check if won
    if (guess === winningNum) {
        // game over - won

        gameOver(true, `Игра окончена, вы угадали :) Загаданное число - ${winningNum}`);

    } else {
        // wrong num
        guessesLeft -= 1;

        if (guessesLeft == 0) {
            // game over - lost

           gameOver(false, `Игра окончена, вы не угадали :( Загаданное число - ${winningNum}`)

        } else {
            // game continues - answer wrong

            guessInput.style.borderColor = 'red';

            // clear input
            guessInput.value = '';

            // tell user its the wrong num
            setMessage(`${guess} - промах, ${guessesLeft} попытки`, 'red');
        }
    }
});

// game over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disabled = true;
    // change border color
    guessInput.style.borderColor = color;

    // set message
    setMessage(msg, color);

    // play again?
    guessBtn.value = 'Играть снова';
    guessBtn.className += 'play-again';
}

// get winning num
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}