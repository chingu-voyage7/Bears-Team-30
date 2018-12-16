import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import Sidebar from './Sidebar';
class DashboardPage extends React.Component {

  render() {
    return (
      <div>
        <Sidebar onClick={this.onChallengeSelect} />
  <div>
    <h2>My Dashboard</h2>
    <Link to={routes.CHALLENGE_GROUPS}>Join a Challenge</Link>
        </div>
  </div>
);
  }
}

export default DashboardPage;
