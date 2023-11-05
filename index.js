// REVIEW - This is the classic Nokia style snake game from the first massively popular nokia phones. This is a basic implementation using vanilla javascript. 

let gameSpace = document.getElementById("gamespace")
let gameStatus = false;
let boardSizeSmall = 10;
let boardSizeMedium = 25; 
let boardSizeLarge = 30;
let selectedBoardSize = boardSizeMedium;
//NOTE - initial snake position
let snakeArray = [44 , 45, 46];
let awardArray = [];
let lastMove;
let squareCounter = 1;
let currentScore = 0; 

let URL = "https://6547b4c7902874dff3acaa5e.mockapi.io/highscores";

//NOTE API call to get high scores
function getHighScores() {
  try {
  fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let highScore = document.createElement("div");
    let br = document.createElement("br");
    highScore.appendChild(br);
    highScore.setAttribute("id", "highscore");
    highScore.setAttribute("class", "score pixel-font");
    highScore.innerHTML = `High Score: ${data[0].score}`;

    
    let newScore = document.getElementById("highscore");
    newScore.appendChild(highScore);
  })
  .catch(error => console.log(error));
  } catch(error) {
    console.log(error);
  }
}
getHighScores();
//NOTE - Creates the right side boundaries of the board.
let rightSide = [];
for (let i = 1; i <= selectedBoardSize; i++) {
  rightSide.push(selectedBoardSize * i);
}
//NOTE - Creates the left side boundaries of the board.
let leftSide = [];
for (let i = 0; i < selectedBoardSize; i++) {
  leftSide.push(selectedBoardSize * i + 1);
}
//NOTE - Creates the top side boundaries of the board.
let topSide = [];
for (let i = 1; i <= selectedBoardSize; i++) {
  topSide.push(i);
}
//NOTE - Creates the bottom side boundaries of the board.
let bottomSide = [];
for (let i = 0; i < selectedBoardSize; i++) {
  bottomSide.push(selectedBoardSize * selectedBoardSize - i);
}

//NOTE - Creates the board, and adds the board to the gameSpace div.
let board = document.createElement("div");
board.setAttribute("class", "board");

console.log(gameSpace)
gameSpace.appendChild(board);

function createBoard(selectedBoardSize) {
    for(let i = 0; i < selectedBoardSize; i++) {
      let row = document.createElement("div");
      row.setAttribute("class", "row");
      board.appendChild(row);

        for(let j = 0; j < selectedBoardSize; j++) {
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.setAttribute("id", `${squareCounter}`);
            //square.innerHTML = `${squareCounter}`;
            row.appendChild(square);
            //console.log("squareCounter", squareCounter  + " " + "square");
            squareCounter++;
        }
    }
    let score = document.getElementById("score");
    score.setAttribute("id", "score");
    score.innerHTML = `Score: ${currentScore}`;
    score.setAttribute("class", "score pixel-font");
    gameSpace.appendChild(score);
    
    let instructions = document.createElement("div");
    instructions.setAttribute("id", "instructions");
    instructions.innerHTML = `Press "s" to start and "r" to reset. Use the arrow keys to move.`;
    instructions.setAttribute("class", "score pixel-font");
    
    gameSpace.appendChild(instructions);
}

createBoard(selectedBoardSize);
// NOTE - Generate a random number between 1 and the board size squared. Set the class of the square with the random number to "award". Add the random number to the awardArray.
function generateAward() {
  let randomAward = Math.floor(Math.random() * (selectedBoardSize * selectedBoardSize) + 1);
  if(snakeArray.includes(randomAward)) {
    console.log("award is on the snake");
    generateAward();
    return;
  }
  console.log(randomAward);
  let award = document.getElementById(`${randomAward}`);
  award.setAttribute("class", "award");
  awardArray.push(randomAward);
  console.log(awardArray);
}


//NOTE - Create a function that will add the snake class to the squares in the snakeArray at the beginning of the game or when reset.
function snakeLocation() {
  for(let location of snakeArray) {
    //console.log(location);
    let snakePart = document.getElementById(`${location}`);
    snakePart.setAttribute("class", "square snake");

  }
}
snakeLocation();
    



//NOTE - Set the gameStatus to true when the "s" key is pressed. Set the gameStatus to false when the "r" key is pressed. Move the snake up when the "ArrowUp" key is pressed. Move the snake down when the "ArrowDown" key is pressed. Move the snake left when the "ArrowLeft" key is pressed. Move the snake right when the "ArrowRight" key is pressed.
document.addEventListener('keydown', function(event) {

console.log(event.key);
if(event.key === "s" && gameStatus === false && snakeArray.length < 4) {
  console.log("Game Started");
  gameStatus = true;
  moveLeft();
} else if(event.key === "r") {
  resetGame();
} else if(event.key === "ArrowUp" && gameStatus === true && lastMove !== "down") {
  moveUp();
} else if(event.key === "ArrowDown" && gameStatus === true && lastMove !== "up") {
  moveDown();
} else if(event.key === "ArrowLeft" && gameStatus === true && lastMove !== "right") {
  moveLeft();
} else if(event.key === "ArrowRight" && gameStatus === true && lastMove !== "left") {
  moveRight();
}
});





//NOTE Move the snake down the board and remove the last square of the snake unless it is on an award square. Set the lastMove variable to "down". 
function moveDown() {
  ;
  if(bottomSide.includes(snakeArray[0]) || snakeArray.includes(snakeArray[0] + selectedBoardSize)) {
    console.log("game over you were moving down");
    gameStatus = false;
    return;
  }
  snakeArray.unshift(snakeArray[0] + selectedBoardSize);
  console.log(snakeArray[0]+ selectedBoardSize);
  let snakeEnd = document.getElementById(
    `${snakeArray[snakeArray.length - 1]}`
  );
  snakeEnd.setAttribute("class", "square");
  if (!awardArray.includes(snakeArray[0])) {
  snakeArray.pop();
  
  } else {
      console.log(`${snakeArray[0]} is the first square of the snake`)
      awardArray.splice(awardArray.indexOf(snakeArray[0]), 1);
      updateHighScore();
      score.innerHTML = `Score: ${currentScore}`;
  }
  console.log(snakeArray);
  snakeLocation();
  lastMove = "down";
  console.log("down");
}
//NOTE Move the snake up the board and remove the last square of the snake unless it is on an award square. Set the lastMove variable to "up". 
function moveUp() {
  
  if(topSide.includes(snakeArray[0]) || snakeArray.includes(snakeArray[0] - selectedBoardSize)) {
    console.log("game over you were moving up");
    gameStatus = false;
    return;
  }
  snakeArray.unshift(snakeArray[0] - selectedBoardSize);
  console.log(snakeArray)
  let snakeEnd = document.getElementById(`${snakeArray[snakeArray.length - 1]}`);
  snakeEnd.setAttribute("class", "square");
   if (!awardArray.includes(snakeArray[0])) {
     snakeArray.pop();
  

   } else {
     console.log(`${snakeArray[0]} is the first square of the snake`);
     awardArray.splice(awardArray.indexOf(snakeArray[0]), 1);
      updateHighScore();
     score.innerHTML = `Score: ${currentScore}`;
   }
  console.log(snakeArray)
  snakeLocation();
  lastMove = "up";
  console.log("up");
}
//NOTE Move the snake left the board and remove the last square of the snake unless it is on an award square. Set the lastMove variable to "left".
function moveLeft() {

  if(leftSide.includes(snakeArray[0]) || snakeArray.includes(snakeArray[0] - 1)) {
    console.log("game over you were moving left");
    gameStatus = false;
    return;
  }
  snakeArray.unshift(snakeArray[0] - 1);
  console.log(snakeArray);
  let snakeEnd = document.getElementById(
    `${snakeArray[snakeArray.length - 1]}`
  );
  snakeEnd.setAttribute("class", "square");
 if (!awardArray.includes(snakeArray[0])) {
   snakeArray.pop();
  
 } else {
   console.log(`${snakeArray[0]} is the first square of the snake`);
   awardArray.splice(awardArray.indexOf(snakeArray[0]), 1);
   updateHighScore();
   score.innerHTML = `Score: ${currentScore}`;
 }
   console.log(snakeArray);
  snakeLocation();
  lastMove = "left";
    console.log("left");
}

//NOTE Move the snake right the board and remove the last square of the snake unless it is on an award square. Set the lastMove variable to "right".
function moveRight() {
  
  console.log(`Move Right ${snakeArray[0]+1}, Snake Array .includes = ${snakeArray.includes(snakeArray[0] + 1)}`)
  if(rightSide.includes(snakeArray[0]) || snakeArray.includes(snakeArray[0] + 1)) {
    console.log("game over you were moving right");
    gameStatus = false;
    return;
  }
  snakeArray.unshift(snakeArray[0] + 1);
  console.log(snakeArray);
  let snakeEnd = document.getElementById(
    `${snakeArray[snakeArray.length - 1]}`
  );
  snakeEnd.setAttribute("class", "square");
 if (!awardArray.includes(snakeArray[0])) {
   snakeArray.pop();
 } else {
   console.log(`${snakeArray[0]} is the first square of the snake`);
   awardArray.splice(awardArray.indexOf(snakeArray[0]), 1);
    updateHighScore();
   score.innerHTML = `Score: ${currentScore}`;
 }  
 console.log(snakeArray);
  snakeLocation();
  lastMove = "right";
    console.log("right");
}
//NOTE Reset the game by setting the snakeArray to the starting position and setting the gameStatus to false. Also reset the board by removing the snake and award classes from the squares.
function resetGame() {
  snakeArray = [44 , 45, 46];
  awardArray = [];
  gameStatus = false;
  snakeLocation();
  for(let i = 0; i < selectedBoardSize * selectedBoardSize; i++) {
    let square = document.getElementById(`${i + 1}`);
    square.setAttribute("class", "square");

  }
  snakeLocation();
  currentScore = 0;
    score.innerHTML = `Score: ${currentScore}`;

}

//NOTE Function to check current high score and update if necessary as well as incrementing the player's score.
function updateHighScore() {
 fetch(URL)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data = data.sort((a, b) => b.score - a.score);
    if(currentScore > data[0].score) {
      console.log("new high score");
      let newHighScore = {
        score: currentScore
      }
      fetch(URL + "/" + data[0].id, {
        method: "PUT",
        body: JSON.stringify(newHighScore),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
    }
  }).catch(error => console.log(error));

  currentScore++;
}




//NOTE Set an interval to generate an award every 2 seconds unless there are already 2 awards on the board.



function award() {
  
  if (awardArray.length < 1 && gameStatus === true ) {
    console.log("award");
    generateAward();
  }
}



//NOTE Move the snake every second unless the gameStatus is false.
function moveSnake() {
  if (gameStatus === true) {
    if (lastMove === "up") {
      moveUp();
    } else if (lastMove === "down") {
      moveDown();
    } else if (lastMove === "left") {
      moveLeft();
    } else if (lastMove === "right") {
      moveRight();
    }
  }
}
//NOTE Set an interval to move the snake every second.
setInterval(() => moveSnake(), 1000);
setInterval(() => award(), 2000);