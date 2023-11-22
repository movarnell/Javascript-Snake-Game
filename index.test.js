// FILEPATH: /Users/michaelvarnell/Local Code/SnakeGame/index.test.js
const { JSDOM } = require("jsdom");
const { moveRight } = require("../index.js");

beforeEach(() => {
  const dom = new JSDOM('<body><div id="gamespace"></div></body>');
  global.document = dom.window.document;
});

test("moveRight function should move the snake right", () => {
  // Setup
  global.snakeArray = [44, 45, 46];
  global.rightSide = [15, 30, 45];
  global.awardArray = [47];
  global.gameStatus = true;
  global.gameOverSound = jest.fn();
  global.playSound = jest.fn();
  global.updateHighScore = jest.fn();
  global.score = { innerHTML: "" };
  global.currentScore = 0;
  global.snakeLocation = jest.fn();

  // Call the function
  moveRight();

  // Assert that snakeArray has been updated correctly
  expect(global.snakeArray).toEqual([45, 44, 45]);

  // Assert that gameStatus is still true
  expect(global.gameStatus).toBe(true);

  // Assert that gameOverSound was not called
  expect(global.gameOverSound).not.toHaveBeenCalled();

  // Assert that playSound was called
  expect(global.playSound).toHaveBeenCalled();

  // Assert that updateHighScore was called
  expect(global.updateHighScore).toHaveBeenCalled();

  // Assert that score was updated
  expect(global.score.innerHTML).toBe("Score: 0");

  // Assert that snakeLocation was called
  expect(global.snakeLocation).toHaveBeenCalled();
});

// You can add more tests to cover other scenarios, like when the snake hits the right side or itself.
