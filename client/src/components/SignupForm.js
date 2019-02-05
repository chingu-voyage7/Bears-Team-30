import React from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';

import * as routes from '../constants/routes';
import { SIGN_UP } from '../constants/mutations';
import AuthForm from './AuthForm';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null,
};

class SignupForm extends React.Component {
  state = { ...INITIAL_STATE };

  onUsernameChange = event => {
    const username = event.target.value;
    this.setState(() => ({
      username,
    }));
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
  onPasswordConfirmChange = event => {
    const passwordConfirm = event.target.value;
    this.setState(() => ({
      passwordConfirm,
    }));
  };
  render() {
    const { username, email, password, passwordConfirm, error } = this.state;
    const isInvalid =
      password !== passwordConfirm ||
      password === '' ||
      email === '' ||
      username === '';
    return (
      <Mutation mutation={SIGN_UP}>
        {(createUser, { client, data: mutationData }) => (
          <AuthForm
            username={username}
            email={email}
            password={password}
            passwordConfirm={passwordConfirm}
            onUsernameChange={this.onUsernameChange}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            onPasswordConfirmChange={this.onPasswordConfirmChange}
            onSubmit={e => {
              e.preventDefault();
              const { username, email, password } = this.state;

              createUser({
                variables: { username, email, password },
              })
                .then(({ data }) => {
                  data.createUser &&
                    localStorage.setItem('token', data.createUser.token);
                  return data;
                })
                .then(data => {
                  client.clearStore();
                  return data;
                })
                .then(data => {
                  if (data.createUser.success) {
                    this.props.history.push(routes.DASHBOARD);
                  } else {
                    this.setState(() => ({ error: data.createUser.message }));
                  }
                });
            }}
            isInvalid={isInvalid}
            error={error}
            buttonText="Sign Up"
          />
        )}
      </Mutation>
    );
  }
}

export default withRouter(SignupForm);
