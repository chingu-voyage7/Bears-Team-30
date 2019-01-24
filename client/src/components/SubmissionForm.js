import React from 'react';
import { Mutation } from 'react-apollo';

import FormInput from './FormInput';
import {
  GET_USER_SUBMISSIONS,
  GET_GROUP_SUBMISSIONS,
} from '../constants/queries';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

class SubmissionForm extends React.Component {
  state = {
    text: '',
    progress: 0,
  };

  componentDidMount() {
    this.props.submission &&
      this.setState(() => ({
        text: this.props.submission.text,
        progress: this.props.submission.progress,
      }));
  }

  onTextChange = e => {
    const text = e.target.value;

    this.setState(() => ({ text }));
  };

  onProgressBlur = e => {
    const progress = e.target.value;

    if (!progress) {
      this.setState(() => ({ progress: 0 }));
    }
  };

  onProgressChange = e => {
    const progress = e.target.value;

    this.setState(() => ({ progress }));
  };

  render() {
    const {
      mutation,
      mutationType,
      submission,
      userChallengeId,
      challengeGroupId,
      toggleUpdating,
    } = this.props;

    return (
      <Mutation
        mutation={mutationType}
        onCompleted={() =>
          this.props.history.push(`/challenge/${userChallengeId}`)
        }
        update={(proxy, { data }) => {
          // update UserSubmissionsList
          const userData = proxy.readQuery({
            query: GET_USER_SUBMISSIONS,
            variables: { userChallengeId },
          });

          if (data.createSubmission) {
            userData.submissions.push(data.createSubmission.submission);
          } else if (data.updateSubmission) {
            userData.submissions.map(submission => {
              if (submission.id === data.updateSubmission.submission.id) {
                return data.updateSubmission.submission;
              }
              return submission;
            });
          }

          proxy.writeQuery({
            query: GET_USER_SUBMISSIONS,
            variables: { userChallengeId },
            data: userData,
          });

          // update GroupSubmissionsList
          const groupData = proxy.readQuery({
            query: GET_GROUP_SUBMISSIONS,
            variables: { challengeGroupId, amount: 5 },
          });

          if (data.createSubmission) {
            groupData.challengeGroupSubmissions.unshift(
              data.createSubmission.submission
            );
          } else if (data.updateSubmission) {
            groupData.challengeGroupSubmissions.map(submission => {
              if (submission.id === data.updateSubmission.submission.id) {
                return data.updateSubmission.submission;
              }
              return submission;
            });
          }

          proxy.writeQuery({
            query: GET_GROUP_SUBMISSIONS,
            variables: { challengeGroupId, amount: 5 },
            data: groupData,
          });
        }}
      >
        {(mutation, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (

            <form
              onSubmit={e => {
                e.preventDefault();

                const { text, progress } = this.state;

                toggleUpdating();

                mutation({
                  variables: {
                    id: submission ? submission.id : userChallengeId,
                    date: submission ? submission.date : new Date(),
                    progress: Number(progress),
                    text,
                  },
                });
              }}
            >
            <div className="form-edit">
              <p className="small-text">Text</p>
              <FormInput
                id="text"
                label="Text"
                nolabel
                onChange={this.onTextChange}
                value={this.state.text}
              />
            <div className="progress-form">
                <p className="small-text">Added Progress: +</p>
                <FormInput
                  id="progress"
                  label="Progress"
                  nolabel
                  onBlur={this.onProgressBlur}
                  onChange={this.onProgressChange}
                  type="number"
                  value={this.state.progress}
                />
              <p className="small-text">{this.props.goalType}</p>
              </div>
            </div>
              <div className="p-b-15">
              <button type="submit" className="button-transparent">
                {this.props.submission ? 'Update' : 'Add'} Submission
              </button>
            </div>
            </form>

          );
        }}
      </Mutation>
    );
  }
}

export default SubmissionForm;
