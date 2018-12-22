import React from 'react';

import FormInput from './FormInput';

import { Button } from 'react-bootstrap';

import '../styles/login-signup.scss';

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
        noLabel
        onChange={onUsernameChange}
        value={username}
      />
    )}
    <FormInput
      id="email"
      label="Email Address"
      noLabel
      onChange={onEmailChange}
      value={email}
    />
    {onPasswordChange && (
      <FormInput
        id="password"
        label="Password"
        noLabel
        onChange={onPasswordChange}
        type="password"
        value={password}
      />
    )}
    {onPasswordConfirmChange && (
      <FormInput
        id="passwordConfirm"
        label="Confirm Password"
        noLabel
        onChange={onPasswordConfirmChange}
        type="password"
        value={passwordConfirm}
      />
    )}
    <Button disabled={isInvalid} type="submit" bsClass="btn-auth">
      {buttonText}
    </Button>
    {error && <p>{error.message}</p>}
  </form>
);

export default AuthForm;
