/* Direction Pad Variables */
var rightKey = false,
    leftKey = false,
    upKey = false,
    downKey = false,
    spaceKey = false;

/* Our Character */
var character = {
  x: (width / 2) - 55,
  y: height - 120,
  width: 50,
  height: 50,
};



/* Using the clearRect function, we set it to clear the entire canvas. */
function clearCanvas() {
  ctx.clearRect(0,0,width,height);
}

var player; //Our Ship

/* We use drawCharacter function then set the fillStyle to green and use
fillRect to set the Character’s x and y positions and it’s width and height. */
function drawCharacter() {
  if (rightKey) character.x += 5; // Is the Left or Right key pressed? If so, move 8px in that direction.
    else if (leftKey) character.x -= 5;
  if (upKey) character.y -= 5;// Is the Up or Down key pressed? If so, move 8px in that direction.
    else if (downKey) character.y += 5;
  if (spaceKey) character.y -= 10;// Is the Space key pressed? If so, move -10px in that direction.

  if (character.x <= 0) character.x = 0;
  if ((character.x + character.width) >= width) character.x = width - character.width;
  if (character.y <= 0) character.y = 0;
  if ((character.y + character.height) >= height) character.y = height - character.height;

  ctx.drawImage(player, character.x, character.y);
}

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  // enemy = new Image();
  // enemy.src = null;
  player = new Image();
  player.src = './images/Kitten-Download-PNG.png';
  gameLoop();
  document.addEventListener('keydown', keyDown, false);
  document.addEventListener('keyup', keyUp, false);
}/* Event listeners to listen for both keys being pressed down and keys being released. */

function gameLoop() {
  clearCanvas();
  hitTest();
  moveEnemies();
  moveLaser();
  drawLaser();
  drawEnemy();
  drawCharacter();
  requestAnimationFrame(gameLoop);
}

/* Checking which key is being pressed: is it one of the arrow keys or W.A.S.D?
Then we change the corresponding variable to true and when that button is
released, we change the variable back to false. */
function keyDown(e) {
  /* Directions Right/Left being pressed down */
  if (e.keyCode === 39 || e.keyCode === 68) rightKey = true;
    else if (e.keyCode === 37 || e.keyCode === 65) leftKey = true;
  /* Directions Up/Down being pressed down */
  if (e.keyCode === 38 || e.keyCode === 87) upKey = true;
    else if (e.keyCode === 40 || e.keyCode === 83) downKey = true;
  /* Space bar being pressed down */
  if (e.keyCode === 32) spaceKey = true;
  /* If the x key is pressed and the # of lasers in the laser array
  is less than < totalLaser, then add a laser to our laser array */
  if (e.keyCode === 88 && lasers.length <= laserTotal)
    lasers.push([character.x + 70, character.y - 2, 4, 20]);
}

/* Sets up the movement of the Character when key is not preseed. */
function keyUp(e) {
  if (e.keyCode === 39 || e.keyCode === 68) rightKey = false;
    else if (e.keyCode === 37 || e.keyCode === 65) leftKey = false;
  if (e.keyCode === 38 || e.keyCode === 87) upKey = false;
    else if (e.keyCode === 40 || e.keyCode === 83) downKey = false;
  if (e.keyCode === 32) spaceKey = false;
}

window.onload = init;
