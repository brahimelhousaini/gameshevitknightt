
const playerTank = document.getElementById('player-tank');
const rocketAudio = document.getElementById('rocket-audio');
const collisionAudio = document.getElementById('collision-audio');
const explosionAudio = document.getElementById('explosion-audio');
let rocketAngle = 0;
document.addEventListener('mousemove', function(event) {
  const x = event.clientX;
  const y = event.clientY;

  const tankCenterX = playerTank.offsetLeft + playerTank.offsetWidth / 2;
  const tankCenterY = playerTank.offsetTop + playerTank.offsetHeight / 2;
  const deltaX = x - tankCenterX;
  const deltaY = y - tankCenterY;
  rocketAngle = Math.atan2(deltaY, deltaX) * (15 / Math.PI);

  playerTank.style.left = (x - playerTank.offsetWidth / 2) + 'px';
  playerTank.style.top = (y - playerTank.offsetHeight / 2) + 'px';
});
document.addEventListener('mousedown', function(event) {
  if (event.button === 0) {
    event.preventDefault();
    const rocket = document.createElement('div');
    rocket.classList.add('rocket');
    rocket.style.left = (playerTank.offsetLeft + playerTank.offsetWidth / 2) + 'px';
    rocket.style.top = (playerTank.offsetTop + playerTank.offsetHeight / 2) + 'px';
    rocket.style.transform = `rotate(${rocketAngle}deg)`;
    document.body.appendChild(rocket);
    rocketAudio.currentTime = 0;
    rocketAudio.play();
    const rocketInterval = setInterval(function() {
      const rocketSpeed = 15;
      const radians = rocketAngle * (Math.PI / 360);
      const deltaX = Math.cos(radians) * rocketSpeed;
      const deltaY = Math.sin(radians) * rocketSpeed;
      rocket.style.left = (rocket.offsetLeft + deltaX) + 'px';
      rocket.style.top = (rocket.offsetTop + deltaY) + 'px';
      const cars = document.getElementsByClassName('car');
      for (let i = 0; i < cars.length; i++) {
        const car = cars[i];
        if (isCollision(rocket, car)) {
          clearInterval(rocketInterval);
          document.body.removeChild(rocket);
          carContainer.removeChild(car);
          explosionAudio.currentTime = 0;
          explosionAudio.play();
          updateScore(1); 
          showExplosion(car.offsetLeft, car.offsetTop);
          break;
        }
      }
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      if (
        rocket.offsetLeft < 0 ||
        rocket.offsetTop < 0 ||
        rocket.offsetLeft > screenWidth ||
        rocket.offsetTop > screenHeight
      ) {
        clearInterval(rocketInterval);
        document.body.removeChild(rocket);
      }
    }, 10);
  }
});
 document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini"; document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini"; document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini"; document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
function isCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}
const carContainer = document.getElementById('game-container');
const carSpeed = 3;
function createCar() {
  const car = document.createElement('div');
  car.classList.add('car');
  car.style.left = '1000%';
  car.style.top = `${Math.random() * (window.innerHeight - 60)}px`;
  carContainer.appendChild(car);

  const carInterval = setInterval(function() {
    const currentLeft = parseInt(car.style.left);
    if (currentLeft < -100) {
      clearInterval(carInterval);
      carContainer.removeChild(car);
    } else {
      car.style.left = `${currentLeft - carSpeed}px`;
      if (isCollision(playerTank, car)) {
        clearInterval(carInterval);
        carContainer.removeChild(car);
        explosionAudio.currentTime = 0;
        explosionAudio.play();
        showExplosion(playerTank.offsetLeft, playerTank.offsetTop);
        shakeGameContainer();
        resetGame();
      }
    }
  }, 10);
}
setInterval(createCar, 2000);
document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
let time = 0;
let score = 0;
let round = 1;

function updateTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `الوقت: ${time} `;
  time++;
}
function updateScore(points) {
  score += points;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `الوقت: ${score}`;
}
function resetGame() {
  const scoreTable = document.getElementById('score-table-body');
  const scoreTableRow = document.createElement('tr');
  const roundCell = document.createElement('td');
  const scoreCell = document.createElement('td');
  const timeCell = document.createElement('td');
  roundCell.textContent = round++;
  scoreCell.textContent = score;
  timeCell.textContent = `${time}`;
  scoreTableRow.appendChild(roundCell);
  scoreTableRow.appendChild(scoreCell);
  scoreTableRow.appendChild(timeCell);
  scoreTable.appendChild(scoreTableRow);
  const scoreTableElement = document.getElementById('score-table');
  scoreTableElement.style.display = 'table';
  time = 0;
  score = 0;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `النقاط: ${score}`;
}
setInterval(updateTimer, 1000);
function shakeGameContainer() {
  const gameContainer = document.getElementById('game-container');
  gameContainer.classList.add('shake');
  setTimeout(function() {
    gameContainer.classList.remove('shake');
  }, 500);
}
function showExplosion(left, top) {
  const explosion = document.createElement('div');
  explosion.classList.add('explosion');
  explosion.style.left = left + 'px';
  explosion.style.top = top + 'px';
  document.body.appendChild(explosion);
  setTimeout(function() {
    document.body.removeChild(explosion);
  }, 500);
}
document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini"; document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
function createNewCar() {
  const newCar = document.createElement('div');
  newCar.classList.add('new-car');
  newCar.style.left = '1000%';
  newCar.style.top = `${Math.random() * (window.innerHeight - 60)}px`;
  carContainer.appendChild(newCar);

  const newCarInterval = setInterval(function() {
    const currentLeft = parseInt(newCar.style.left);
    if (currentLeft < -100) {
      clearInterval(newCarInterval);
      carContainer.removeChild(newCar);
    } else {
      newCar.style.left = `${currentLeft - carSpeed * 3}px`;
      if (isCollision(playerTank, newCar)) {
        clearInterval(newCarInterval);
        carContainer.removeChild(newCar);
        explosionAudio.currentTime = 0;
        explosionAudio.play();
        showExplosion(playerTank.offsetLeft, playerTank.offsetTop);
        shakeGameContainer();
        resetGame();
      }
    }
  }, 10);
}
setInterval(createNewCar, 2000);
function changeBackground(backgroundClassName) {
  const body = document.body;
  body.className = backgroundClassName;
}
function increaseCarSpeed() {
  carSpeed += 1;
}
function checkLevelCondition() {
  if (score === 10) {
    changeBackground('background2');
    increaseCarSpeed();
  } else if (score === 20) {
    changeBackground('background3');
    increaseCarSpeed();
  }
}
function updateScore(points) {
  score += points;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `: ${score}`;
  checkLevelCondition(); 
}
function changeBackground(backgroundClassName) {
  const body = document.body;
  body.className = backgroundClassName;
}
function increaseCarSpeed() {
  carSpeed += 10;
}
function checkLevelCondition() {
  if (score === 50) {
    changeBackground('background2');
    increaseCarSpeed();
  } else if (score === 100) {
    changeBackground('background3');
    increaseCarSpeed();
  } else if (score === 150) {
    changeBackground('background4');
    increaseCarSpeed();
  }
}
function updateScore(points) {
  score += points;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `النقاط: ${score}`;
  checkLevelCondition(); 
}
document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
function checkLevelCondition() {
  if (score === 50) {
    changeBackground('background2');
    increaseCarSpeed();
  } else if (score === 100) {
    changeBackground('background3');
    increaseCarSpeed();
  } else if (score === 150) {
    changeBackground('background4');
    increaseCarSpeed();
  } else if (score === 200) {
    changeBackground('background5');
    increaseCarSpeed();
  } else if (score === 250) {
    changeBackground('background6');
    increaseCarSpeed();
  }
}
document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
function createBonus1() {
  const bonus = document.createElement('div');
  bonus.classList.add('bonus');
  bonus.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  bonus.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  document.body.appendChild(bonus);
function showExplosionImage() {
  const explosionImage = document.createElement('img');
  explosionImage.src = 'd93e1b7bdc76130.png';
  explosionImage.classList.add('explosion-image');
  document.body.appendChild(explosionImage);
  setTimeout(function() {
    document.body.removeChild(explosionImage);
  }, 10);
}
function updateScore(points) {
  score += points;
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `النقاط: ${score}`;
  checkLevelCondition(); 
  if (score === 100) {
    showExplosionImage();
  }
}
document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
  const bonusInterval = setInterval(function() {
    if (isCollision(playerTank, bonus)) {
      document.body.removeChild(bonus);
      updateScore(45);
      clearInterval(bonusInterval);
    }
  }, 10);
}

function createBonus2() {
  const bonus = document.createElement('div');
  bonus.classList.add('bonus2');
  bonus.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  bonus.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  document.body.appendChild(bonus);

  const bonusInterval = setInterval(function() {
    if (isCollision(playerTank, bonus)) {
      document.body.removeChild(bonus);
      updateScore(50); 
      clearInterval(bonusInterval);
    }
  }, 10000000);
}
setTimeout(createBonus1, 10000); 
setTimeout(createBonus2, 20000);


function createBonus1() {
  const bonus = document.createElement('div');
  bonus.classList.add('bonus');
  bonus.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  bonus.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  document.body.appendChild(bonus);

  const bonusInterval = setInterval(function() {
    if (isCollision(playerTank, bonus)) {
      document.body.removeChild(bonus);
      updateScore(15);
      playSound('Cinematic Whoosh Hit - Royalty Free Sound Effect(MP3_160K).mp');
      clearInterval(bonusInterval);
    }
  }, 100);
}
function createBonus2() {
  const bonus = document.createElement('div');
  bonus.classList.add('bonus2');
  bonus.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  bonus.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  document.body.appendChild(bonus);
  const bonusInterval = setInterval(function() {
    if (isCollision(playerTank, bonus)) {
      document.body.removeChild(bonus);
       updateScore(50);
       playSound('موسيقى مونتاج خرافية(MP3_160K).mp3');
      clearInterval(bonusInterval);
    }
  }, 100000000000000000000000000000000)
}
function playBonus2Sound() {
  const bonus2Sound = new Audio('Cinematic Whoosh Hit - Royalty Free Sound Effect(MP3_160K).mp3');
  bonus2Sound.play();
  bonus2Sound.onended = function() {
    playBonus2Sound();
  };
}
function activateBoost() {
  playBonus2Sound();
}
function playSound(soundFileName) {
  const sound = new Audio(soundFileName);
  sound.play();
}
function createCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  coin.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  document.body.appendChild(coin);
  const coinInterval = setInterval(function() {
    if (isCollision(playerTank, coin)) {
      document.body.removeChild(coin);
      updateScore(10);
      playCoinSound();
      clearInterval(coinInterval);
    }
  }, 10);
}
function playCoinSound() {
  const sound = new Audio('Success_ win sound effect(MP3_160K).mp3');
  sound.play();
}
setInterval(createCoin, 9000);
let isBoosting = false; 
function createPowerUp() {
  const powerUp = document.createElement('div');
  powerUp.classList.add('power-up');
  powerUp.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  powerUp.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  document.body.appendChild(powerUp);
  const powerUpInterval = setInterval(function() {
    if (isCollision(playerTank, powerUp)) {
      document.body.removeChild(powerUp);
      activateBoost(); 
      clearInterval(powerUpInterval);
    }
  }, 10);
}
function activateBoost() {
  isBoosting = true;
  playerSpeed += 2000; 
  setTimeout(deactivateBoost, 5000); 
}
function deactivateBoost() {
  isBoosting = false;
  playerSpeed -= 2; 
}
setInterval(createPowerUp, 10000); 
document.getElementById("welcome-text").innerText = "All Rights Reserved ©ibrahim elhousaini";
const gameMusic = document.getElementById('game-music');

function playMusic() {
  gameMusic.play();
}
function stopMusic() {
  gameMusic.pause();
}
playMusic();



