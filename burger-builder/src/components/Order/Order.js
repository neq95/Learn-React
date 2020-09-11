import React from "react";

import "./Order.css";

const Order = (props) => {
  let ingredients = Object.entries(props.order.ingredients).map(el => {
    return (
      <div className="order-ingredients__ingredient" key={el[0]}>
        <p>{el[0]}</p>
        <span>{el[1]}</span>
      </div>
    )
  })

  return (
    <div className="order">
      <h3 className="order__title">Order</h3>
      <div className="order__content">
        <div className="order__ingredients order-ingredients">
          <h4 className="order-ingredients__title">Ingredients</h4>
          {ingredients}
        </div>
        <div className="order__price">
          {props.order.totalPrice} USD
        </div>
      </div>
      <button className="order__delete" onClick={() => props.onDelete(props.order.id)}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  )
}

export default Order;