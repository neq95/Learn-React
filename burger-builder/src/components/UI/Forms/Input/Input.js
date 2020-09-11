import React from "react";

import "./Input.css";

const Input = (props) => {
  return (
    <div className={`input-box ${props.className}`}>
      <input 
        type="text" 
        autoComplete="off" 
        className={"input-box__input"}
        required={props.required}
        placeholder=" "
      />
      <label className="input-box__label">
        <span className="input-box__label-text">Label</span>
      </label>
    </div>
  )
}

export default Input;