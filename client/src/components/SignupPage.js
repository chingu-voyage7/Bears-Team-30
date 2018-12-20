import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import SignupForm from './SignupForm';
import AuthLink from './AuthLink';

const SignupPage = () => (
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

export default SignupPage;
