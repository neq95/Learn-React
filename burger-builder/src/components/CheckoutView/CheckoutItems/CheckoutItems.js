import React from "react";

import CheckoutItem from "./CheckoutItem/CheckoutItem";

import "./CheckoutItems.css";

const CheckoutItems = (props) => {
  let ingredients = {...props.ingredients};
  let ingredientsPrice = {...props.ingredientsPrice};

  if(Object.keys(ingredients).length !== 0) {
    ingredients.bread = "1";
    ingredientsPrice.bread = "2.1";
  }

  let items = Object.entries(ingredients).map(el => {
      return <li className="checkout-items__item" key={el[0]}>
              <CheckoutItem ingredient={el} price={ingredientsPrice[el[0]]}/>
            </li>
  })

  return (
    <ul className="checkout-items">
      {items}
    </ul>
  )
}

export default CheckoutItems