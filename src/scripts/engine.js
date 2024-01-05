const state = {
  views: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },
  values: {
  },
};

function moveEnemy() {
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function countdown() {
  state.values.timeLeft--;
  state.views.timeLeft.textContent = state.values.timeLeft;
  if(state.values.timeLeft <= 0) {
    clearInterval(state.actions.countdownId);
    clearInterval(state.actions.timerId);
    alert('Game Over! Your final score is ' + state.values.score);
  }
}

function randomSquare() {
  state.views.squares.forEach(s=>{s.classList.remove('enemy')});
  const randomSquare = state.views.squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitbox() {
  state.views.squares.forEach(s=>{
      s.addEventListener('click', () => {
        if (state.values.hitPosition === s.id) {
          state.values.hitPosition = null;
          s.classList.remove('enemy');
          state.values.score++;
          state.views.score.textContent = state.values.score;
          state.values.gameVelocity *= 0.9;
        }
      });
  });
}

function init() {
  state.values = {
    gameVelocity: 1000,
    timeLeft: 60,
    score: 0,
    isPlaying: false,
    hitPosition: null,
  };
  state.actions = {
    timerId: setInterval(randomSquare, state.values.gameVelocity),
    countdownId: setInterval(countdown, 1000),
  };
  addListenerHitbox();
}

init();