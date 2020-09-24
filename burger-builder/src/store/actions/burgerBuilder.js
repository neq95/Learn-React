import * as actionTypes from "./actionTypes";
import ordersAjax from "../../utils/ajax-requests/orders-ajax";

export const addIngredient = (ingredientType) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {ingredientType}
  };
};

export const removeIngredient = (ingredientType) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {ingredientType}
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients
  };
};

const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

export const fetchIngredients = () => {
  return (dispatch) => {
    ordersAjax.getData("/ingredients.json")
      .then(data => dispatch(setIngredients(data)))
      .catch(() => dispatch(fetchIngredientsFailed()))
  };
};