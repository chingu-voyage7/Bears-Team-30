import React from 'react';

const FormInput = ({
  id,
  label,
  noLabel,
  onChange,
  placeholder,
  type,
  value,
}) => (
  <div>
    {noLabel ? '' : <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      onChange={onChange}
      placeholder={placeholder ? placeholder : label}
      type={type ? type : 'text'}
      value={value}
      className="form-input"
    />
  </div>
);

export default FormInput;
