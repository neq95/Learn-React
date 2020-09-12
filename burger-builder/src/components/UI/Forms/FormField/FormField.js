import React from "react";

import "./FormField.css";

const FormField = (props) => {
  let field = null;

  switch (props.config.fieldType) {
    case "input":
      field = <input 
          type="text" 
          name={props.config.name} 
          placeholder={props.config.placeholder}
          className="form-field__content"
          autoComplete="off"
          value={props.config.value}
          onChange={props.config.changed}
          required={props.config.validation?.required}
          id={props.config.name}
        />
      break;
    case "select":
      let options = Object.entries(props.config.options).map(el => {
        return <option key={el[0]} value={el[0]}>{el[1]}</option>
      })

      field = <select
          name={props.config.name}
          className="form-field__content"
          value={props.config.value}
          onChange={props.config.changed}
          required={props.config.validation?.required}
        >
          {options}
        </select>
      break;
    default:
      field = <input type="text"/>
      break;
  }

  return (
    <div className={`form-field ${props.config.className ? props.config.className : ""}`}>
      <label htmlFor={props.config.name} className="form-field__label">
        {props.config.label}
        {props.config.validation?.required ? <sup className="form-field__required">*</sup> : null}
      </label>
      {field}
    </div>
  )
}

export default FormField;