import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import { GET_CHALLENGE_GROUP, GET_MY_CHALLENGES } from '../constants/queries';
import { UPDATE_USER_CHALLENGE } from '../constants/mutations';
import * as routes from '../constants/routes';
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
                <div className="page-content">
                  <h3 className="title header">Edit Your Challenge Settings</h3>
                  <h4 className="user-header">{data.challengeGroup.name}</h4>
                  <p className="small-text header">{data.challengeGroup.description}</p>
                  <GoalSection
                    challengeGroup={data.challengeGroup}
                    value={
                      this.state.goalNumber
                        ? this.state.goalNumber
                        : data.challengeGroup.goalNumber
                    }
                    onChange={this.onGoalNumberChange}
                  />
                <div className="p-t-15">
                <button className="button-transparent"
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
