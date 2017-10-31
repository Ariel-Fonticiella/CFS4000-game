// Enemy Character

var enemy; // Enemy Ship

var enemyTotal = 11,// Total Number of enemies.
    enemies = [], // Array we’ll store our enemies in.
    enemy_x = 50, // Positioning of the first enemy.
    enemy_y = -45,// Positioning of the first enemy.
    enemy_w = 50, // Enemy Width.
    enemy_h = 50, // Enemy Height.
    speed = 3;    // Speed enemies move at.

// We use a for loop to add our enemies to our enemies array.
  for(var i = 0; i < enemyTotal; i++) {
    enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, speed]);
    enemy_x += enemy_w + 60;
  }   /*Increasing the x position of each enemy by 60
      in order to spread them out across the canvas.*/

//Drawing our Enemies
function drawEnemy() {
  for (var i = 0; i < enemies.length; i++) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(enemies[i][0], enemies[i][1], enemy_w, enemy_h);
  }
}

function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i][1] < height) {
      enemies[i][1] += enemies[i][4];
    } else if (enemies[i][1] > height - 1) {
      enemies[i][1] = -45;
    }
  }
}

//Laser Gun
var laserTotal = 100;
var lasers = [];

function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {
      ctx.fillStyle = '#f00';
      ctx.fillRect(lasers[i][0],lasers[i][1],lasers[i][2],lasers[i][3]);
    }
}

function moveLaser() {
  for (var i = 0; i < lasers.length; i++) {
    if (lasers[i][1] > -11) {
      lasers[i][1] -= 10;
    } else if (lasers[i][1] < -10) {
      lasers.splice(i, 1);
    }
  }
}

//Hit Test
function hitTest() {
  for (var i = 0; i < lasers.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (lasers[i][1] <= (enemies[j][1] + enemies[j][3]) && lasers[i][0] >= enemies[j][0] && lasers[i][0] <= (enemies[j][0] + enemies[j][2])) {

      }
    }
  }
}

function hitTest() {
  var remove = false;
  for (var i = 0; i < lasers.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (lasers[i][1] <= (enemies[j][1] + enemies[j][3]) && lasers[i][0] >= enemies[j][0] && lasers[i][0] <= (enemies[j][0] + enemies[j][2])) {
        remove = true;
        enemies.splice(j, 1);
        enemies.push([(Math.random() * 500) + 50, -45, enemy_w, enemy_h, speed]);
      }
    }
    if (remove == true) {
      lasers.splice(i, 1);
      remove = false;
    }
  }
}

// function EnemyCharacter(x, y, dx, dy, width, height) {
//   this.x = x;
//   this.y = y;
//   this.dx = dx;
//   this.dy = dy;
//   this.width = width;
//   this.height = height;
//
//   var enemyArray = [];
//   this.drawEnemyCharacter = function() {
//
//
//
//     for (var i = 0; i < enemyArray.length; i++) {
//       ctx.fillStyle = '#f00';
//       ctx.fillRect(this.enemyArray[i][0], this.enemyArray[i][1], this.width, this.height);
//       }
//     };
//
//     this.moveEnemies = function () {
//       for (var i = 0; i < this.enemyArray.length; i++) {
//         if (enemyArray[i][1] < this.height) {
//           enemyArray[i][1] += enemyArray[i][4];
//         } else if (enemyArray[i][1] > this.height - 1) {
//           enemyArray[i][1] = -45;
//         }
//       }
//
//       this.drawEnemyCharacter();
//     };
//   } //EnemyCharacter Object
//
// function init() {
//   enemyArray = [];
//
//   for(var i = 0; i < 10; i++) {
//     var x = Math.random() * (innerWidth);
//     var y = Math.random() * (innerHeight);
//     var dx = (Math.random() - 0.5) * 6;
//     var dy = (Math.random() - 0.5) * 6;
//     enemyArray.push(new EnemyCharacter (x, y, dx, dy, width, height));
//     x += width + 60;
//     }
// }
//
// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight
//         );
//
//     for (var i = 0; i < enemyArray.length; i++) {
//       enemyArray[i].update();
//     }
//
//   }
//
//   init();
//   animate();
//
