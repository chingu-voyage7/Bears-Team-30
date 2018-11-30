import React from "react";

const AuthInput = ({ id, label, onChange, placeholder, type, value }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      onChange={onChange}
      placeholder={label}
      type={type ? type : "text"}
      value={value}
    />
  </div>
);

export default AuthInput;
