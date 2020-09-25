import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  error: false,
  loading: false,
  submitted: false
}

const orderReducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.PURCHASE_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case actionTypes.PURCHASE_SUCCEED:
      const orders = [...state.orders];
      orders.push({
        id: action.payload.id,
        orderData: action.payload.orderData
      });

      return {
        ...state,
        orders,
        loading: false,
        submitted: true
      }
    
    case actionTypes.PURCHASE_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      }

    case actionTypes.RESET_PURCHASE_UI:
      return {
        ...state,
        error: false,
        submitted: false
      }

    default:
      return state;
  }
}

export default orderReducer;