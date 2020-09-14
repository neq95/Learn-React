import * as actions from "../actions/actions";

const initialState = {
  ingredients: {
    meat: 0,
    cheese: 0,
    bacon: 0,
    salad: 0
  },
  totalPrice: 2.1,
  disabledButtons: {
    meat: true,
    cheese: true,
    bacon: true,
    salad: true
  },
  purchaseState: false
}

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.7,
  meat: 1.6,
  bacon: 1
}

//Helper function to check if there is at least 1 ingredient
function checkPurchaseState(ingredients) {
  let result = Object.values(ingredients).reduce((sum, value) => sum + value);
  return result > 0;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_INGREDIENT:
    case actions.REMOVE_INGREDIENT:
      let ingredientType = action.payload.ingredientType;

      let ingredients = {...state.ingredients};
      let totalPrice = state.totalPrice;

      if(action.type === actions.ADD_INGREDIENT) {
        ingredients[ingredientType]++;
        totalPrice +=  INGREDIENTS_PRICE[ingredientType];
      } else {
        ingredients[ingredientType]--;
        totalPrice -=  INGREDIENTS_PRICE[ingredientType];
      }

      let disabledButtons = {...state.disabledButtons};
      for(let element in ingredients) {
        disabledButtons[element] = ingredients[element] <= 0;
      }

      return {
        ingredients,
        totalPrice: Math.round(totalPrice * 100) / 100,
        disabledButtons,
        purchaseState: checkPurchaseState(ingredients)
      };

    default:
      return state;
  }
}

export default reducer;
