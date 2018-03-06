// Enemy Character
var enemyShip; // Enemy Avatar

var enemyTotal = 11,
    enemies = [], // Array we will store enemies in.
    enemy_x = 45, // Positioning of the first enemy.
    enemy_y = -45,// Positioning of the first enemy.
    enemy_w = 95, // Enemy Width.
    enemy_h = 90, // Enemy Height.
    speed = 5,    // Speed enemies move at.
    randomEnemyImages =
    ['images/rockoeyes.png',
     'images/Renstimpy.png',
     'images/showme.png',
     'images/sunscream.png',
     'images/bear.png',
     'images/bleeding.png',
     'images/bobby.png',
     'images/old.png',
     'images/sabrina.png',
     'images/morty.png',
     'images/rick.png',
     'images/stimpy.png',
     'images/skipit.png'];

function IndividualEnemy(enemy_x, enemy_y, enemy_w, enemy_h, speed) {
   this.enemy_x = enemy_x;
   this.enemy_y = enemy_y;
   this.enemy_w = enemy_w;
   this.enemy_h = enemy_h;
   this.speed = speed;
   this.randomEnemyImages = randomEnemyImages[Math.floor(Math.random() * randomEnemyImages.length)];
 }

      // We use a for loop to add enemies to our enemies array.
     for(var i = 0; i < enemyTotal; i++) {
       enemies.push(new IndividualEnemy(enemy_x, enemy_y, enemy_w, enemy_h, speed));
       enemy_x += enemy_w + 60;
     }

  function drawEnemy() {
    for (var i = 0; i < enemies.length; i++) {
      var singleEnemy = enemies[i];
      var image = new Image();
      image.src = singleEnemy.randomEnemyImages;
      ctx.drawImage(image, singleEnemy.enemy_x, singleEnemy.enemy_y, singleEnemy.enemy_w, singleEnemy.enemy_h);
    }
  }

  function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
      var singleEnemy = enemies[i];
      if (singleEnemy.enemy_y < height) {
        singleEnemy.enemy_y += singleEnemy.speed;
      } else if (singleEnemy.enemy_y > height - 1) {
        singleEnemy.enemy_y = -45;
      }
    }
  }

//Laser Gun
var laserTotal = 5,
    lasers = [];

function drawLaser() {
  if (lasers.length){
    for (var i = 0; i < lasers.length; i++) {
      ctx.fillStyle = '#f00';
      ctx.fillRect(lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3]);
    }
  }
}

function moveLaser() {
  for (var i = 0; i < lasers.length; i++) {
    // var singleLaser = lasers[i];
    if (lasers[i][1] > -11) {
      lasers[i][1] -= 10;
    } else if (lasers[i][1] < -10) {
      lasers.splice(i, 1);
    }
  }
}

function hitTest() {
  var remove = false;
  for (var i = 0; i < lasers.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      var singleEnemy = enemies[j];
      if (lasers[i][1] <= (singleEnemy.enemy_y + singleEnemy.enemy_h) && lasers[i][0] >=
      singleEnemy.enemy_x && lasers[i][0] <= (singleEnemy.enemy_x + singleEnemy.enemy_w)) {
        remove = true;
        enemies.splice(j, 1);
        enemies.push(new IndividualEnemy ((Math.random() * 500) + 50, -45, enemy_w, enemy_h, speed));
      }
    }
    if (remove === true) {
      lasers.splice(i, 1);
      score += 10;
      remove = false;
    }
  }
}

//Score
var score = 0;
var lives = 9;

var toasty = new Audio('Audio/TOASTY.mp3');
var onFire = new Audio('Audio/ONFIRE.mp3');
var boom = new Audio('Audio/BOOM.mp3');
var outstanding = new Audio('Audio/OUTSTANDING.mp3');
var heatingUp = new Audio('Audio/HEATINGUP.mp3');
var purple = new Audio('Audio/Purple.mp3');
var plums = new Audio('Audio/plums.mp3');
var watch = new Audio('Audio/watch.mp3');

function scoreTotal() {
  if(score === 50){
    boom.play();
    boom.pause();
    boom.currentTime = 0;
  } else if (score === 100){
    toasty.play();
  } else if (score === 300) {
    toasty.play();
  } else if (score === 450) {
    outstanding.play();
  } else if (score === 500) {
    heatingUp.play();
  } else if (score === 600) {
    watch.play();
  } else if (score === 700) {
    onFire.play();
  } else if (score === 900) {
    plums.play();
  }  else if (score === 1000)
    watch.play();

  ctx.font = 'bold 30px Gloria Hallelujah';
  ctx.fillStyle = '#004696';
  ctx.fillText('Score: ', 1490, 31);
  ctx.fillText(score, 1590, 31);
  ctx.fillText('Lives: ', 80, 31);
  ctx.fillText(lives, 180, 31);
  if (!gameStarted) {
  ctx.font = 'bold 70px Gloria Hallelujah';
  ctx.fillStyle = '#AF0064';
  ctx.fillText('SAVE US CAT!', 570, 250);
  ctx.font = 'bold 50px Gloria Hallelujah';
  ctx.fillStyle = '#55237D';
  ctx.fillText('CLICK ANYWHERE TO PLAY', 480, 350);
  ctx.fillStyle = '#D74B32';
  ctx.fillText('Use arrow keys to move', 515, height / 2 + 15);
  ctx.fillText('Use the x key to shoot', 525, height / 2 + 95);
}
  if (!alive) {
    window.location.href = './GameOver.html';
 }
}

function checkLives() {
  lives -= 1;
    if (lives > 0) {
      reset();
  } else if (lives === 0) {
    alive = false;
  }
 }

function reset() {
  var enemy_reset_x = 50;
  character.x = 750;
  character.y = 690;
  character.width = 100;
  character.height = 190;
  for (var i = 0; i < enemies.length; i++) {
    var singleEnemy = enemies[i];
    singleEnemy.enemy_x = enemy_reset_x;
    singleEnemy.enemy_y = -45;
    enemy_reset_x = enemy_reset_x + enemy_w + 60;
  }
 }

//Our Ship
var player;
var alive = true;

  function characterCollision() {


var character_xw = character.x + character.width,
    character_yh = character.y + character.height;

var hit1 = new Audio('Audio/Homer1.mp3');
var hit2 = new Audio('Audio/Homer2.mp3');

for (var i = 0; i < enemies.length; i++) {
     var singleEnemy = enemies[i];

  if (character.x > singleEnemy.enemy_x && character.x < singleEnemy.enemy_x +
     singleEnemy.enemy_w && character.y > singleEnemy.enemy_y && character.y <
     singleEnemy.enemy_y + enemy_h) {
       hit1.play();
       checkLives();
  }
  if (character_xw < singleEnemy.enemy_x + singleEnemy.enemy_w &&
      character_xw > singleEnemy.enemy_x && character.y > singleEnemy.enemy_x &&
      character.y < singleEnemy.enemy_y + enemy_h) {
        hit2.play();
        checkLives();
  }
  if (character_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h &&
      ship_x > enemies[i][0] && ship_x < enemies[i][0] + enemy_w) {
        hit1.play();
        checkLives();
  }
  if (character_yh > singleEnemy.enemy_y && character_yh < singleEnemy.enemy_y + enemy_h &&
      character_xw < singleEnemy.enemy_x + enemy_w && character_xw > singleEnemy.enemy_x) {
        hit2.play();
        checkLives();
  }
}
}
