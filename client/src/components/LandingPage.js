import React from 'react';

import AuthLink from './AuthLink';

import '../styles/login-signup.scss';
import '../styles/base.scss';


const LandingPage = () => (
  <div className="login-signup">
    <div className="fadeInDown">
      <h1 className="fadeInDown">100 DAYS</h1>
      <div className="header-underline"></div>
    </div>
    <div className="fadeInUp">
        <p>Commit 100 days to practicing a skill or habit</p>
        <p>Set your own goal and track your progress</p>
        <p>Add submissions describing your day's actions</p>
        <p>Get inspired by other users submissions</p>
        <p>
          Add a like to interesting submissions, or save the best to your favorites
          list
        </p>
        <p>Start your first challenge today!</p>
        <AuthLink className="landing-button" linkText="Sign Up" route="SIGNUP" />
    </div>
  </div>
);

export default LandingPage;
