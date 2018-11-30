import React from "react";

import LoginForm from "./LoginForm";
import AuthLink from "./AuthLink";

export class LoginPage extends React.Component {
  componentDidUpdate() {}
  render() {
    return (
      <div>
        <h1>100 Days</h1>
        <LoginForm history={this.props.history} />
        <AuthLink
          linkText="Sign Up!"
          route="SIGNUP"
          text="Don't have an account? "
        />
      </div>
    );
  }
}

export default LoginPage;
