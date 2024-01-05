const DEFAULT_GAME_VELOCITY = 1000;
const DEFAULT_TIME_LEFT = 6;
const DEFAULT_SCORE = 0;
const DEFAULT_LIVES = 3;

const state = {
  views: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    lives: document.querySelector('#lives'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    audio: document.querySelector('audio'),
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
  if(state.values.timeLeft < 0) {
    state.values.lives--;
    state.views.lives.textContent = state.values.lives;
    if(state.values.lives < 0) {
      clearInterval(state.actions.countdownId);
      clearInterval(state.actions.timerId);
      alert('Game Over! Your final score is ' + state.values.score);
      state.values.lives = DEFAULT_LIVES;
      state.views.lives.textContent = state.values.lives;
      state.values.score = 0;    
      state.views.score.textContent = state.values.score;
      state.values.timeLeft = DEFAULT_TIME_LEFT;
      state.views.timeLeft.textContent = state.values.timeLeft;
      state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
      state.actions.countdownId = setInterval(countdown, DEFAULT_GAME_VELOCITY);
    }
    else {
      state.values.timeLeft = DEFAULT_TIME_LEFT;
      state.views.timeLeft.textContent = state.values.timeLeft;
      state.values.gameVelocity = DEFAULT_GAME_VELOCITY;
    }
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
          playAudio();
        }
      });
  });
}

function playAudio() {
  state.views.audio.volume = 0.3;
  state.views.audio.play();
}

function init() {
  state.values = {
    gameVelocity: DEFAULT_GAME_VELOCITY,
    timeLeft: DEFAULT_TIME_LEFT,
    score: 0,
    hitPosition: null,
    lives: DEFAULT_LIVES,
  };
  state.actions = {
    timerId: setInterval(randomSquare, state.values.gameVelocity),
    countdownId: setInterval(countdown, DEFAULT_GAME_VELOCITY),
  };
  addListenerHitbox();
}

init();