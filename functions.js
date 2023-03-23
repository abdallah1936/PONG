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
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();

  // player 2 paddle
  ctx.beginPath();
  ctx.rect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
  ctx.fillStyle = "white";
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
// I looked up a diffrant way to make the  code look a little bit cleaner and easier to read
function keyDownHandler(e) {
    switch(e.keyCode){
     case 87:  // W key
        player1Y -= paddleSpeed
        break
      case 83: // S key
        player1Y += paddleSpeed
        break
      case 38: // up arrow
        player2Y -= paddleSpeed
        break
      case 40: // down arrow
        player2Y += paddleSpeed
        break
      default:
        break
    }
//   if (e.keyCode == 87) { // W key
//     player1Y -= paddleSpeed;
//   }
//   else if (e.keyCode == 83) { // S key
//     player1Y += paddleSpeed;
//   }
//   else if (e.keyCode == 38) { // up arrow
//     player2Y -= paddleSpeed;
//   }
//   else if (e.keyCode == 40) { // down arrow
//     player2Y += paddleSpeed;
//   }
}

// reset the position and direction of the ball
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.floor(Math.random() * 10) -1; //returns a floating-point, pseudo-random number that's greater than or equal to 0 and less than 1, with approximately uniform distribution over that range
}
// a message the displayes after someone wins
function displayWinner(winner) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(players[winner] + " wins!", canvas.width / 2 - 50, canvas.height - 50);
  }

// check if either player has won the game
function checkScore() {
    if (player1Score >= winningScore) {
      winner = "Player 1";
    } else if (player2Score >= winningScore) {
      winner = "Player 2";
    }
}

// update the position of the ball
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    //collistion detection
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
      incrementScore(2)
      resetBall();
    } else if (ballX + ballRadius > canvas.width) {
      incrementScore(1)
      resetBall();
    }
}
// every time someone score's it goes up by one as long as the game is not over
function incrementScore(player) {
  if(!gameOver){
    if (player === 1) {
        player1Score++;
        document.getElementById("player1Score").textContent = player1Score; // testing
    } else {
        player2Score++;
        document.getElementById("player2Score").textContent = player2Score; // testing
    }
    if (player1Score >= winningScore || player2Score >= winningScore) {
      endGame(player);
    }
  }
}
// end the game after someone reaches 6 points and displating the message
function endGame(winner) {
  document.getElementById("winnerName").textContent = players[winner -= 1];
  document.getElementById("winnerBox").style.display = "block";
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
  displayWinner(winner)
  drawScore()
  clearInterval(gameLoop);
  gameOver = true
}
// reseting the game to its orignal state so another game could be played
function resetGame() {
    gameOver = false
  player1Score = 0;
  player2Score = 0;
  document.getElementById("player1Score").textContent = player1Score;
  document.getElementById("player2Score").textContent = player2Score;
  document.getElementById("winnerBox").style.display = "none";
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
  });
gameLoop = setInterval(draw, 10);
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