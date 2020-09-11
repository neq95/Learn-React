import React from "react";
import PropTypes from "prop-types";

import "./BurgerIngredient.css";

const BurgerIngredient = props => {
  let ingredient = null;

  switch(props.type) {
    case "bread-top": 
      ingredient = (
        <div className="ingredient__bread-top">
          <div className="ingredient__seeds1"></div>
          <div className="ingredient__seeds2"></div>
        </div>
      )
      break;
    case "bread-bottom":
      ingredient = <div className="ingredient__bread-bottom"></div>
      break;
    case "meat":
      ingredient = <div className="ingredient__meat"></div>
      break;
    case "cheese":
      ingredient = <div className="ingredient__cheese"></div>
      break;
    case "bacon":
      ingredient = <div className="ingredient__bacon"></div>
      break;
    case "salad":
      ingredient = <div className="ingredient__salad"></div>
      break;
    default:
      ingredient = null;
  }

  return ingredient;
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}

export default BurgerIngredient;