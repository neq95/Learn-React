import React from "react";

import "./Fieldset.css";

const Fieldset = (props) => {
  return (
    <fieldset className={`fieldset ${props.className}`}>
      <legend className="fieldset__legend">{props.legend}</legend>
      {props.children}
    </fieldset>
  )
}

export default Fieldset;