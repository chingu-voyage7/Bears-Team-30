import React from 'react';
import axios from 'axios';

import * as routes from '../constants/routes';
import AuthForm from './AuthForm';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;
    console.log(email, password);
    axios.post('/auth/login', { email, password });
    history.push(routes.DASHBOARD);
  };
  onEmailChange = event => {
    const email = event.target.value;
    this.setState(() => ({
      email,
    }));
  };
  onPasswordChange = event => {
    const password = event.target.value;
    this.setState(() => ({
      password,
    }));
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <AuthForm
        email={email}
        password={password}
        onEmailChange={this.onEmailChange}
        onPasswordChange={this.onPasswordChange}
        onSubmit={this.onSubmit}
        isInvalid={isInvalid}
        error={error}
        buttonText="Log In"
      />
    );
  }
}

export default LoginForm;
