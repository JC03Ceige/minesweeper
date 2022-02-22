/* This component serves as our game UI and we use it to bring together all of our other functional components and API's. 

Note that this project has seperate folders for components and utils, which contains most of the game logic.*/
import React, { useEffect, useState } from "react";
import createBoard from "../utils/create_board";
import uncovered from "../utils/uncover";
import Button from "./Button";
import Cell from "./Cell";
import BoardModal from "./Modal";
import { GiLaurels } from "react-icons/gi";

// The game board component is created as an arrow function.
const Board = () => {
  // This gameLevel Hook is not yet implemented.
  //const [gameLevel, setGameLevel] = useState("");

  /* We use React Hooks to set the state for functional objects we will be using in the app */
  const [grid, setGrid] = useState([]);
  const [clearedCount, setClearedCount] = useState(0);
  const [minesCount, setMinesCount] = useState(0);
  const [mineLocation, setMineLocation] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [modalShowHelp, setModalShowHelp] = useState(false);
  const [modalShowGameOver, setModalShowGameOver] = useState(false);

  /* The useEffect Hook is used as ComponentDidMount and tell the app what to do once the component has rendered.

  In our case it loads the game board UI. */
  useEffect(() => {
    loadBoard();
  }, []);
  //console.log(grid)

  /* This functionality has not yet been implemented */
  // const level = [
  //   { difficulty: "apprentice", board: { x: 10, y: 6, mines: 12 } },
  //   { difficulty: "wizard", board: { x: 20, y: 15, mines: 50 } },
  //   { difficulty: "grandmaster", board: { x: 30, y: 20, mines: 200 } },
  // ];

  /* We declare mines as aglobal varibale in the component to allow easy manipulation and synced states. */
  let mines = 10;
  /* The load board method creates a new game board with given parameters and then updates the relevant states. */
  const loadBoard = () => {
    const newBoard = createBoard(10, 10, mines);
    setClearedCount(10 * 10 - mines);
    setMineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
    setMinesCount(mines);
  };

  /* Loads a fresh board and resets GameOver state. */
  const resetBoard = () => {
    loadBoard();
    setGameOver(false);
  };

  /* Flag a cell on right click */
  const flagCell = (e, x, y) => {
    // prevent the right-click dropdown menu
    e.preventDefault(e);
    /* We create a deep copy of the state that we don't manipulate the object directly but rather a clone of the object. */
    let newGrid = JSON.parse(JSON.stringify(grid));
    /* Ternary operator is used to check the sate of certain objects and then change it according to current game play. The grid state is then updated */
    newGrid[x][y].flagged === false
      ? (newGrid[x][y].flagged = true)
      : (newGrid[x][y].flagged = false);
    setGrid(newGrid);
    /* If the flag is on a mine, the minecount is decremented. */
    if (newGrid[x][y].value === "X") {
      setMinesCount((prevState) => prevState - 1);
    }
  };

  /* Uncover the cells */
  const uncoverCell = (x, y) => {
    if (grid[x][y].uncovered || gameOver) {
      return;
    }
    // We create a deep copy of the state that we don't manipulate the object directly but rather a clone of the object.
    let newGrid = JSON.parse(JSON.stringify(grid));
    /* Check for mines (value "X") */
    if (newGrid[x][y].value === "X") {
      /* Itterate over each mine object in the array and check to see if it is uncovered. If all mines are uncovered game states are changed. */
      for (let i = 0; i < mineLocation.length; i++) {
        if (!newGrid[mineLocation[i][0]][mineLocation[i][1]].uncovered) {
          newGrid[mineLocation[i][0]][mineLocation[i][1]].uncovered = true;
          setMinesCount("X");
        }
        setGrid(newGrid);
        setGameOver(true);
        //console.log(newGrid);
        setGameWon(false);
        setModalShowGameOver(true);
      }
      /* If not a mine, call the uncovered function and pass in the relevant parameters. */
    } else {
      let uncoveredBoard = uncovered(newGrid, x, y, clearedCount);
      setGrid(uncoveredBoard.arr);
      setClearedCount(uncoveredBoard.newClearedCount);
      /* Check if all grid cells have been cleared then declare the winning state. */
      if (uncoveredBoard.newClearedCount === 0) {
        setGameOver(true);
        setGameWon(true);
        setModalShowGameOver(true);
      }
    }
  };

  /* This is what we will see in the render. */
  return (
    <div className="board">
      {/* Buttons and minesCount are set in seperate div. */}
      <div>
        {/* Buttons are passed their own specific props related to the function they serve.*/}
        <Button
          value={"Help"}
          classname={"helpBtn"}
          clickEvent={() => setModalShowHelp(true)}
        />{" "}
        <Button
          value={"Reset"}
          classname={"resetBtn"}
          clickEvent={() => resetBoard()}
        />{" "}
        <h2>Mines: {minesCount}</h2>
      </div>
      {/*We use the map function to iterate through the grid, first the rows, and then 
      for each row we iterate through the collumn as well. */}
      {grid.map((row, rowIndex) => {
        return (
          <div style={{ display: "flex" }} key={row + rowIndex}>
            {row.map((cell, cellIndex) => {
              return (
                <div key={"cell" + cellIndex}>
                  {/* For each nested iteration we generate a cell component with content (details) based on what the cell value is.*/}
                  <Cell
                    details={cell}
                    updateFlag={flagCell}
                    uncoverCell={uncoverCell}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
      {/* MODALS
      
      We pass in the modals last as they only render in the UI at specific calls.
      Props are passed to the BoardModal component depending on it's specifc function.*/}
      <BoardModal
        show={modalShowHelp}
        onHide={() => setModalShowHelp(false)}
        btnContent={`GOT IT`}
        title={
          <h3>
            <GiLaurels />
            MISSION DIRECTIVE
            <GiLaurels />
          </h3>
        }
        heading={`How to win.`}
        content={
          <p>
            The galaxy has come under threat and you are our only hope for
            survival. <br />
            The Minedorians have strategically placed fusion reactor mines on
            key planets of the Galactic Union which, if detonated, could mean
            the end of all sentient life in the galaxy as we know it.
            <br />
            The mission is simple, clear all the planets represented on the
            comms grid and if possible, eliminate the mines in the process. Our
            radars have been able to triangulate possible locations of the mines
            but they use sophisiticated cloaking which block us from getting
            their exact location.
            <br />
            <br />
            Here is how you will proceed: <br />
            <li>
              To start the mission simply select one of the planet cells on the
              comms grid. This will reaveal to you how many mines have been
              located in a single cell radius.
            </li>
            <li>
              If you suspect a planet to be rigged with a mine, use the
              righ-selector button of your selection device and it will flag
              that planet for further inspection.
            </li>
            <li>
              It sounds fairly simple but it will require your genius to work
              out exactly where the mines have been planted.
            </li>
            <br />
            As soon as you have cleared all the planets or when all the mines
            have been flagged, the mission will be completed. The view-screen
            above the comms grid will indicate how many mines have been located.
            <br />
            <br />
            Good luck Captian. <GiLaurels />
            <br />
            <br />
            ** HINTS **
            <ol>
              <li>
                The number displayed on the grid cell tells you how many mines
                it is directly surrounded by: 1 = 1 mine, 2 = 2 mines, ...5 = 5
                mines
              </li>
              <li>
                If you have located and flagged a mine in an area where that
                amount of mines are indicated, you can safely uncover the rest
                of the cells surrounding the numbered grid cell.
              </li>
              <li>
                The mine counter above the grid tells you how many mines you
                still need to uncover. This is useful if you perhaps 'over-flag'
                the grid or simply to keep tabs on your progress.
              </li>
            </ol>
          </p>
        }
      />
      {/* Modal is trigered when gameWon status is set to true. */}
      {gameWon && (
        <BoardModal
          show={modalShowGameOver}
          onHide={() => {
            setModalShowGameOver(false);
            resetBoard();
          }}
          btnContent={`Try Again`}
          title={"GAME OVER"}
          heading={`MISSION SUCCESS`}
          content={`You saved the galaxy and defeated the Minedorians.`}
        />
      )}
      {/* Modal is trigered when gameWon status is set to false. */}
      {!gameWon && (
        <BoardModal
          show={modalShowGameOver}
          onHide={() => {
            setModalShowGameOver(false);
            resetBoard();
          }}
          btnContent={`Try Again`}
          title={"GAME OVER"}
          heading={`MISSION FAILED`}
          content={`The Minedorians succeeded in their plot.`}
        />
      )}
    </div>
  );
};

/* Component is exported for use in main app component. */
export default Board;
