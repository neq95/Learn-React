import React from "react";

import Counter from "../../../UI/Counter/Counter";

import "./CheckoutItem.css";

const CheckoutItem = (props) => {
  let [name, quantity] = props.ingredient;
  return (
    <div className="checkout-item">
      <p className="checkout-item__name">{capitalize(name)}</p>
      <div className="ckeckout-item__counter checkout-counter">
        <Counter
          reduceClassName="checkout-counter__control"
          quantity={quantity}
          addClassName="checkout-counter__control"
        />
      </div>
      <div className="checkout-item__price">{toFixed(props.price * quantity)}</div>
      <button className="checkout-item__delete">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )
}

function toFixed(number) {
  return number.toFixed(2);
}

function capitalize(value) {
  value = typeof value === "string" ? value : value.toString();
  return value.substring(0, 1).toUpperCase() + value.substring(1);
}

export default CheckoutItem