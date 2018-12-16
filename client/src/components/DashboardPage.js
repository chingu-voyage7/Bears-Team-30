import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';
import USERS from '../constants/users';
import Sidebar from './Sidebar';
import UserChallengePage from './UserChallengePage';

class DashboardPage extends React.Component {
  state = {
    showChallenge: false,
    selectedChallenge: {},
  };

  onChallengeSelect = e => {
    const challengeId = e.target.value;
    const token = localStorage.getItem('token');
    const currUser = USERS.find(user => user.id === token);

    const selectedChallenge = currUser.userChallenges.find(
      challenge => challenge.id === challengeId
    );

    this.setState(() => ({
      showChallenge: true,
      selectedChallenge,
    }));
  };

  render() {
    return (
      <div>
        <Sidebar onClick={this.onChallengeSelect} />
        <div>
          <h2>My Dashboard</h2>
          {this.state.showChallenge ? (
            <UserChallengePage challenge={this.state.selectedChallenge} />
          ) : (
            <Link to={routes.CHALLENGE_GROUPS}>Join a Challenge</Link>
          )}
        </div>
      </div>
    );
  }
}

export default DashboardPage;
