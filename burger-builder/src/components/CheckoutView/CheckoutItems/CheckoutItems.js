import React from "react";

import CheckoutItem from "./CheckoutItem/CheckoutItem";

import "./CheckoutItems.css";

const CheckoutItems = (props) => {
  let items = Object.entries(props.ingredients).map(el => {
      return <li className="checkout-items__item" key={el[0]}>
              <CheckoutItem 
                ingredient={el} 
                price={props.ingredientsPrice[el[0]]}
                disabledButtons={props.disabledButtons[el[0]]}
                addIngredient={props.addIngredient}
                removeIngredient={props.removeIngredient}
              />
            </li>
  })

  return (
    <ul className="checkout-items">
      {items}
    </ul>
  )
}

export default CheckoutItems