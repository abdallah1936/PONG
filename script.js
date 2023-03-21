// initialize the canvas and context
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// set the starting position and size of the ball
let ballX = canvas.width / 4;
let ballY = canvas.height / 4;
let ballRadius = 10;

// set the speed and direction of the ball
let ballSpeedX = 1;
let ballSpeedY = 1;

// set the position and size of the paddles
let paddleHeight = 150;
let paddleWidth = 12;
let paddleSpeed = 50;
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;
// we are assuming canvas.height represents the height of the HTML canvas element and paddleHeight represents the height of the paddle, we calculates the vertical position for the top edge of each paddle such that they are both vertically centered on the canvas.

// define the score properties
let player1Score = 0;
let player2Score = 0;
let winningScore = 6;

// draw the ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2); // 0 and Math.PI * 2 represent the starting and ending angles of the circle.
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath(); //add a straight line from the current point to the start of the current sub-path.
}

// draw the paddles on the canvas
function drawPaddles() {

  // player 1 paddle
  ctx.beginPath();
  ctx.rect(0, player1Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();

  // player 2 paddle
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

// draw the score so its visable
function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "red";
  ctx.fillText(player1Score + " - " + player2Score, canvas.width / 2 - 40, 50);
}

// handle the key presses for moving the paddles
function keyDownHandler(e) {
  if (e.keyCode == 87) { // W key
    player1Y -= paddleSpeed;
  }
  else if (e.keyCode == 83) { // S key
    player1Y += paddleSpeed;
  }
  else if (e.keyCode == 38) { // up arrow
    player2Y -= paddleSpeed;
  }
  else if (e.keyCode == 40) { // down arrow
    player2Y += paddleSpeed;
  }
}

// reset the position and direction of the ball
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.floor(Math.random() * 10) -1; //returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1, with approximately uniform distribution over that range
}

function checkScore() {
    // check if either player has won the game
    if (player1Score >= winningScore) {
      winner = "Player 1";
      clearInterval(gameLoop); // stop the game loop
    } else if (player2Score >= winningScore) {
      winner = "Player 2";
      clearInterval(gameLoop); // stop the game loop
    }
  }
  // set the game loop
let gameLoop = setInterval(draw, 10);
  
  // update the position of the ball
  function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    // check if the ball hit the top or bottom of the canvas
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
      ballSpeedY = -ballSpeedY;
    }
  
    // check if the ball hit the left or right paddle
    if (
      ballX - ballRadius < paddleWidth &&
      ballY > player1Y &&
      ballY < player1Y + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (player1Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    } else if (
      ballX + ballRadius > canvas.width - paddleWidth &&
      ballY > player2Y &&
      ballY < player2Y + paddleHeight
    ) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (player2Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    }
  
    // check if the ball went out of bounds and update score
    if (ballX - ballRadius < 0) {
      player2Score++;
      checkScore();
      resetBall();
    } else if (ballX + ballRadius > canvas.width) {
      player1Score++;
      checkScore();
      resetBall();
    }
  }

// draw the game on the canvas
function draw() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw the ball, paddles, and score
  drawBall();
  drawPaddles();
  drawScore();
  
  

  // update the position of the ball and paddles
  moveBall();
}

// set the game loop
setInterval(draw, 10);

// listen for key presses to move the paddles
document.addEventListener("keydown", keyDownHandler, false);










// sorces 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/PI
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// https://blog.thejaytray.com/canvas-game-tutorial-pong/
// https://www.tutorialspoint.com/How-to-set-Heading-alignment-in-HTML#:~:text=To%20set%20the%20heading%20alignment,setting%20alignment%20for%20an%20element.