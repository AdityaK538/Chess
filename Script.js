//Creating board
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
  settingPieces();
};
//Initializing pieces
const settingPieces = () => {
  let board = document.querySelector(".board");
  console.log(board);

  for (let checkRow = 0; checkRow < 8; checkRow++) {
    let updateCheckRow = checkRow + 1;
    let rowBoxes = board.querySelectorAll(`[data-row="${updateCheckRow}"]`);
    console.log(`row boxs = ${rowBoxes.length}`);

    rowBoxes.forEach((box, collumnIndex) => {
      //(?) this checks for the element availability and continuity
      let pieceType = pieces[updateCheckRow]?.[collumnIndex];
      if (pieceType) {
        let img = document.createElement("img");
        img.src = `./${pieceType}.png`;
        box.appendChild(img);
      }
    });
  }
};

const pieces = {
  1: [
    "rookW",
    "knightW",
    "bishopW",
    "queenW",
    "kingW",
    "bishopW",
    "knightW",
    "rookW",
  ],
  2: ["pawnW", "pawnW", "pawnW", "pawnW", "pawnW", "pawnW", "pawnW", "pawnW"],
  7: ["pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB", "pawnB"],
  8: [
    "rookB",
    "knightB",
    "bishopB",
    "queenB",
    "kingB",
    "bishopB",
    "knightB",
    "rookB",
  ],
};
///////////////////////////////////////////////////////////////////
// initialization & data fetching
const EventStarter = (chessCol) => {
  //Dataset always returns string
  //Convert it into number Where needed
  let element = chessCol;
  let color = Number(chessCol.dataset.color);
  let rowPosition = Number(chessCol.dataset.row);
  let columnPosition = Number(chessCol.dataset.column);
  let active = chessCol.dataset.active;
  let pieceType = currentPiece(chessCol);
  const currentData = {
    element: element,
    color: color,
    rowPosition: rowPosition,
    columnPosition: columnPosition,
    active: active,
    pieceType: pieceType,
  };
  handleSelection(currentData);
};
////////////////////////////////////////////////////////////////////////////////////////
const currentPiece = (box) => {
  let img = box.querySelector("img");
  let src = img.getAttribute("src");
  let imageType = src.split("/").pop().replace(".png", "");
  console.log(imageType);
  return imageType;
};
////////////////////////////////////////////////////////////////////////////////////////

let selectedPiece = null;

const handleSelection = (currentData) => {
  //selectedPiece = look for a peace previous to the move
  //currentData.pieceType = cheking the current piece availability
  if (!selectedPiece && currentData.pieceType) {
    console.log("highlight - no, yes");
    selectedPiece = currentData;
  } else if (selectedPiece && selectedPiece.element == currentData.element) {
    console.log("clear highlight - yes, same");
    selectedPiece = null;
  } else if (selectedPiece && currentData.pieceType) {
    console.log("clear highlight - yes, yes");
    selectedPiece = currentData;
  } else if (selectedPiece && !currentData.pieceType) {
    console.log("clear highlight- yes, no");
    selectedPiece = null;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////
