// Enemy Character
var enemyShip; // Enemy Ship

var enemyTotal = 8,
    enemies = [], // Array we’ll store our enemies in.
    enemy_x = 45, // Positioning of the first enemy.
    enemy_y = -45,// Positioning of the first enemy.
    enemy_w = 95, // Enemy Width.
    enemy_h = 90, // Enemy Height.
    speed = 4,    // Speed enemies move at.
    randomEnemyImages = ['images/rockoeyes.png', 'images/GoatClosedMouth.png', 'images/Renstimpy.png', 'images/showme.png', 'images/sunscream.png'];

function IndividualEnemy(enemy_x, enemy_y, enemy_w, enemy_h, speed) {
   this.enemy_x = enemy_x;
   this.enemy_y = enemy_y;
   this.enemy_w = enemy_w;
   this.enemy_h = enemy_h;
   this.speed = speed;
   this.randomEnemyImages = randomEnemyImages[Math.floor(Math.random() * randomEnemyImages.length)];
 }

      // We use a for loop to add our enemies to our enemies array.
     for(var i = 0; i < enemyTotal; i++) {
       enemies.push(new IndividualEnemy(enemy_x, enemy_y, enemy_w, enemy_h, speed));
       enemy_x += enemy_w + 60;
     }

  function drawEnemy() {
    for (var i = 0; i < enemies.length; i++) {
      var singleEnemy = enemies[i];
      var image = new Image();
      image.src = singleEnemy.randomEnemyImages;
      // ctx.fillStyle = '#0f0';
      // ctx.fillRect(singleEnemy.enemy_x, singleEnemy.enemy_y, singleEnemy.enemy_w, singleEnemy.enemy_h);
      ctx.drawImage(image, singleEnemy.enemy_x, singleEnemy.enemy_y, singleEnemy.enemy_w, singleEnemy.enemy_h);
    }
  } // drawEnemy

  function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
      var singleEnemy = enemies[i];
      if (singleEnemy.enemy_y < height) {
        singleEnemy.enemy_y += singleEnemy.speed;
      } else if (singleEnemy.enemy_y > height - 1) {
        singleEnemy.enemy_y = -45;
      }
    }
  } // moveEnemies()

//Laser Gun
var laserTotal = 5,
    lasers = [];

function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {

      // ctx.drawImage(laserImage, lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3]);
      ctx.fillStyle = '#f00';
      ctx.fillRect(lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3]);
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
// var laserTotal = 25,
//     lasers = [],
//     laser_x = (width / 2) - 55,
//     laser_y = height - 120,
//     laser_w = 95,
//     laser_h = 103,
//     randomLaserImage = ['images/pizza-shot.png'];
//
// //Creating Individual Laser Object
// function IndividualLaser(laser_x, laser_y, laser_w, laser_h) {
//     this.laser_x = laser_x;
//     this.laser_y = laser_y;
//     this.laser_w = laser_w;
//     this.laser_h = laser_h;
//     this.randomLaserImage = randomLaserImage[Math.floor(Math.random() * randomLaserImage.length)];
//     }
//       // We use a for loop to add our lasers to our lasers array.
//       for(var i = 0; i < laserTotal; i++) {
//         lasers.push(new IndividualLaser(laser_x, laser_y, laser_w, laser_h));
//     }
// //Drawing Laser on Canvas
// function drawLaser() {
//   if (lasers.length)
//     for (var i = 0; i < lasers.length; i++) {
//       var singleLaser = lasers[i];
//       laserImage = new Image();
//       laserImage.src = singleLaser.randomLaserImage;
//       ctx.drawImage(laserImage, singleLaser.laser_x, singleLaser.laser_y, singleLaser.laser_w, singleLaser.laser_h);
//       // ctx.fillStyle = '#0f0';
//       // ctx.fillRect(lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3]);
//     }
// }
//
// //Moving Laser on Canvas
// function moveLaser() {
//   for (var i = 0; i < lasers.length; i++) {
//     var singleLaser = lasers[i];
//     if (singleLaser.laser_y > -11) {
//       singleLaser.laser_y -= 10;
//     } else if (singleLaser.laser_y < -10) {
//       lasers.splice(i, 1);
//     }
//   }
// }

// Set up two loops, one for the Lasers and one for the Enemy Ships.
// Then we check the Position of each Laser against each Enemy Ship and if
// a Laser’s X Position is Greater than an Enemy Ship’s X Position and the
// Laser’s X Position is Less than the Enemy’s X Position + it’s Width,
// as well as if the Laser’s Y Position is Less than the Enemy’s Y Position
// + it’s Height. If all of those are true then it means that the Laser
// has HIT the Enemy Ship.

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

// //Hit Test
// function hitTest() {
//   var remove = false;
//   for (var i = 0; i < lasers.length; i++) {
//     for (var j = 0; j < enemies.length; j++) {
//       var singleEnemy = enemies[j];
//       var singleLaser = lasers[i];
//       if (singleLaser.laser_y <= (singleEnemy.enemy_y + singleEnemy.enemy_h) && singleLaser.laser_x >=
//       singleEnemy.enemy_x && singleLaser.laser_x <= (singleEnemy.enemy_x + singleEnemy.enemy_w)) {
//         remove = true;
//         enemies.splice(j, 1);
//         enemies.push(new IndividualEnemy ((Math.random() * 500) + 50, -45, enemy_w, enemy_h, speed));
//       }
//     }
//     if (remove === true) {
//       lasers.splice(i, 1);
//       score += 10;
//       remove = false;
//     }
//   }
// }

//Score
var score = 0;
var lives = 5;

function scoreTotal() {
  ctx.font = 'bold 30px Gloria Hallelujah';
  ctx.fillStyle = '#004696';
  ctx.fillText('Score: ', 1000, 31);
  ctx.fillText(score, 1100, 31);
  ctx.fillText('Lives:', 82, 31);
  ctx.fillText(lives, 180, 31);
  if (!gameStarted) {
  ctx.font = 'bold 70px Gloria Hallelujah';
  ctx.fillStyle = '#AF0064';
  ctx.fillText('SAVE US CAT!', 380, 150);
  ctx.font = 'bold 50px Gloria Hallelujah';
  ctx.fillStyle = '#55237D';
  ctx.fillText('CLICK ANYWHERE TO PLAY', 300, 250);
  ctx.fillStyle = '#D74B32';
  ctx.fillText('Use arrow keys to move', 355, height / 2 + 15);
  ctx.fillText('Use the x key to shoot', 365, height / 2 + 95);
}
  if (!alive) {
    window.location.href = './GameOver.html';
 }
}

// function continueButton(e) {
//  var cursorPos = getCursorPos(e);
//  if (cursorPos.x > 590 && cursorPos.x < (width / 2) + 47 && cursorPos.y > (height / 2) + 10 && cursorPos.y < (height / 2) + 50) {
//    alive = true;
//    lives = 3;
//    reset();
//    canvas.removeEventListener('click', continueButton, false);
//  }
// }

//holds the cursors position
// function cursorPosition(x,y) {
//   this.x = x;
//   this.y = y;
// }

//finds the cursor's position after the mouse is clicked
// function getCursorPos(e) {
//   var x;
//   var y;
//   if (e.pageX || e.pageY) {
//     x = e.pageX;
//     y = e.pageY;
//   } else {
//     x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//     y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
//   }
//   x -= canvas.offsetLeft;
//   y -= canvas.offsetTop;
//   var cursorPos = new cursorPosition(x, y);
//   return cursorPos;
// }

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
  character.x = 590;
  character.y = 480;
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

  // The for loop checks our ship against
  // every enemy in the enemies array.
for (var i = 0; i < enemies.length; i++) {
     var singleEnemy = enemies[i];


  if (character.x > singleEnemy.enemy_x && character.x < singleEnemy.enemy_x +
     singleEnemy.enemy_w && character.y > singleEnemy.enemy_y && character.y <
     singleEnemy.enemy_y + enemy_h) {
      checkLives();
  }
  if (character_xw < singleEnemy.enemy_x + singleEnemy.enemy_w &&
      character_xw > singleEnemy.enemy_x && character.y > singleEnemy.enemy_x &&
      character.y < singleEnemy.enemy_y + enemy_h) {
        checkLives();
  }
  if (character_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h &&
      ship_x > enemies[i][0] && ship_x < enemies[i][0] + enemy_w) {
        checkLives();
  }
  if (character_yh > singleEnemy.enemy_y && character_yh < singleEnemy.enemy_y + enemy_h &&
      character_xw < singleEnemy.enemy_x + enemy_w && character_xw > singleEnemy.enemy_x) {
        checkLives();
  }
}
}
//Collision Detection

// function characterCollision() {
//
//     // The for loop checks our ship against
//     // every enemy in the enemies array.
//   for (var i = 0; i < enemies.length; i++) {
      //  var singleEnemy = enemies[i];

  //      if ((singleEnemy.enemy_x + singleEnemy.enemy_w) >= character.x
  //          (singleEnemy.enemy_x) <= character.x + character.width &&
  //          (singleEnemy.enemy_y + singleEnemy.enemy_h) >= character.y &&
  //          (singleEnemy.enemy_y) <= (character.y + character.height)) {
  //            alive = false;console.log(alive);
  //  }

 // }

  //      if (getBottom(character) >= getTop(singleEnemy) &&
  //          getTop(character) <= getBottom(singleEnemy) &&
  //          getRight(character) >= getLeft(singleEnemy) &&
  //          getLeft(character) <= getRight(singleEnemy)) {
  //            alive = false;
  //       }
  //  }
  //     function getTop(character) {
  //       return character.x;
  //     }
   //
  //     function getBottom(singleEnemy) {
  //         console.log(alive + ' test1');
  //       return character.y + character.height;
  //     }
   //
  //     function getLeft(singleEnemy) {
  //       return singleEnemy.enemy_x;
  //     }
   //
  //     function getRight(singleEnemy) {
  //       console.log(alive + ' test2');
  //       return character.x + character.width;
  //     }

  // } //END characterCollision
