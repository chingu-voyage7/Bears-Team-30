import React from 'react';

import AuthLink from './AuthLink';

const LandingPage = () => (
  <div>
    <h1>100 Days</h1>
    <p>Commit 100 days to practicing a skill or habit</p>
    <p>Set your own goal and track your progress</p>
    <p>Add submissions describing your day's actions</p>
    <p>Get inspired by other users' submissions</p>
    <p>
      Add a like to interesting submissions, or save the best to your favorites
      list
    </p>
    <p>Start your first challenge today!</p>
    <AuthLink linkText="Sign Up" route="SIGNUP" />
  </div>
);

export default LandingPage;
