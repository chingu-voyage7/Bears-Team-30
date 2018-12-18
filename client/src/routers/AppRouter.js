import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import * as routes from '../constants/routes';
import publicRoute from './publicRoute';
import privateRoute from './privateRoute';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
const LandingPage = () => <div>Landing Page</div>;
import DashboardPage from '../components/DashboardPage';
import ChallengeGroupsPage from '../components/ChallengeGroupsPage';
import AddSubmissionPage from '../components/AddSubmissionPage';

const AppRouter = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route
          path={routes.LANDING}
          exact
          component={publicRoute(LandingPage)}
        />
        <Route path={routes.LOGIN} component={publicRoute(LoginPage)} />
        <Route path={routes.SIGNUP} component={publicRoute(SignupPage)} />
        <Route
          path={routes.DASHBOARD}
          component={privateRoute(DashboardPage)}
        />
        <Route
          path={routes.CHALLENGE_GROUPS}
          component={privateRoute(ChallengeGroupsPage)}
        />
        <Route
          path={routes.ADD_SUBMISSION}
          component={privateRoute(AddSubmissionPage)}
        />
      </div>
    </BrowserRouter>
  </div>
);

export default AppRouter;
