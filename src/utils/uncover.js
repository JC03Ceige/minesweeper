/* This function iterates through the grid array while certain conditions are met.
Whithin set conditions it checks each cell and uncovers them according to their value
and the functionality attached to that value */

// Take in 4 parameters.
const uncovered = (arr, x, y, newClearedCount) => {
  // arr[x][y] are the cell coordinates on the grid.
  console.log(arr[x][y]);

  if (arr[x][y].uncovered) {
    return;
  }

  /* We first need to create a stack of all the cells we want to uncover/dig-up. */
  let dugUp = [];
  dugUp.push(arr[x][y]);

  /* Our function will run while there are still cells on the stack */
  while (dugUp.length !== 0) {
    let singleCell = dugUp.pop();

    if (!singleCell.uncovered) {
      newClearedCount--;
      singleCell.uncovered = true;
    }

    if (singleCell.value !== 0) {
      break;
    }

    /* Now we need to check for values greater than zero in order to form a border of values around the area we want to uncover/dig-up. */

    // Check the top value
    if (
      singleCell.x > 0 &&
      arr[singleCell.x - 1][singleCell.y].value === 0 &&
      !arr[singleCell.x - 1][singleCell.y].uncovered
    ) {
      dugUp.push(arr[singleCell.x - 1][singleCell.y]);
    }

    // Check top-right value
    if (
      singleCell.x > 0 &&
      singleCell.y < arr[0].length - 1 &&
      arr[singleCell.x - 1][singleCell.y + 1].value === 0 &&
      !arr[singleCell.x - 1][singleCell.y + 1].uncovered
    ) {
      dugUp.push(arr[singleCell.x - 1][singleCell.y + 1]);
    }

    // Check right value
    if (
      singleCell.y < arr[0].length - 1 &&
      arr[singleCell.x][singleCell.y + 1].value === 0 &&
      !arr[singleCell.x][singleCell.y + 1].uncovered
    ) {
      dugUp.push(arr[singleCell.x][singleCell.y + 1]);
    }

    // Check bottom-right value
    if (
      singleCell.x < arr.length - 1 &&
      singleCell.y < arr[0].length - 1 &&
      arr[singleCell.x + 1][singleCell.y + 1].value === 0 &&
      !arr[singleCell.x + 1][singleCell.y + 1].uncovered
    ) {
      dugUp.push(arr[singleCell.x + 1][singleCell.y + 1]);
    }

    // Check bottom value
    if (
      singleCell.x < arr.length - 1 &&
      arr[singleCell.x + 1][singleCell.y].value === 0 &&
      !arr[singleCell.x + 1][singleCell.y].uncovered
    ) {
      dugUp.push(arr[singleCell.x + 1][singleCell.y]);
    }

    // Check bottom-left value
    if (
      singleCell.x < arr.length - 1 &&
      singleCell.y > 0 &&
      arr[singleCell.x + 1][singleCell.y - 1].value === 0 &&
      !arr[singleCell.x + 1][singleCell.y - 1].uncovered
    ) {
      dugUp.push(arr[singleCell.x + 1][singleCell.y - 1]);
    }

    // Check left value
    if (
      singleCell.y > 0 &&
      arr[singleCell.x][singleCell.y - 1].value === 0 &&
      !arr[singleCell.x][singleCell.y - 1].uncovered
    ) {
      dugUp.push(arr[singleCell.x][singleCell.y - 1]);
    }

    // Check top-left value
    if (
      singleCell.x > 0 &&
      singleCell.y > 0 &&
      arr[singleCell.x - 1][singleCell.y - 1].value === 0 &&
      !arr[singleCell.x - 1][singleCell.y - 1].uncovered
    ) {
      dugUp.push(arr[singleCell.x - 1][singleCell.y - 1]);
    }

    /* Now we reveal the cells that are within the borders of the area we want to uncover. */

    // Reveal top cell
    if (singleCell.x > 0 && !arr[singleCell.x - 1][singleCell.y].uncovered) {
      arr[singleCell.x - 1][singleCell.y].uncovered = true;
      newClearedCount--;
    }

    // Reveal top-right cell
    if (
      singleCell.x > 0 &&
      singleCell.y < arr[0].length - 1 &&
      !arr[singleCell.x - 1][singleCell.y + 1].uncovered
    ) {
      arr[singleCell.x - 1][singleCell.y + 1].uncovered = true;
      newClearedCount--;
    }

    // Reveal right cell
    if (
      singleCell.y < arr[0].length - 1 &&
      !arr[singleCell.x][singleCell.y + 1].uncovered
    ) {
      arr[singleCell.x][singleCell.y + 1].uncovered = true;
      newClearedCount--;
    }

    // Reveal bottom-right cell
    if (
      singleCell.x < arr.length - 1 &&
      singleCell.y < arr[0].length - 1 &&
      !arr[singleCell.x + 1][singleCell.y + 1].uncovered
    ) {
      arr[singleCell.x + 1][singleCell.y + 1].uncovered = true;
      newClearedCount--;
    }

    // Reveal bottom cell
    if (
      singleCell.x < arr.length - 1 &&
      !arr[singleCell.x + 1][singleCell.y].uncovered
    ) {
      arr[singleCell.x + 1][singleCell.y].uncovered = true;
      newClearedCount--;
    }

    // Reveal bottom-left cell
    if (
      singleCell.x < arr.length - 1 &&
      singleCell.y > 0 &&
      !arr[singleCell.x + 1][singleCell.y - 1].uncovered
    ) {
      arr[singleCell.x + 1][singleCell.y - 1].uncovered = true;
      newClearedCount--;
    }

    // Reveal left cell
    if (singleCell.y > 0 && !arr[singleCell.x][singleCell.y - 1].uncovered) {
      arr[singleCell.x][singleCell.y - 1].uncovered = true;
      newClearedCount--;
    }

    // Reveal top-left cell
    if (
      singleCell.x > 0 &&
      singleCell.y > 0 &&
      !arr[singleCell.x - 1][singleCell.y - 1].uncovered
    ) {
      arr[singleCell.x - 1][singleCell.y - 1].uncovered = true;
      newClearedCount--;
    }
  }
  return { arr, newClearedCount };
};

/* We need to export this function just as we would a React component. */
export default uncovered;
