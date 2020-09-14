import React from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import CheckoutView from "../../components/CheckoutView/CheckoutView";
import Button from "../../components/UI/Button/Button";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions/actions";

import "./Checkout.css"


class Checkout extends React.Component {
  cancelHandler = () => {
    this.props.history.goBack();
  }

  submitHandler = () => {
    this.props.history.push(`${this.props.match.url}/contact-data`);
  }

  render() {
    console.log(this.props);
    return (
      <div className="checkout">
        <CheckoutView 
          ingredients={this.props.ingredients} 
          totalPrice={this.props.totalPrice}
          ingredientsPrice={this.props.ingredientsPrice}
          addIngredient={this.props.addIngredientHandler}
          removeIngredient={this.props.removeIngredientHandler}
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredientHandler: (ingredientType) => dispatch({
      type: actions.ADD_INGREDIENT,
      payload: {ingredientType}
    }),
    removeIngredientHandler: (ingredientType) => dispatch({
      type: actions.REMOVE_INGREDIENT,
      payload: {ingredientType}
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);