import React from "react";

import CheckoutItems from "./CheckoutItems/CheckoutItems";

import "./CheckoutView.css";

const CheckoutView = (props) => {
  return (
    <div className="checkout-view">
      <CheckoutItems 
        ingredients={props.ingredients} 
        ingredientsPrice={props.ingredientsPrice}
        addIngredient={props.addIngredient}
        removeIngredient={props.removeIngredient}
        disabledButtons={props.disabledButtons}
      />
      <div className="checkout-view__summary">
        Summary: <span className="checkout-view__total-price">{props.totalPrice}</span>
      </div>
    </div>
  )
}

export default CheckoutView;