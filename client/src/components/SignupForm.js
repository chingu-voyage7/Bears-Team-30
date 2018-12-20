import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import * as routes from '../constants/routes';
import AuthForm from './AuthForm';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null,
};

const SIGN_UP = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      success
      code
      message
      token
    }
  }
`;

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
        {(createUser, { data }) => (
          <AuthForm
            username={username}
            email={email}
            password={password}
            passwordConfirm={passwordConfirm}
            onUsernameChange={this.onUsernameChange}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            onPasswordConfirmChange={this.onPasswordConfirmChange}
            onSubmit={event => {
              event.preventDefault();
              const { username, email, password } = this.state;
              const { history } = this.props;
              console.log(username, email, password, history);
              createUser({ variables: { username, email, password } }).then(
                ({ data }) => {
                  console.log('data: ', data);
                  this.setState(() => ({ ...INITIAL_STATE }));
                  if (data.createUser.success) {
                    localStorage.setItem('token', data.createUser.token);
                    this.props.history.push(routes.DASHBOARD);
                  }
                }
              );
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
