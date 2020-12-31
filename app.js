document.addEventListener("DOMContentLoaded", () => {
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector(".score-container")
  const highDisplay = document.querySelector(".best-container")
  const resultDisplay = document.getElementById("result");
  const width = 4;
  let squares = [];
  let score = 0;
  let highScore = 0;

  //create a playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }
  createBoard();

  //generate a number randomly
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
       checkForGameOver();
    } else generate();
  }

  //swipe right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //swipe left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 == 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];
        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  //swipe down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredRow = row.filter((num) => num);
      let missing = 4 - filteredRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = zeros.concat(filteredRow);

      squares[i].innerHTML = newRow[0];
      squares[i + width].innerHTML = newRow[1];
      squares[i + width * 2].innerHTML = newRow[2];
      squares[i + width * 3].innerHTML = newRow[3];
    }
  }

  //swipe up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let row = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];
      let filteredRow = row.filter((num) => num);
      let missing = 4 - filteredRow.length;
      let zeros = Array(missing).fill(0);
      let newRow = filteredRow.concat(zeros);

      squares[i].innerHTML = newRow[0];
      squares[i + width].innerHTML = newRow[1];
      squares[i + width * 2].innerHTML = newRow[2];
      squares[i + width * 3].innerHTML = newRow[3];
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML == squares[i + 1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i+1].innerHTML = combinedTotal;
        squares[i].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
        highScorefun()
      }
    }
    checkForWin();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML == squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
        highScorefun()
      }
    }
    checkForWin();
  }

  //high score function
  function highScorefun () {
    if(score >= highScore){
      highDisplay.innerHTML = score;
    }
  }

  //assign keycodes
  function control(e) {
    if (e.key === "ArrowRight" || e.key === "d") {
      keyRight();
    } else if (e.key === "ArrowLeft" || e.key === "a") {
      keyLeft();
    } else if (e.key === "ArrowDown" || e.key === "s") {
      keyDown();
    } else if (e.key === "ArrowUp" || e.key === "w") {
      keyUp();
    }
  }
  document.addEventListener("keydown", control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  //check for number 2048 in the squares to win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You Win!";
        document.removeEventListener("keydown", control);
      }
    }
  }

  //check if there is no zero on the board to lose
  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "You Lose!";
      document.removeEventListener("keydown", control);
    }
  }
});
