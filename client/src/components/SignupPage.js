import React from 'react';

import SignupForm from './SignupForm';
import AuthLink from './AuthLink';

const SignUpPage = () => (
  <div>
    <h1>100 Days</h1>
    <div>
      <SignupForm />
    </div>
    <AuthLink
      linkText="Log In"
      route="LOGIN"
      text="Already have an account? "
    />
  </div>
);

export default SignUpPage;
