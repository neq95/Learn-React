import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={props.clicked}
      className={props.className}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  )
}

export default Button;