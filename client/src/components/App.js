import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import * as routes from "../../constants/routes";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
const LandingPage = () => <div>Landing Page</div>;
const DashboardPage = () => <div>Dashboard Page</div>;

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Route path={routes.LANDING} exact component={LandingPage} />
        <Route path={routes.LOGIN} component={LoginPage} />
        <Route path={routes.SIGNUP} component={SignupPage} />
        <Route path={routes.DASHBOARD} component={DashboardPage} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
