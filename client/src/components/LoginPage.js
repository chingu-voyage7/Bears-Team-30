import React from 'react';

import LoginForm from './LoginForm';
import AuthLink from './AuthLink';

export class LoginPage extends React.Component {
  componentDidUpdate() {}
  render() {
    return (
      <div className="login-signup">
        <div className="fadeInDown">
          <h1 className="fadeInDown">
            <span>100</span> DAYS
          </h1>
          <div className="header-underline" />
        </div>

        <div className="fadeInUp">
          <div>
            <LoginForm history={this.props.history} />
          </div>
          <div className="login-link">
            <AuthLink
              linkText="Sign Up!"
              route="SIGNUP"
              text="Don't have an account? "
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
