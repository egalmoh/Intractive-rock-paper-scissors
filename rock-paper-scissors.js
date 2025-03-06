let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

/*
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0 
    }
}
*/

let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if (!isAutoPlaying) {
        document.querySelector('.text').innerHTML = 'Stop Playing';
        intervalId = setInterval(function() {
            const playerMove = pickComputerMove();
            playGame(playerMove)
        }, 1000)    
        isAutoPlaying = true;
    } else {
        document.querySelector('.text').innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

document.querySelector('.js-rock-bt')
    .addEventListener('click', () => {
        playGame('✊');
    });

document.querySelector('.js-paper-bt')
    .addEventListener('click', () => {
        playGame('✋');
    });

document.querySelector('.js-scissors-bt')
    .addEventListener('click', () => {
        playGame('✌️');
    });

document.querySelector('#auto')
    .addEventListener('click', () => {
        autoPlay();
    });

document.querySelector('.reset')
    .addEventListener('click', () => {
        checkDelete()
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('✊');
    } else if (event.key === 'p') {
        playGame('✋');
    } else if (event.key === 's') {
        playGame('✌️');
    } else if (event.key === 'a') {
        autoPlay();
    } else if (event.key === 'Backspace') {
        checkDelete()
    }
});

function checkDelete() {
    document.querySelector('#info').innerHTML = `
        Are you sure, you want to reset the score?
        <button class="yes">Yes</button>
        <button class="no">No</button> 
    `
    document.querySelector('.yes').addEventListener('click', ()=>{
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        
        localStorage.removeItem('score');
        document.querySelector('#info').innerHTML = '';
    });

    document.querySelector('.no').addEventListener('click', ()=>{
        document.querySelector('#info').innerHTML = '';
    })
}

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    const p_text = document.getElementById('para-text');
    let wins = document.getElementById('wins');
    let losses = document.getElementById('losses');
    let ties = document.getElementById('ties')

    let result = '';

    if (playerMove === '✊') {
        
        if (computerMove === '✊'){
            result = 'Tie.';
        } else if (computerMove === '✋'){
            result = 'You lose.';
        } else if (computerMove === '✌️'){
            result = 'You win.';
        }
    } else if (playerMove === '✋'){
        
        if (computerMove === '✋'){
            result = 'Tie.';
        } else if (computerMove === '✊'){
            result = 'You win.';
        } else if (computerMove === '✌️'){
            result = 'You lose.';
        }
    } else if (playerMove === '✌️'){
        
        if (computerMove === '✌️'){
            result = 'Tie.';
        } else if (computerMove === '✋'){
            result = 'You win.';
        } else if (computerMove === '✊'){
            result = 'You lose.';
        }
    }

    if (result === "You win."){
        score.wins++;
    } else if (result === "You lose."){
        score.losses++;
    } else if (result === "Tie."){
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score))

    wins.innerHTML = `Wins: ${score.wins}`;
    losses.innerHTML = `Losses: ${score.losses}`;
    ties.innerHTML = `Ties: ${score.ties}`;
    
    p_text.innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}. ${result}`;
}


function pickComputerMove() {
    const randomNumber = Math.random();
    console.log(randomNumber)
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3){
        computerMove = '✊';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = '✋';
    } else if (randomNumber >= 2/3 && randomNumber < 1){
        computerMove = '✌️'
    }

    return computerMove
}
