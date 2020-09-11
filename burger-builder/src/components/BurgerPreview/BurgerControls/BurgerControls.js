import React from "react";

import BurgerControl from "./BurgerControl/BurgerControl";

import "./BurgerControls.css";


let labels = [
  {label: "Cheese", type: "cheese"},
  {label: "Meat", type: "meat"},
  {label: "Salad", type: "salad"},
  {label: "Bacon", type: "bacon"}
]
const BurgerControls = props => {
  return (
    <div className="burger-controls">
      <p className="burger-controls__price">Current price: 
        <span className="burger-controls__price-cost"> {props.price}</span>
      </p>
      <div className="burger-controls__main burger-controls-main">
        <div className="burger-controls-main__left-side">
          {labels.map(el => <BurgerControl 
                              key={el.label} 
                              text={el.label}
                              addIngredient={() => props.addIngredient(el.type)}
                              removeIngredient={() => props.removeIngredient(el.type)}
                              ingredientsQuantity={props.ingredients[el.type]} 
                              disabled={props.disabled[el.type]}/>)}
        </div>
        <div className="burger-controls-main__right-side">
          <button 
            className="burger-controls-main__order-button"
            disabled={!props.purchasable}
            onClick={props.addModal}>Order Now
          </button>
        </div>
      </div>
    </div>
  ) 
}

export default BurgerControls;