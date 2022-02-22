import React from "react";
/* We use icons from react-icons and import the specifically for their use
To render them run 'npm install react-icons --save'. Learn more at 
https://react-icons.github.io/react-icons */
import { GiExplodingPlanet, GiTruce } from "react-icons/gi";

/* We create the component as an arrow function with deconstructed props. */
const Cell = ({ details, updateFlag, uncoverCell }) => {
  /* The styling is dependent on the the state of the object boolean
  and we use the ternary operator for this. This is why we need to do
  inline styling. */
  const cellStyle = {
    block: {
      borderRadius: 12,
      boxShadow: details.uncovered
        ? "1px 1px 2px #fff, inset 1px -3px 8px #888"
        : "-2px -3px 8px 1px #429, inset -1px 2px 3px #eef",
      textShadow: "1px 1px 2px white",
      margin: 3,
      maxWidth: 40,
      maxHeight: 40,
      width: "7vw",
      height: "5vh",
      color: numColorCode(details.value),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 500,
      fontSize: 30,
      cursor: "pointer",
      background: details.uncovered
        ? details.value === "X"
          ? ""
          : bombChexPattern(details.x, details.y)
        : chexPattern(details.x, details.y),
    },
  };

  return (
    <div
      /* Each cell needs to have specific events linked to them that
    can change state in the parent component. The onContextMenu is to 
    flag on right click and we pass the e argument to set preventDefault. */
      onContextMenu={(e) => updateFlag(e, details.x, details.y)}
      onClick={() => uncoverCell(details.x, details.y)}
      className="cellstyle"
      style={cellStyle.block}
    >
      {/* The contents of the cell is dependent on various object states that
      we must to check for before we render the component. 
      
      Note that we use nested ternary statements to check a condition within
      a condition.*/}
      {details.flagged || (details.flagged && details.uncovered) ? (
        <GiTruce />
      ) : details.uncovered && details.value !== 0 ? (
        details.value === "X" ? (
          details.flagged && details.value === "X" ? (
            <GiTruce />
          ) : (
            <GiExplodingPlanet style={{ color: "#FD0E35" }} />
          )
        ) : (
          details.value
        )
      ) : (
        ""
      )}
    </div>
  );
};

/* The three functions below set the color grid algorithm that we
will use to render the game board with varying colors for each cell. */

const chexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#FF4466";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#69FF46";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#5ABFF9";
  } else {
    return "#EE34F2";
  }
};

const bombChexPattern = (x, y) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return "#FBE7B2";
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return "#FCD6C7";
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return "#FCD6C7";
  } else {
    return "#FBE7B2";
  }
};

const numColorCode = (num) => {
  if (num === 1) {
    return "#FD5B78";
  } else if (num === 2) {
    return "#44D7A8";
  } else if (num === 3) {
    return "#FF9966";
  } else if (num === 4) {
    return "#FF6EFF";
  } else if (num === 5) {
    return "#B2F302";
  } else if (num === 6) {
    return "#DA2C43";
  } else {
    return "white";
  }
};

/* We export the component to use it in the game Board UI */
export default Cell;
