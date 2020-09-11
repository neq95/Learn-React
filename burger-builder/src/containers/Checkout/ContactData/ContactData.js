import React from "react";

import Button from "../../../components/UI/Button/Button";
import Fieldset from "../../../components/UI/Forms/Fieldset/Fieldset";
import ordersAjax from "../../../utils/ajax-requests/orders-ajax";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withError from "../../../hoc/withError";
import "./ContactData.css";

class ContactData extends React.Component {
  state = {
    formData: {
      customer: {
        name: "",
        address: {
          city: "",
          street: "",
          house: ""
        },
        email: "",
      },
      deliveryMethod: "slowest",
    },
    loading: false,
    submitted: false
  }

  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({loading: true})

    let body = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: this.state.customer,
      deliveryMethod: this.state.deliveryMethod
    }

    ordersAjax.postData("/orders.json", body)
      .then(() => {
        this.setState({submitted: true});
        this.timerID = setTimeout(() => this.props.history.push("/"), 3000)
      })
      .finally(() => this.setState({loading: false}))
  }

  render() {
    let formData = this.state.formData;

    let content = <Spinner />;
    if(!(this.state.loading || this.state.submitted)) {
      content = (
        <React.Fragment>
          <h3 className="contact-data__title">Enter your contact data</h3>
          <form className="contact-data__form">
            <Fieldset legend="Person data" className="contact-data__fieldset">
              <input 
                type="text" 
                autoComplete="off" 
                className="contact-data__input" 
                name="name" 
                placeholder="Your name"
                value={formData.customer.name}
              />
              <input 
                type="text"
                autoComplete="off" 
                className="contact-data__input" 
                name="email" 
                placeholder="Enter your email"
                value={formData.customer.email}
              />
            </Fieldset>
            <Fieldset legend="Address" className="contact-data__fieldset">
              <input type="text" autoComplete="off" className="contact-data__input" name="city" placeholder="Your city" />
              <input type="text" autoComplete="off" className="contact-data__input" name="street" placeholder="Your street" />
              <input type="text" autoComplete="off" className="contact-data__input" name="house" placeholder="Your house" />     
            </Fieldset>
            <Fieldset legend="Delivery Method" className="contact-data__fieldset">
              <select name="delivery" className="contact-data__select">
                <option value="slowest">Slowest</option>
                <option value="slowest">Medium</option>
                <option value="slowest">Fastest</option>
              </select>
            </Fieldset>
          </form>
          <Button 
            label="Order" 
            className="button button--order contact-data__order-button" 
            clicked={this.orderHandler}
            disabled={this.state.loading ? true : false}
          />
        </React.Fragment>
      )
    } else if(!this.state.loading) {
      content = <p className="contact-data__submitted">Thank you. We'll call you soon</p>;
    }

    return (
      <div className="contact-data">
        {content}
      </div>
    )
  }
}

export default withError(ContactData, ordersAjax);