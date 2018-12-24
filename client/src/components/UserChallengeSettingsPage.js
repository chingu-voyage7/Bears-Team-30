import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import { GET_CHALLENGE_GROUP } from '../constants/queries';
import { UPDATE_USER_CHALLENGE } from '../constants/mutations';
import * as routes from '../constants/routes';
import GoalSection from './GoalSection';

class UserChallengeSettingsPage extends React.Component {
  state = {
    goalNumber: undefined,
  };

  onGoalNumberChange = e => {
    const goalNumber = e.target.value;
    this.setState(() => ({ goalNumber }));
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
            <Mutation mutation={UPDATE_USER_CHALLENGE}>
              {(updateUserChallenge, { data: mutationData }) => (
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
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      const { goalNumber } = this.state;

                      updateUserChallenge({
                        variables: {
                          userChallengeId: this.props.userChallengeId,
                          goal: Number(goalNumber),
                        },
                      }).then(() => this.props.history.push(routes.DASHBOARD));
                    }}
                  >
                    Save My Settings
                  </button>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(UserChallengeSettingsPage);
