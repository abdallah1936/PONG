// initialize the canvas and context
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

// set the starting position and size of the ball
let ballX = canvas.width / 4;
let ballY = canvas.height / 4;
let ballRadius = 10;

// set the speed and direction of the ball
let ballSpeedX =1.5;
let ballSpeedY = 1.5;

// set the position and size of the paddles
let paddleHeight = 100;
let paddleWidth = 10;
let paddleSpeed = 40;
let player1Y = (canvas.height - paddleHeight) / 2;
let player2Y = (canvas.height - paddleHeight) / 2;

// define the score properties
let player1Score = 0;
let player2Score = 0;
let winningScore = 6;

// draw the ball on the canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2); // to get the circumferance of the circle and its diameter
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath(); //add a straight line from the current point to the start of the current sub-path.
}

// draw the paddles on the canvas
function drawPaddles() {
  // player 1 paddle
  ctx.beginPath();
  ctx.rect(0, player1Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  // player 2 paddle
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

// draw the score on the canvas
function drawScore() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
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
  ballSpeedY = Math.floor(Math.random() * 10) - 5; //returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1, with approximately uniform distribution over that range
}


// update the position of the ball
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // check if the ball hit the top or bottom of the canvas
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

