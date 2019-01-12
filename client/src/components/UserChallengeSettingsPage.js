import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';
import { UPDATE_USER_CHALLENGE } from '../constants/mutations';
import GoalSection from './GoalSection';

class UserChallengeSettingsPage extends React.Component {
  state = {
    goalNumber: undefined,
  };

  componentDidMount() {
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
    const { state } = this.props.location;
    const userChallengeId = this.props.match.params.id;

    return (
      <div>
        <h3>Edit Your Challenge Settings</h3>
        {state ? (
          <div>
            <h4>{state.userChallenge.challengeGroup.name}</h4>
            <p>{state.userChallenge.challengeGroup.description}</p>
            <GoalSection
              challengeGroup={state.userChallenge.challengeGroup}
              value={
                this.state.goalNumber === undefined
                  ? state.userChallenge.challengeGroup.goalNumber
                  : this.state.goalNumber
              }
              onBlur={this.onGoalNumberBlur}
              onChange={this.onGoalNumberChange}
            />
          </div>
        ) : (
          <Query
            query={GET_USER_CHALLENGE}
            variables={{ userChallengeId }}
            partialRefetch={true}
          >
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              console.log(data);

              return (
                <div className="page-content">
                  <div className="fadeInUp">
                  <h4  className="user-header">{data.userChallenge.challengeGroup.name}</h4>
                  <p className="small-text header">{data.userChallenge.challengeGroup.description}</p>
                  <GoalSection
                    challengeGroup={data.userChallenge.challengeGroup}
                    value={
                      this.state.goalNumber === undefined
                        ? data.userChallenge.goal
                        : this.state.goalNumber
                    }
                    onBlur={this.onGoalNumberBlur}
                    onChange={this.onGoalNumberChange}
                  />
                </div>
              );
            }}
          </Query>
        )}
        <Mutation mutation={UPDATE_USER_CHALLENGE}>
          {(updateUserChallenge, { data: mutationData }) => (
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
                    `/challenge/${res.data.updateUserChallenge.challenge.id}`
                  )
                );
              }}
            >
              Save My Settings
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(UserChallengeSettingsPage);
