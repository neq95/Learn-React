import React from "react";

import "./Button.css";

const Button = (props) => {
  return (
    <button
      onClick={props.clicked}
      className={props.className}
      disabled={props.disabled}
      type={props.type ? props.type : "button"}
    >
      {props.label}
    </button>
  )
}

export default Button;