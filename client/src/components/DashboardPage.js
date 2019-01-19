import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import UserChallengePage from './UserChallengePage';
import '../styles/base.scss';
import '../styles/components/dashboard.scss'


const DashboardPage = props => (
  <div className="page-content">

    <Link to={routes.CHALLENGE_GROUPS} className="dashboard-btn fadeInUp box-shadow">Join a Challenge</Link>
  </div>
);

export default DashboardPage;
