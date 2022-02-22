/* This is a generic component that we will render in various other components. */
import React from "react";

/* We create the component as an arrow function.

Note: because of the generic nature of the component we pass each possible value and attribute
as props.*/
const Button = ({ value, clickEvent, classname }) => {
  return (
    <button className={classname} onClick={clickEvent}>
      {value}
    </button>
  );
};

export default Button;
