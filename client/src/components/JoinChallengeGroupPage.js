import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_CHALLENGE_GROUP } from '../constants/queries';
import * as routes from '../constants/routes';
import GoalSection from './GoalSection';

class JoinChallengeGroupPage extends React.Component {
  state = {
    goalNumber: undefined,
  };

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
    const { challengeGroupId } = this.props;
    return (
      <Query
        query={GET_CHALLENGE_GROUP}
        partialRefetch={true}
        variables={{
          challengeGroupId,
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              <h3>Edit Your Challenge Settings</h3>
              <h4>{data.challengeGroup.name}</h4>
              <p>{data.challengeGroup.description}</p>
              <GoalSection
                challengeGroup={data.challengeGroup}
                value={
                  this.state.goalNumber
                    ? this.state.goalNumber
                    : data.challengeGroup.goalNumber
                }
                onChange={this.onGoalNumberChange}
              />
              <button type="button" onClick={this.onSettingsSave}>
                Save My Settings
              </button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(JoinChallengeGroupPage);
