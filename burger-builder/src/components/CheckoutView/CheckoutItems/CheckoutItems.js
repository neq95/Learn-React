import React from "react";

import CheckoutItem from "./CheckoutItem/CheckoutItem";

import "./CheckoutItems.css";

const CheckoutItems = (props) => {
  let ingredients = {...props.ingredients};
  let ingredientsPrice = {...props.ingredientsPrice};

  let items = Object.entries(ingredients).map(el => {
      return <li className="checkout-items__item" key={el[0]}>
              <CheckoutItem 
                ingredient={el} 
                price={ingredientsPrice[el[0]]}
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