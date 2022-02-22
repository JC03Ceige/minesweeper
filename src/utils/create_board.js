/* This function creates a two dimensional array with values for each grid cell based
on the parameters passed to the function. */
const createBoard = (row, col, mines) => {
  /* First we create a blank board */
  let board = [];
  let mineLocation = [];

  /* x is will represent the index of the row array, iow x = col */
  for (let x = 0; x < row; x++) {
    let subCol = [];
    for (let y = 0; y < col; y++) {
      subCol.push({
        value: 0,
        uncovered: false,
        x: x,
        y: y,
        flagged: false,
      });
    }
    board.push(subCol);
  }

  /* Now we randomly place the mines on the board (array grid) */
  let mineCount = 0;
  while (mineCount < mines) {
    let x = randomize(0, row - 1);
    let y = randomize(0, col - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = "X";
      mineLocation.push([x, y]);
      mineCount++;
    }
  }
  console.log(mineLocation);

  /* Now that the mines have been places, we can add the numbers. */
  for (let rowNum = 0; rowNum < row; rowNum++) {
    for (let colNum = 0; colNum < col; colNum++) {
      /* If the cell contains a mine (value = X) then we skip over it. */
      if (board[rowNum][colNum].value === "X") {
        continue;
      }

      /* Now we need check for mines in surrounding blocks and increment the value of the cell number according to the amount of mines surrounding the block.
      
      The < and > conditionals check to make sure we are not on the edge of the board while the board[][] conditionals check for the X value (mine). */

      // Check for mines above the cell
      if (rowNum > 0 && board[rowNum - 1][colNum].value === "X") {
        board[rowNum][colNum].value++;
      }

      // Check for mine top-right of the cell
      if (
        rowNum > 0 &&
        colNum < col - 1 &&
        board[rowNum - 1][colNum + 1].value === "X"
      ) {
        board[rowNum][colNum].value++;
      }

      // Check for mine right of the cell
      if (colNum < col - 1 && board[rowNum][colNum + 1].value === "X") {
        board[rowNum][colNum].value++;
      }

      // Check for mine bottom-right of cell
      if (
        rowNum < row - 1 &&
        colNum < col - 1 &&
        board[rowNum + 1][colNum + 1].value === "X"
      ) {
        board[rowNum][colNum].value++;
      }

      // Check for mine below the cell
      if (rowNum < row - 1 && board[rowNum + 1][colNum].value === "X") {
        board[rowNum][colNum].value++;
      }

      // Check for mine bottom-left of the cell
      if (
        rowNum < row - 1 &&
        colNum > 0 &&
        board[rowNum + 1][colNum - 1].value === "X"
      ) {
        board[rowNum][colNum].value++;
      }

      // Check for mine left of the cell
      if (colNum > 0 && board[rowNum][colNum - 1].value === "X") {
        board[rowNum][colNum].value++;
      }

      // Check top-left of the cell for mine
      if (
        rowNum > 0 &&
        colNum > 0 &&
        board[rowNum - 1][colNum - 1].value === "X"
      ) {
        board[rowNum][colNum].value++;
      }
    }
  }
  console.log(board);
  return { board, mineLocation };
};

function randomize(min = 0, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/* We need to export this function just as we would a React component. */
export default createBoard;
