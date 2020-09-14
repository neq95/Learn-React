import React from "react";

import Counter from "../../../UI/Counter/Counter";

import "./CheckoutItem.css";

const CheckoutItem = (props) => {
  let [name, quantity] = props.ingredient;
  return (
    <div className="checkout-item">
      <p className="checkout-item__name">{name}</p>
      <div className="ckeckout-item__counter checkout-counter">
        <Counter
          reduceClassName="checkout-counter__control"
          quantity={quantity}
          addClassName="checkout-counter__control"
          add={() => props.addIngredient(name)}
          reduce={() => props.removeIngredient(name)}
          disabled={props.disabledButtons}
        />
      </div>
      <div className="checkout-item__price">{(props.price * quantity).toFixed(2)}</div>
    </div>
  )
}

export default CheckoutItem