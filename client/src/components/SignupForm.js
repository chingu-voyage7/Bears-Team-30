import React from "react";

import AuthForm from "./AuthForm";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  error: null
};

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { username, email, password } = this.state;
    const { history } = this.props;
    console.log(username, email, password, history);
    event.preventDefault();
  };
  onUsernameChange = event => {
    const username = event.target.value;
    this.setState(() => ({
      username
    }));
  };
  onEmailChange = event => {
    const email = event.target.value;
    this.setState(() => ({
      email
    }));
  };
  onPasswordChange = event => {
    const password = event.target.value;
    this.setState(() => ({
      password
    }));
  };
  onPasswordConfirmChange = event => {
    const passwordConfirm = event.target.value;
    this.setState(() => ({
      passwordConfirm
    }));
  };
  render() {
    const { username, email, password, passwordConfirm, error } = this.state;
    const isInvalid =
      password !== passwordConfirm ||
      password === "" ||
      email === "" ||
      username === "";
    return (
      <AuthForm
        username={username}
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        onUsernameChange={this.onUsernameChange}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onPasswordConfirmChange={this.onPasswordConfirmChange}
        onSubmit={this.onSubmit}
        isInvalid={isInvalid}
        error={error}
        buttonText="Sign Up"
      />
    );
  }
}

export default SignUpForm;