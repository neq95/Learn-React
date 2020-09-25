import * as actionTypes from "./actionTypes";
import ordersAjax from "../../utils/ajax-requests/orders-ajax";

const purchaseLoading = () => {
  return {
    type: actionTypes.PURCHASE_LOADING
  }
}

const purchaseSucceed = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCEED,
    payload: {
      id,
      orderData
    }
  }
}

const purchaseFail = () => {
  return {
    type: actionTypes.PURCHASE_FAIL
  };
};


export const makePurchase = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseLoading());
    ordersAjax.postData("/orders.json", orderData)
      .then(id => dispatch(purchaseSucceed(id.name, orderData)))
      .catch(() => dispatch(purchaseFail()));
  };
};

export const resetPurchaseUI = () => {
  return {
    type: actionTypes.RESET_PURCHASE_UI
  }
}