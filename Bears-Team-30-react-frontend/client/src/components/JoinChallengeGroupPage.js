import React from 'react';
import { withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import CHALLENGE_GROUPS from '../constants/challengeGroups';
import GoalSection from './GoalSection';

class JoinChallengeGroupPage extends React.Component {
  state = {
    goalNumber: 0,
  };

  componentDidMount() {
    const { goalNumber } = this.props.challengeGroup;
    this.setState(() => ({ goalNumber }));
  }

  onGoalNumberChange = e => {
    const goalNumber = e.target.value;
    this.setState(() => ({ goalNumber }));
  };

  onSettingsSave = e => {
    e.preventDefault();

    const { goalNumber } = this.state;
    console.log('goalNumber: ', goalNumber);

    this.props.history.push(routes.DASHBOARD);
  };

  render() {
    const { challengeGroup } = this.props;
    return (
      <div>
        <h3>Edit Your Challenge Settings</h3>
        <h4>{challengeGroup.name}</h4>
        <p>{challengeGroup.description}</p>
        <GoalSection
          challengeGroup={challengeGroup}
          onChange={this.onGoalNumberChange}
          value={this.state.goalNumber}
        />
        <button type="button" onClick={this.onSettingsSave}>
          Save My Settings
        </button>
      </div>
    );
  }
}

export default withRouter(JoinChallengeGroupPage);
