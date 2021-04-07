'use strict';
//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

let scores, currentScore, activeplayer, playing;
// Starting Conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btn_roll.addEventListener('click', function () {
  if (playing) {
    //generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //Displaying dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for roll 1.
    if (dice !== 1) {
      //add dice into current score
      currentScore += dice;
      document.getElementById(
        `current--${activeplayer}`
      ).textContent = currentScore;
    } else {
      //if dice===1 than switch player
      switchPlayer();
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (playing) {
    //1.add current score to active player's total score
    scores[activeplayer] += currentScore;
    document.getElementById(
      `score--${activeplayer}`
    ).textContent = currentScore;
    //2.Check if player score >=100
    if (scores[activeplayer] >= 100) {
      //finish the  game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    }
    //Switch to next player
    switchPlayer();
  }
});
btn_new.addEventListener('click', init);
