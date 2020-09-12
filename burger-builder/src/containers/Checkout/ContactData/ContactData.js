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
        validation: {
          required: true,
          isValid: false,
          regexString: "^[a-z]{3,}"
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
          regexString: "^.+@[a-z]+\\.(com|ru)$"
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
          regexString: "^[a-z]{3,}"
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
          regexString: "^[a-z]{3,}"
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
          regexString: "^\\d+[a-z]{0,2}$"
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
          regexString: "^\\d{6,6}$"
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
    loading: false,
    submitted: false
  }

  //Stop redirecting after form submit if an user change the page
  componentWillUnmount() {
    clearTimeout(this.timerID);
  }

  //Handler for submitted form: posting data to the server and redirecting to the main page
  formSubmittingHandler = (event) => {
    event.preventDefault();

    this.setState({loading: true});

    function getFormValue(target) {
      let result = {};
      for(let elem in target) {
        result[elem] = target[elem].value;
      }

      return result;
    }

    let body = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      deliveryDetails: getFormValue(this.state.formData)
    }

    //posting order details to the server
    ordersAjax.postData("/orders.json", body)
      .then(() => {
        this.setState({submitted: true});
        this.timerID = setTimeout(() => this.props.history.push("/"), 3000)
      })
      .finally(() => this.setState({loading: false}))
  }

  //Checking if value is valid
  checkValidity(validationObject, value) {
    let valid = validationObject.isValid;
    
    if(validationObject.required || validationObject.regexString) {
      let regex = new RegExp(validationObject.regexString);
      valid = regex.test(value);
    }

    validationObject.isValid = valid;
    return validationObject;
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

    let identifier = event.target.name;

    let newFormData = deepClone(this.state.formData);
    let targetField = newFormData[identifier];
    targetField.value = event.target.value;

    // let fieldValidation = newFormData[identifier].validation;

    // if(fieldValidation.reqired) {
    //   let valid = fieldValidation.checkValidity(event.target.value);

    // }

    let validation = this.checkValidity(targetField.validation, targetField.value);
    targetField.validation = validation;

    console.log(targetField);
    this.setState({formData: newFormData});
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
          <form className="contact-data__form" onSubmit={this.formSubmittingHandler}>
            {fields}
            <Button 
              label="Order" 
              className="button button--order contact-data__order-button" 
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