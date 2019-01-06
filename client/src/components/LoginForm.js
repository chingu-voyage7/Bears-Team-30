import React from 'react';
import { Mutation } from 'react-apollo';

import * as routes from '../constants/routes';
import { LOG_IN } from '../constants/mutations';
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
      <Mutation mutation={LOG_IN}>
        {(loginUser, { client, data }) => (
          <AuthForm
            email={email}
            password={password}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            onSubmit={e => {
              e.preventDefault();
              const { email, password } = this.state;

              loginUser({
                variables: { email, password },
              })
                .then(res => {
                  res.data.loginUser &&
                    localStorage.setItem('token', res.data.loginUser.token);
                })
                .then(() => client.clearStore())
                .then(() => this.props.history.push(routes.DASHBOARD));
            }}
            isInvalid={isInvalid}
            error={error}
            buttonText="Log In"
          />
        )}
      </Mutation>
    );
  }
}

export default LoginForm;
