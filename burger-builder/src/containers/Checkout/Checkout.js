import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import CheckoutView from "../../components/CheckoutView/CheckoutView";
import Button from "../../components/UI/Button/Button";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions";

import "./Checkout.css"


class Checkout extends React.Component {
  cancelHandler = () => {
    this.props.history.goBack();
  }

  submitHandler = () => {
    this.props.history.push(`${this.props.match.url}/contact-data`);
  }

  render() {
    let {
      ingredients, 
      totalPrice, 
      ingredientsPrice,
      addIngredientHandler,
      removeIngredientHandler,
      disabledButtons,
      purchasable
    } = this.props;

    if(Object.keys(ingredients).length === 0) {
      return <Redirect to="/" />
    }

    return (
      <div className="checkout">
        <CheckoutView 
          ingredients={ingredients} 
          totalPrice={totalPrice}
          ingredientsPrice={ingredientsPrice}
          addIngredient={addIngredientHandler}
          removeIngredient={removeIngredientHandler}
          disabledButtons={disabledButtons}
        />
        <div className="checkout__buttons">
          <Button 
            label="Go back to the menu" 
            className="button button--cancel"
            clicked={this.cancelHandler}
          />
          <Button 
            label="Submit" 
            className="button button--submit"
            clicked={this.submitHandler}
            disabled={!purchasable}
          />
        </div>
        <Route 
          path={`${this.props.match.url}/contact-data`} 
          component={ContactData} 
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    disabledButtons: state.burgerBuilder.disabledButtons,
    purchasable: state.burgerBuilder.purchaseState
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientType) => dispatch(actions.addIngredient(ingredientType)),
    removeIngredientHandler: (ingredientType) => dispatch(actions.removeIngredient(ingredientType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);