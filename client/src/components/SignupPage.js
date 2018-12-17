import React from 'react';

import SignupForm from './SignupForm';
import AuthLink from './AuthLink';

import '../styles/login-signup.scss';


const SignUpPage = ({ history }) => (
  <div className="login-signup">
    <div className="fadeInDown">
      <h1 className="fadeInDown"><span>100</span> DAYS</h1>
      <div className="header-underline"></div>
    </div>

    <div className="fadeInUp">
      <div>
        <SignupForm history={history} />
      </div>
      <div className="login-link">
        <AuthLink
          linkText="Log In"
          route="LOGIN"
          text="Already have an account? "
        />
      </div>
    </div>

  </div>
);

export default SignUpPage;
