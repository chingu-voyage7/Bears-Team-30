import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const DashboardPage = () => (
  <div className="page-content">
    <Link
      to={routes.CHALLENGE_GROUPS}
      className="dashboard-btn fadeInUp box-shadow"
    >
      Join a Challenge
    </Link>
  </div>
);

export default DashboardPage;
