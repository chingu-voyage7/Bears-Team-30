import React from 'react';

const FormInput = ({
  id,
  label,
  nolabel,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
}) => (
  <div>
    {nolabel ? '' : <label htmlFor={id}>{label}</label>}
    <input
      id={id}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder ? placeholder : label}
      type={type ? type : 'text'}
      value={value}
      className="form-input"
    />
  </div>
);

export default FormInput;
