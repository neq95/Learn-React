import React from "react";

import Backdrop from "../Backdrop/Backdrop"

import "./Modal.css"

class Modal extends React.Component {
  shouldComponentUpdate(newProps) {
    return newProps.showModal !== this.props.showModal || newProps.children !== this.props.children;
  }

  render() {
    let modalClass = this.props.showModal ? "Modal active" : "Modal";
    return (
      <React.Fragment>
        <Backdrop 
          clicked={this.props.clicked}
          show={this.props.showModal}/>
        <div className={modalClass}>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default Modal;