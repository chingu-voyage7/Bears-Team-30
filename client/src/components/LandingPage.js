import React from 'react';

import AuthLink from './AuthLink';

const LandingPage = () => (
  <div className="landing-page-container">
    <div className="landing-page-content box-shadow fadeInUp p-b-30">
      <div className="p-t-50 mobile-p-t-5">
        <div className="landing-header box-shadow">
          <h1>
            <span>100</span> DAYS
          </h1>
        </div>
      </div>
      <div className="landing-content">
        <ul className="landing-list">
          <li className="list-item">
            Commit 100 days to practicing a skill or habit
          </li>
          <li className="list-item">
            Set your own goal and track your progress
          </li>
          <li className="list-item">
            Add submissions describing your day's actions
          </li>
          <li className="list-item">
            Get inspired by other users' submissions
          </li>
          <li className="list-item">
            Add a like to interesting submissions, or save the best to your
            favorites list
          </li>
        </ul>
        <p className="m-b-15">Start your first challenge today!</p>
        <div className="button-outer-div box-shadow">
          <AuthLink
            className="log-button m-t-15"
            linkText="Sign Up"
            route="SIGNUP"
          />
        </div>
        <div className="link-button">
          <AuthLink
            className="button-small link-button"
            linkText="Log In"
            route="LOGIN"
          />
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
