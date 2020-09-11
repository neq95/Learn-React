import React from "react";
import {Route} from "react-router-dom";

import CheckoutView from "../../components/CheckoutView/CheckoutView";
import Button from "../../components/UI/Button/Button";
import ContactData from "./ContactData/ContactData";

import "./Checkout.css"


class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 0,
    ingredientsPrice: {}
  }

  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);

    let ingredients = {};
    let totalPrice = 0;

    for(let el of query) {
      if(el[0] === "price") {
        totalPrice = el[1]
      } else {
        ingredients[el[0]] = el[1];
      }
    }

    this.setState({ingredients, totalPrice, 
      ingredientsPrice: this.props.ingredientsPrice
    });
  }

  cancelHandler = () => {
    this.props.history.goBack();
  }

  submitHandler = () => {
    this.props.history.push(`${this.props.match.url}/contact-data`);
  }

  render() {
    return (
      <div className="checkout">
        <CheckoutView {...this.state}/>
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
          render={(props) => {
            return <ContactData 
                    ingredients={this.state.ingredients} 
                    totalPrice={this.state.totalPrice}
                    {...props}
                  />
          }} 
        />
      </div>
    )
  }
}

export default Checkout;