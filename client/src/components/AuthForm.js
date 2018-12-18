import React from 'react';

import AuthInput from './AuthInput';

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
  <form onSubmit={onSubmit}>
    {onUsernameChange && (
      <AuthInput
        id="username"
        label="Username"
        onChange={onUsernameChange}
        value={username}
      />
    )}
    <AuthInput
      id="email"
      label="Email Address"
      onChange={onEmailChange}
      value={email}
    />
    {onPasswordChange && (
      <AuthInput
        id="password"
        label="Password"
        onChange={onPasswordChange}
        type="password"
        value={password}
      />
    )}
    {onPasswordConfirmChange && (
      <AuthInput
        id="passwordConfirm"
        label="Confirm Password"
        onChange={onPasswordConfirmChange}
        type="password"
        value={passwordConfirm}
      />
    )}
    <button disabled={isInvalid} type="submit">
      {buttonText}
    </button>
    {error && <p>{error.message}</p>}
  </form>
);

export default AuthForm;
