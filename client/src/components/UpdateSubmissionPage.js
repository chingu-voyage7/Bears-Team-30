import React from 'react';
import { Mutation } from 'react-apollo';

import { GET_USER_SUBMISSIONS } from '../constants/queries';
import { UPDATE_SUBMISSION, DELETE_SUBMISSION } from '../constants/mutations';
import SubmissionForm from './SubmissionForm';

class UpdateSubmissionPage extends React.Component {
  state = {
    showDelete: false,
    updating: false,
  };

  toggleShowDelete = e => {
    e.preventDefault();

    this.setState(prevState => ({ showDelete: !prevState.showDelete }));
  };

  toggleUpdating = () => {
    this.setState(prevState => ({ updating: !prevState.updating }));
  };

  render() {
    const { history, location } = this.props;
    const {
      submission,
      userChallengeId,
      challengeGroupId,
      challengeStartDate,
    } = location.state;
    const startDate = new Date(challengeStartDate).valueOf();
    const day = Math.ceil((Date.now() - startDate) / (1000 * 60 * 60 * 24));

    return (
      <Mutation
        mutation={DELETE_SUBMISSION}
        onCompleted={() => history.push(`/challenge/${userChallengeId}`)}
        variables={{ submissionId: submission.id }}
        update={(proxy, { data: { deleteSubmission } }) => {
          const data = proxy.readQuery({
            query: GET_USER_SUBMISSIONS,
            variables: { userChallengeId },
          });

          data.submissions = data.submissions.filter(submission => {
            console.log(submission.id, deleteSubmission.submission.id);
            return submission.id !== deleteSubmission.submission.id;
          });

          proxy.writeQuery({
            query: GET_USER_SUBMISSIONS,
            variables: { userChallengeId },
            data,
          });
        }}
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
                    userChallengeId={userChallengeId}
                    challengeGroupId={challengeGroupId}
                    toggleUpdating={this.toggleUpdating}
                  />
                  {!this.state.updating && (
                    <button onClick={this.toggleShowDelete}>
                      Delete Submission
                    </button>
                  )}
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
