import React from "react";
import {connect} from "react-redux";

import "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import ordersAjax from "../../../utils/ajax-requests/orders-ajax";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withError from "../../../hoc/withError";
import FormField from "../../../components/UI/Forms/FormField/FormField";
import * as actions from "../../../store/actions"

class ContactData extends React.Component {
  state = {
    formData: {
      name: {
        value: "",
        fieldType: "input",
        placeholder: "Enter your name",
        label: "Name",
        validation: {
          required: true,
          isValid: false,
          regexString: "^[a-zа-я]{3,}",
          errorMessage: "Name must have at least 3 symbols"
        }
      },
      email: {
        value: "",
        fieldType: "input",
        placeholder: "Enter your email",
        label: "Email",
        validation: {
          required: true,
          isValid: false,
          regexString: "^.+@[a-z]+\\.(com|ru)$",
          errorMessage: "Email must have symbol '@' and .com/.ru at the end"
        }
      },
      city: {
        value: "",
        fieldType: "input",
        placeholder: "City",
        label: "City",
        validation: {
          required: true,
          isValid: false,
          regexString: "^[a-zа-я]{3,}",
          errorMessage: "City name must have at least 3 symbols"
        }
      },
      street: {
        value: "",
        fieldType: "input",
        placeholder: "Street",
        label: "Street",
        validation: {
          required: true,
          isValid: false,
          regexString: "^[a-zа-я]{3,}",
          errorMessage: "Street name must have at least 3 symbols"
        }
      },
      house: {
        value: "",
        fieldType: "input",
        placeholder: "№ House",
        label: "House",
        validation: {
          required: true,
          isValid: false,
          regexString: "^\\d+[a-z]{0,2}$",
          errorMessage: "House number must starts with a digit and have maximum 2 letters"
        }
      },
      postCode: {
        value: "",
        fieldType: "input",
        placeholder: "Enter your post code",
        label: "Post Code",
        validation: {
          required: false,
          isValid: true,
          regexString: "^\\d{6,6}$",
          errorMessage: "This field isn't required, but if you want to provide it, enter 6 digits"
        }
      },
      deliveryMethod: {
        value: "fastest",
        fieldType: "select",
        label: "Delivery Method",
        options: {
          cheapest: "Cheapest",
          fastest: "Fastest"
        },
        validation: {
          required: false,
          isValid: true
        }
      },
    },
    formIsValid: false
  }

  //Handler for submitted form: posting data to the server and redirecting to the main page
  formSubmittingHandler = (event) => {
    event.preventDefault();

    function getFormValue(target) {
      let result = {};
      for(let elem in target) {
        result[elem] = target[elem].value;
      }

      return result;
    }

    let orderData = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      deliveryDetails: getFormValue(this.state.formData)
    }

    this.props.makePurchase(orderData);
  }

   //Stop redirecting after form submit if the user changed the page
   componentWillUnmount() {
    clearTimeout(this.timerID);
    this.props.resetPurchaseUI();
  }

  //When order submitted, redirect to main page after 5 seconds 
  componentDidUpdate(prevProps) {
    if(prevProps.submitted !== this.props.submitted) {
      console.log("update");
      this.timerID = setTimeout(() => this.props.history.push("/"), 5000);
    }
  }

  //React to input change and mutate state by deep cloning
  inputChangeHandler = (event) => {
    function deepClone(target) {
      if(typeof target !== "object") {
        return target;
      }

      let cloneTarget = {};
      
      for(let elem in target) {
        cloneTarget[elem] = deepClone(target[elem]);
      }

      return cloneTarget;
    }

    //Checking is field is validity with RegExp
    function checkValidity(validationObject, value) {
      let valid = validationObject.isValid;
      
      if(validationObject.required || validationObject.regexString) {
        let regex = new RegExp(validationObject.regexString, "i");
        valid = regex.test(value);
      }
  
      validationObject.isValid = valid;
      return validationObject;
    }

    let identifier = event.target.name;

    let newFormData = deepClone(this.state.formData);
    let targetField = newFormData[identifier];

    targetField.value = event.target.value;

    let validation = checkValidity(targetField.validation, targetField.value);
    targetField.validation = validation;

    let formIsValid = true;
    for(let elem in newFormData) {
      formIsValid = newFormData[elem].validation.isValid && formIsValid;
    }

    this.setState({formData: newFormData, formIsValid});
  }

  render() {
    let formData = this.state.formData;
    let {loading, submitted} = this.props;

    let content = <Spinner />;

    if(!(loading || submitted)) {
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

      let buttonDisabled = loading || !this.state.formIsValid ? true : false;

      content = (
        <React.Fragment>
          <h3 className="contact-data__title">Enter your contact data</h3>
          <form className="contact-data__form" onSubmit={this.formSubmittingHandler}>
            {fields}
            <Button 
              label="Order" 
              className="button button--order contact-data__order-button" 
              disabled={buttonDisabled}
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    submitted: state.order.submitted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makePurchase: (orderData) => dispatch(actions.makePurchase(orderData)),
    resetPurchaseUI: () => dispatch(actions.resetPurchaseUI())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(ContactData, ordersAjax));