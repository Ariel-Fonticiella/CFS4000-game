//Start Screen
var gameStarted = false;

//Direction Pad Variables
var rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    spaceKey = false;

//Our Character
var character = {
  x: 590,
  y: 430,
  width: 100,
  height: 190,
};


//Using the clearRect function, we set it to clear the entire canvas.
function clearCanvas() {
  ctx.clearRect(0,0,width,height);
}


//Click on Canvas to Start the game.
function gameStart() {
  gameStarted = true;
  canvas.removeEventListener('click', gameStart, false);
}

//We use drawCharacter function then set the fillStyle to green and use
//fillRect to set the Character’s x and y positions and it’s width and height.
function drawCharacter() {

  if (character.x <= 0) character.x = 0;
  if ((character.x + character.width) >= width) character.x = width - character.width;
  if (rightKey) character.x += 5; // Is the Left or Right key pressed? If so, move 8px in that direction.
    else if (leftKey) character.x -= 5;
    // ctx.fillStyle = '#0f0';
    // ctx.fillRect(character.x, character.y, character.width, character.height);
    ctx.drawImage(player, character.x, character.y, character.width, character.height);
  }

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
  canvas.addEventListener('click', gameStart, false);
  player = new Image();
  player.src = './images/Kitten-Life1.png';
  gameLoop();
}

function gameLoop() {
    clearCanvas();
    if (alive && gameStarted && lives > 0) {
    hitTest();
    moveLaser();
    moveEnemies();
    drawEnemy();
    drawCharacter();
    drawLaser();
    characterCollision();
    }
    scoreTotal();
    requestAnimationFrame(gameLoop);
}

/* Checking which key is being pressed: is it one of the arrow keys or W.A.S.D?
Then we change the corresponding variable to true and when that button is
released, we change the variable back to false. */
function keyDown(e) {

  if (e.keyCode === 39 || e.keyCode === 68) rightKey = true;
    else if (e.keyCode === 37 || e.keyCode === 65) leftKey = true;


  if (e.keyCode === 88 && lasers.length < laserTotal)
      lasers.push([character.x + 70, character.y - 2, 4, 20]);
      // lasers.push(IndividualLaser());
}

function keyUp(e) {
  if (e.keyCode === 39 || e.keyCode === 68) rightKey = false;
    else if (e.keyCode === 37 || e.keyCode === 65) leftKey = false;
}

window.onload = init;
