import React from 'react';
import { Mutation } from 'react-apollo';

import * as routes from '../constants/routes';
import { UPDATE_SUBMISSION, DELETE_SUBMISSION } from '../constants/mutations';
import SubmissionForm from './SubmissionForm';

class UpdateSubmissionPage extends React.Component {
  state = {
    showDelete: false,
  };

  toggleShowDelete = e => {
    e.preventDefault();

    this.setState(prevState => ({ showDelete: !prevState.showDelete }));
  };

  render() {
    const { history, location } = this.props;
    const { submission, userChallenge } = location.state;
    const startDate = new Date(userChallenge.createdAt).valueOf();
    const day = Math.ceil((Date.now() - startDate) / (1000 * 60 * 60 * 24));

    return (
      <Mutation
        mutation={DELETE_SUBMISSION}
        onCompleted={() => history.push(`/challenge/${userChallenge.id}`)}
        variables={{ submissionId: submission.id }}
      >
        {(deleteSubmission, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div>
              {!this.state.showDelete && (
                <div>
                  <h2>Edit Submission</h2>
                  <p>Day {day}</p>
                  <SubmissionForm
                    history={history}
                    mutation="updateSubmission"
                    mutationType={UPDATE_SUBMISSION}
                    submission={submission}
                    userChallengeId={userChallenge.id}
                  />
                  <button onClick={this.toggleShowDelete}>
                    Delete Submission
                  </button>
                </div>
              )}
              {this.state.showDelete && (
                <div>
                  <h3>Delete Submission?</h3>
                  <button onClick={this.toggleShowDelete}>Cancel</button>
                  <button
                    onClick={e => {
                      e.preventDefault();

                      deleteSubmission();
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </Mutation>
    );
  }
}

export default UpdateSubmissionPage;
