import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const DashboardPage = () => (
  <div>
    <h2>My Dashboard</h2>
    <Link to={routes.CHALLENGE_GROUPS}>Join a Challenge</Link>
  </div>
);

export default DashboardPage;
