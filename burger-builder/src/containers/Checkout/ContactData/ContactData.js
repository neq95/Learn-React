import React from "react";

import Button from "../../../components/UI/Button/Button";
import ordersAjax from "../../../utils/ajax-requests/orders-ajax";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withError from "../../../hoc/withError";
import FormField from "../../../components/UI/Forms/FormField/FormField";
import "./ContactData.css";

class ContactData extends React.Component {
  state = {
    formData: {
      name: {
        value: "",
        fieldType: "input",
        placeholder: "Enter your name",
        label: "Name",
        required: true
      },
      email: {
        value: "",
        fieldType: "input",
        placeholder: "Enter your email",
        label: "Email",
        required: true
      },
      city: {
        value: "",
        fieldType: "input",
        placeholder: "City",
        label: "City",
        required: true
      },
      street: {
        value: "",
        fieldType: "input",
        placeholder: "Street",
        label: "Street",
        required: true
      },
      house: {
        value: "",
        fieldType: "input",
        placeholder: "№ House",
        label: "House",
        required: true
      },
      postCode: {
        value: "",
        fieldType: "input",
        placeholder: "Enter your post code",
        label: "Post Code",
        required: false
      },
      deliveryMethod: {
        value: "fastest",
        fieldType: "select",
        label: "Delivery Method",
        required: false,
        options: {
          cheapest: "Cheapest",
          fastest: "Fastest"
        }
      },
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

  inputChangeHandler = (event) => {
    let formData = {...this.state.formData};
    formData[event.target.name].value = event.target.value;

    this.setState({formData});
  }

  render() {
    let formData = this.state.formData;

    let content = <Spinner />;
    if(!(this.state.loading || this.state.submitted)) {
      let fields = Object.entries(formData).map(el => {
        return (
          <FormField 
            key={el[0]} 
            config={
              {
                name: el[0], 
                changed: this.inputChangeHandler, 
                ...el[1],
                className: "contact-data__form-field"
              }
            }
          />
        )
      })

      content = (
        <React.Fragment>
          <h3 className="contact-data__title">Enter your contact data</h3>
          <form className="contact-data__form">
            {fields}
            <Button 
              label="Order" 
              className="button button--order contact-data__order-button" 
              clicked={this.orderHandler}
              disabled={this.state.loading ? true : false}
              type="submit"
            />
          </form>
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