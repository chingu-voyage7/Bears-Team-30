import React from 'react';
import { Mutation } from 'react-apollo';

import { GET_USER_SUBMISSIONS } from '../constants/queries';
import { UPDATE_SUBMISSION, DELETE_SUBMISSION } from '../constants/mutations';
import SubmissionForm from './SubmissionForm';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

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
        update={(proxy, { data: { deleteSubmission } }) => {
          const data = proxy.readQuery({
            query: GET_USER_SUBMISSIONS,
            variables: { userChallengeId: userChallenge.id },
          });

          data.submissions = data.submissions.filter(submission => {
            console.log(submission.id, deleteSubmission.submission.id);
            return submission.id !== deleteSubmission.submission.id;
          });

          console.log(data);

          proxy.writeQuery({
            query: GET_USER_SUBMISSIONS,
            variables: { userChallengeId: userChallenge.id },
            data,
          });
        }}
      >
        {(deleteSubmission, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <div className="page-content">
              {!this.state.showDelete && (
                <div>
                  <h2 className="title header">Edit Submission</h2>
                  <p className="user-header">Day {day}</p>
                  <SubmissionForm
                    history={history}
                    mutation="updateSubmission"
                    mutationType={UPDATE_SUBMISSION}
                    submission={submission}
                    userChallengeId={userChallenge.id}
                    challengeGroupId={userChallenge.challengeGroup.id}
                  />
                <button className="button-transparent" onClick={this.toggleShowDelete}>
                    Delete Submission
                  </button>
                </div>
              )}
              {this.state.showDelete && (
                <div>
                  <h3 className="title header">Delete Submission?</h3>
                  <button className="button-small-transparent" onClick={this.toggleShowDelete}>Cancel</button>
                  <button
                    className="button-small-transparent"
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
