import React from 'react';

import AuthLink from './AuthLink';

const LandingPage = () => (
  <div className="landing-page-container box-shadow fadeInUp p-b-30">
    <div className="p-t-50 mobile-p-t-5">
      <div className="landing-header box-shadow">
        <h1>
          <span>100</span> DAYS
        </h1>
      </div>
    </div>
    <div className="landing-content">
      Commit 100 days to practicing a skill or habit<br />
      Set your own goal and track your progress<br />
      Add submissions describing your day's actions<br />
      Get inspired by other users submissions<br />
      Add a like to interesting submissions, or save the best to your favorites
      list
      <p className="m-b-15">Start your first challenge today!</p>
      <div className="button-outer-div box-shadow">
        <AuthLink className="log-button" linkText="Sign Up" route="SIGNUP" />
      </div>
    </div>
  </div>
);

export default LandingPage;
