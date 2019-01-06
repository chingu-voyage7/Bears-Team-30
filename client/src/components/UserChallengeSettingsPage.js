import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import { GET_CHALLENGE_GROUP } from '../constants/queries';
import { UPDATE_USER_CHALLENGE } from '../constants/mutations';
import GoalSection from './GoalSection';

class UserChallengeSettingsPage extends React.Component {
  state = {
    goalNumber: undefined,
  };

  componentDidMount() {
    console.log(this.props.location.state);
    this.props.location.state &&
      this.setState(() => ({
        goalNumber: this.props.location.state.userChallenge.goal,
      }));
  }

  onGoalNumberBlur = e => {
    const goalNumber = e.target.value;

    if (!goalNumber) {
      this.setState(() => ({
        goalNumber: this.props.location.state.userChallenge.goal,
      }));
    }
  };

  onGoalNumberChange = e => {
    const goalNumber = e.target.value;

    this.setState(() => ({ goalNumber }));
  };

  render() {
    const challengeGroupId = this.props.location.state.userChallenge
      .challengeGroup.id;
    const userChallengeId = this.props.location.state.userChallenge.id;
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
                      this.state.goalNumber === undefined
                        ? data.challengeGroup.goalNumber
                        : this.state.goalNumber
                    }
                    onBlur={this.onGoalNumberBlur}
                    onChange={this.onGoalNumberChange}
                  />
                  <button
                    type="button"
                    onClick={e => {
                      e.preventDefault();
                      const { goalNumber } = this.state;

                      updateUserChallenge({
                        variables: {
                          userChallengeId,
                          goal: Number(goalNumber),
                        },
                      }).then(res =>
                        this.props.history.push(
                          `/challenge/${
                            res.data.updateUserChallenge.challenge.id
                          }`
                        )
                      );
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
