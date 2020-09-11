import React from "react";

const Counter = (props) => {
  return (
    <React.Fragment>
      <button 
        className={props.reduceClassName}
        disabled={props.disabled}
        onClick={props.reduce}
      >
        <i className="fas fa-minus"></i>
      </button>
      <span 
        className="counter__quantity"
        style={{width: "40px", textAlign: "center"}}
      >
        {props.quantity}
      </span>
      <button 
        className={props.addClassName}
        onClick={props.add}
      >
        <i className="fas fa-plus"></i>
      </button>
    </React.Fragment>
  )
}

export default Counter;