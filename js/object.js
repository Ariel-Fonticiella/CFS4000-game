// Enemy Character
var enemyShip; // Enemy Ship

var enemyTotal = 10,
    enemies = [], // Array we’ll store our enemies in.
    enemy_x = 150, // Positioning of the first enemy.
    enemy_y = -45,// Positioning of the first enemy.
    enemy_w = 95, // Enemy Width.
    enemy_h = 90, // Enemy Height.
    speed = 3,    // Speed enemies move at.
    randomEnemyImages = ['images/Kitten-Life1.png'];
    laserImageLoc = ['images/pizza-shot.png'];

var laserImage = new Image();
laserImage.src = laserImageLoc;


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
       enemy_x += enemy_w + 100;
}

  function drawEnemy() {
    for (var i = 0; i < enemies.length; i++) {
      var singleEnemy = enemies[i];
      var image = new Image();
      image.src = singleEnemy.randomEnemyImages;
      ctx.fillStyle = '#0f0';
      ctx.fillRect(singleEnemy.enemy_x, singleEnemy.enemy_y, singleEnemy.enemy_w, singleEnemy.enemy_h);
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
    lasers = [],
    
    laser_w = 50,
    laser_h = 50;

function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {

      ctx.drawImage(laserImage, lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3]);
      // ctx.fillStyle = '#f00';
      //  ctx.fillRect(lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3]);
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

// Set up two loops, one for the Lasers and one for the Enemy Ships.
// Then we check the Position of each Laser against each Enemy Ship and if
// a Laser’s X Position is Greater than an Enemy Ship’s X Position and the
// Laser’s X Position is Less than the Enemy’s X Position + it’s Width,
// as well as if the Laser’s Y Position is Less than the Enemy’s Y Position
// + it’s Height. If all of those are true then it means that the Laser
// has HIT the Enemy Ship.

//Hit Test
function hitTest() {
  for (var i = 0; i < lasers.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      var singleEnemy = enemies[j];
      if (lasers[i][1] <= (singleEnemy.enemy_y + singleEnemy.enemy_h) &&
      lasers[i][0] >= singleEnemy.enemy_x && lasers[i][0] <=
      (singleEnemy.enemy_x + singleEnemy.enemy_w)) {

      }
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

function scoreTotal() {
  ctx.font = 'bold 18px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText('Score: ', 1000, 31);
  ctx.fillText(score, 1100, 31);
  if (!alive) {
  ctx.fillText('Game Over!', 900, height / 2);
  }
}

//Our Ship
var player;
var alive = true;

//Collision Detection
function characterCollision() {
    //  These two variables find us the top right and
    //  bottom right corners of the ship by adding the
    //  X position to the Width of the ship and the y
    //  position to the height.
  var character_xw = character.x + character.width,
      character_yh = character.y + character.height;

    // The for loop checks our ship against
    // every enemy in the enemies array.
  for (var i = 0; i < enemies.length; i++) {
       var singleEnemy = enemies[i];

  //Checks to see if the player is touching any of the enemies:
    //  If the Character’s X Position is Greater than the Enemy’s X Position
    //  but less than its X Position + its Width & its Y Position is Greater than
    //  the Enemy’s Y Position but Less than the Enemy’s Y Position + it’s
    //  Height, then it’s a hit.

    if (character.x > singleEnemy.enemy_x && character.x < singleEnemy.enemy_x +
       singleEnemy.enemy_w && character.y > singleEnemy.enemy_y && character.y <
       singleEnemy.enemy_y + enemy_h) {
         alive = false; //When the ship hits an enemy, alive will be set to false.
    }
    if (character_xw < singleEnemy.enemy_x + singleEnemy.enemy_w &&
        character_xw > singleEnemy.enemy_x && character.y > singleEnemy.enemy_x &&
        character.y < singleEnemy.enemy_y + enemy_h) {
          alive = false;
    }
    if (character_yh > enemies[i][1] && ship_yh < enemies[i][1] + enemy_h &&
        ship_x > enemies[i][0] && ship_x < enemies[i][0] + enemy_w) {
          alive = false;
    }
    if (character_yh > singleEnemy.enemy_y && character_yh < singleEnemy.enemy_y + enemy_h &&
        character_xw < singleEnemy.enemy_x + enemy_w && character_xw > singleEnemy.enemy_x) {
          alive = false;
    }
  }
}
