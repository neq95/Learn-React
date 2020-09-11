import React from "react";

import Counter from "../../../UI/Counter/Counter";

import "./BurgerControl.css";

const BurgerControl = props => {
  return (
    <div className="burger-control">
      <div className="burger-control__side burger-control__side--left">
        <p className="burger-control__label">{props.text}</p>
      </div>
      <div className="burger-control__side burger-control__side--right">
        <Counter 
          addClassName="burger-control__button burger-control__button--add"
          disabled={props.disabled}
          reduceClassName="burger-control__button burger-control__button--reduce"
          add={props.addIngredient}
          reduce={props.removeIngredient}
          quantity={props.ingredientsQuantity}
        />
        {/* <button 
          className="burger-control__button burger-control__button--reduce"
          disabled={props.disabled}
          onClick={props.removeIngredient}>-</button>
        <span className="burger-control__quantity">{props.ingredientsQuantity}</span>
        <button 
          className="burger-control__button burger-control__button--add"
          onClick={props.addIngredient}>+</button> */}
      </div>
    </div>
  )
}

export default BurgerControl;