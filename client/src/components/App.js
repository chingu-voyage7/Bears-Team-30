import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as routes from '../constants/routes';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
const LandingPage = () => <div>Landing Page</div>;
import DashboardPage from './DashboardPage';
import ChallengeGroupsPage from './ChallengeGroupsPage';

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route path={routes.LANDING} exact component={LandingPage} />
        <Route path={routes.LOGIN} component={LoginPage} />
        <Route path={routes.SIGNUP} component={SignupPage} />
        <Route path={routes.DASHBOARD} component={DashboardPage} />
        <Route path={routes.CHALLENGE_GROUPS} component={ChallengeGroupsPage} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
