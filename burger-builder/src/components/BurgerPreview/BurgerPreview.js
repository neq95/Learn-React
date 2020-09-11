import React from "react";

import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import "./BurgerPreview.css";

const BurgerPreview = props => {
  let transformedIngredients = [];
  for(let ingredient in props.ingredients) {
    let i = 0;
    while(i < props.ingredients[ingredient]) {
      transformedIngredients.push(<BurgerIngredient key={ingredient + i} type={ingredient} />)
      i++;
    }
  }

  if(transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }

  return (
    <div className="burger">
      <div className="burger__ingredients">
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    </div>
  )
}

export default BurgerPreview;