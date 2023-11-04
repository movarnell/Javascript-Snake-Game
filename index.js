
let gameSpace = document.getElementById("gamespace")
let gameStatus = false;
let boardSizeSmall = 10;
let boardSizeMedium = 25; 
let boardSizeLarge = 30;
let selectedBoardSize = boardSizeMedium;
// array with full alphabet capital letters
let snakeArray = [44 , 45, 46];
let awardArray = [];
let lastMove;
let squareCounter = 1;
let rightSide = [];
for (let i = 1; i <= selectedBoardSize; i++) {
  rightSide.push(selectedBoardSize * i);
}
let leftSide = [];
for (let i = 0; i < selectedBoardSize; i++) {
  leftSide.push(selectedBoardSize * i + 1);
}
let topSide = [];
for (let i = 1; i <= selectedBoardSize; i++) {
  topSide.push(i);
}
let bottomSide = [];
for (let i = 0; i < selectedBoardSize; i++) {
  bottomSide.push(selectedBoardSize * selectedBoardSize - i);
}

// create a board
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
            square.innerHTML = `${squareCounter}`;
            row.appendChild(square);
            //console.log("squareCounter", squareCounter  + " " + "square");
            squareCounter++;
        }
    }
}

createBoard(selectedBoardSize);

function generateAward() {
  let randomAward = Math.floor(Math.random() * (selectedBoardSize * selectedBoardSize) + 1);
  console.log(randomAward);
  let award = document.getElementById(`${randomAward}`);
  award.setAttribute("class", "award");
  awardArray.push(randomAward);
  console.log(awardArray);
}


// create a snake
function snakeLocation() {
  for(let location of snakeArray) {
    console.log(location);
    let snakePart = document.getElementById(`${location}`);
    snakePart.setAttribute("class", "snake");

  }
}
snakeLocation();
    




document.addEventListener('keydown', function(event) {

console.log(event.key);
if(event.key === "s" && gameStatus === false) {
  console.log("Game Started");
  gameStatus = true;
  moveLeft();
} else if(event.key === "r") {
  resetGame();
} else if(event.key === "ArrowUp" && gameStatus === true) {
  moveUp();
} else if(event.key === "ArrowDown" && gameStatus === true) {
  moveDown();
} else if(event.key === "ArrowLeft" && gameStatus === true) {
  moveLeft();
} else if(event.key === "ArrowRight" && gameStatus === true) {
  moveRight();
}
});






function moveDown() {
  if(bottomSide.includes(snakeArray[0])) {
    console.log("game over");
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
  } 
  console.log(snakeArray);
  snakeLocation();
  lastMove = "down";
  console.log("down");
}

function moveUp() {
  if(topSide.includes(snakeArray[0])) {
    console.log("game over");
    gameStatus = false;
    return;
  }
  snakeArray.unshift(snakeArray[0] - selectedBoardSize);
  console.log(snakeArray)
  let snakeEnd = document.getElementById(`${snakeArray[snakeArray.length - 1]}`);
  snakeEnd.setAttribute("class", "square");
   if (!awardArray.includes(snakeArray[0])) {
     snakeArray.pop();
   }
  console.log(snakeArray)
  snakeLocation();
  lastMove = "up";
  console.log("up");
}

function moveLeft() {
  if(leftSide.includes(snakeArray[0])) {
    console.log("game over");
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
 }
   console.log(snakeArray);
  snakeLocation();
  lastMove = "left";
    console.log("left");
}

function moveRight() {
  if(rightSide.includes(snakeArray[0])) {
    console.log("game over");
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
 }  console.log(snakeArray);
  snakeLocation();
  lastMove = "right";
    console.log("right");
}

function resetGame() {
  snakeArray = [44 , 45, 46];
  gameStatus = false;
  snakeLocation();
  for(let i = 0; i < selectedBoardSize * selectedBoardSize; i++) {
    let square = document.getElementById(`${i + 1}`);
    square.setAttribute("class", "square");

  }
  snakeLocation();
}

setInterval(award, 2000);
function award() {
  if (awardArray.length < 2 && gameStatus === true) {
    generateAward();
  }
}

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

setInterval(() => moveSnake(), 1000);