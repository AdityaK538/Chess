const chessBoardCreation = (startButton) => {
  startButton.disabled = true;
  let board = document.querySelector(".board");
  let blockColour = 1;
  for (let row = 0; row < 8; row++) {
    let chessRows = document.createElement("div");
    chessRows.className = "BoardRow";
    for (let col = 0; col < 8; col++) {
      let chessCol = document.createElement("div");
      chessCol.className = blockColour === 1 ? " boxW" : " boxB";
      chessCol.dataset.color = blockColour;
      chessCol.dataset.row = row + 1;
      chessCol.dataset.column = col + 1;
      chessCol.dataset.active = "false";
      chessCol.addEventListener("click", () => {
        EventStarter(chessCol);
      });
      chessRows.appendChild(chessCol);
      blockColour = blockColour === 1 ? 2 : 1;
    }
    blockColour = blockColour === 1 ? 2 : 1;
    board.appendChild(chessRows);
  }
};

const EventStarter = (chessCol) => {
  //Dataset always returns string
  //Convert it into number Where needed
  let element = chessCol;
  let color = Number(chessCol.dataset.color);
  let rowPosition = Number(chessCol.dataset.row);
  let columnPosition = Number(chessCol.dataset.column);
  let active = chessCol.dataset.active;
  const currentData = {
    element: element,
    color: color,
    rowPosition: rowPosition,
    columnPosition: columnPosition,
    active: active,
  };
  colorChanger(currentData);
};
const colorChanger = (currentData) => {
  if (currentData.active == "true") {
    resetBoardGame();
    currentData.active = "false";
  } else {
    resetBoardGame();
    currentData.active = "true";
    path(currentData);
  }
};
const resetBoardGame = () => {
  let allSquares = document.querySelectorAll(".boxW, .boxB");
  allSquares.forEach((square) => {
    let color = Number(square.dataset.color);
    square.style.backgroundColor = baseColorSelector(color);
    square.dataset.active = "false";
  });
};

const baseColorSelector = (color) => {
  return color === 1 ? "white" : "black";
};

////////////////////////////Piece-MoveSet/////////////////////////

const path = (currentData) => {
  for (let hor = 1; hor <= 8; hor++) {
    for (let ver = 1; ver <= 8; ver++) {
      //diagnalPath(currentData, hor, ver)
      //straightPath(currentData, hor, ver)
      if (diagnalPath(currentData, hor, ver)) {
        let square = document.querySelector(
          `[data-row="${hor}"][data-column="${ver}"]`
        );
        if (square) {
          square.style.backgroundColor = "brown";
        } else {
          square.style.backgroundColor = baseColorSelector(currentData.color);
        }
      }
    }
  }
};

//////////////////////////////////pathPattern//////////////////////

const straightPath = (currentData, hor, ver) => {
  const logic =
    currentData.rowPosition == hor || currentData.columnPosition == ver;
  return logic;
};
const diagnalPath = (currentData, hor, ver) => {
  const logic =
    Math.abs(currentData.rowPosition - hor) ==
    Math.abs(currentData.columnPosition - ver);
  return logic;
};
const pawnPath = (currentData, hor, ver) => {
  if (currentData.color == 1) {
    if (
      currentData.columnPosition === ver &&
      hor === currentData.rowPosition + 1
    ) {
      return true;
    }
    if (
      currentData.columnPosition === ver &&
      hor === currentData.rowPosition + 2 &&
      currentData.rowPosition == 2
    ) {
      return true;
    }
    if (
      Math.abs(currentData.columnPosition - ver) === 1 &&
      currentData.rowPosition + 1 === hor
    ) {
      return true;
    }
  }

  if (currentData.color == 2) {
    if (
      currentData.columnPosition === ver &&
      hor === currentData.rowPosition - 1
    ) {
      return true;
    }
    if (
      currentData.columnPosition === ver &&
      hor === currentData.rowPosition - 2 &&
      currentData.rowPosition == 2
    ) {
      return true;
    }
    if (
      Math.abs(currentData.columnPosition - ver) === 1 &&
      currentData.rowPosition - 1 === hor
    ) {
      return true;
    }
  }
  return false;
};
