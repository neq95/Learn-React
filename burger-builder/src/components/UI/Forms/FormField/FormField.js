import React from "react";

import "./FormField.css";

const FormField = (props) => {
  let config = props.config;

  let field, errorMessage, inputClass;

  if(!config.validation.isValid) {
    inputClass = "invalid";
    errorMessage = <p className="form-field__error">{config.validation.errorMessage}</p>;
  }

  switch(config.fieldType) {
    case "input":
      field = <input 
          type="text" 
          name={config.name} 
          placeholder={config.placeholder}
          className={`form-field__content ${inputClass}`}
          autoComplete="off"
          value={config.value}
          onChange={config.changed}
          required={config.validation?.required}
          id={config.name}
        />
      break;
    case "select":
      let options = Object.entries(config.options).map(el => {
        return <option key={el[0]} value={el[0]}>{el[1]}</option>
      })

      field = <select
          name={config.name}
          className="form-field__content"
          value={config.value}
          onChange={config.changed}
          required={config.validation?.required}
        >
          {options}
        </select>
      break;
    default:
      field = <input type="text"/>
      break;
  }

  return (
    <div className={`form-field ${config.className ? config.className : ""}`}>
      <label htmlFor={config.name} className="form-field__label">
        {config.label}
        {config.validation?.required ? <sup className="form-field__required">*</sup> : null}
      </label>
      {field}
      {errorMessage}
    </div>
  )
}

export default FormField;