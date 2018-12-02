import React from 'react';

import SignupForm from './SignupForm';
import AuthLink from './AuthLink';

const SignUpPage = ({ history }) => (
  <div>
    <h1>100 Days</h1>
    <div>
      <SignupForm history={history} />
    </div>
    <AuthLink
      linkText="Log In"
      route="LOGIN"
      text="Already have an account? "
    />
  </div>
);

export default SignUpPage;
