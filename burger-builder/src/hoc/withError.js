import React from "react";

import Modal from "../components/UI/Modal/Modal";

import "./withError.css";

const withError = (Wrapped, ordersAjax) => {
  return class extends React.Component {
    state = {
      error: {
        errorExist: false,
        errorMessage: ""
      }
    }

    componentDidMount() {
      this.callbackIndex = ordersAjax.on((err) => {
        this.setState({
          error: {
            errorExist: true,
            errorMessage: err.message
          }
        })
      });
    }

    componentWillUnmount() {
      ordersAjax.off(this.callbackIndex);
    }

    onModalClick = () => {
      this.setState({
        error: {
          errorExist: false,
          errorMessage: ""
        }
      })
    }

    render() {
      let error = this.state.error;
      return (
        <React.Fragment>
          <Modal showModal={error.errorExist} clicked={this.onModalClick}>
            <div className="error-message">
              <button className="error-message__button" onClick={this.onModalClick}>
                <i className="far fa-times-circle"></i>
              </button>
                <p className="error-message__content">{error.errorMessage}</p>
            </div>
          </Modal>
          <Wrapped {...this.props}/>
        </React.Fragment>
      )
    }
  }
}

export default withError;