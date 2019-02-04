import React from 'react';

import FormInput from './FormInput';

import { Button } from 'react-bootstrap';

const AuthForm = ({
  username,
  email,
  password,
  passwordConfirm,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onPasswordConfirmChange,
  onSubmit,
  isInvalid,
  error,
  buttonText,
}) => (
  <form onSubmit={onSubmit} autocomplete="off">
    {onUsernameChange && (
      <FormInput
        id="username"
        label="Username"
        nolabel
        onChange={onUsernameChange}
        value={username}
      />
    )}
    <FormInput
      id="email"
      label="Email Address"
      nolabel
      onChange={onEmailChange}
      value={email}
    />
    {onPasswordChange && (
      <FormInput
        id="password"
        label="Password"
        nolabel
        onChange={onPasswordChange}
        type="password"
        value={password}
      />
    )}
    {onPasswordConfirmChange && (
      <FormInput
        id="passwordConfirm"
        label="Confirm Password"
        nolabel
        onChange={onPasswordConfirmChange}
        type="password"
        value={passwordConfirm}
      />
    )}
    <Button disabled={isInvalid} type="submit" bsClass="btn-auth">
      {buttonText}
    </Button>
    {error && <p>{error}</p>}
  </form>
);

export default AuthForm;
