import React from 'react';
import { Mutation } from 'react-apollo';

import { CREATE_SUBMISSION } from '../constants/mutations';
import FormInput from './FormInput';

class AddSubmissionForm extends React.Component {
  state = {
    text: '',
    progress: 0,
  };

  onTextChange = e => {
    const text = e.target.value;

    this.setState(() => ({ text }));
  };

  onProgressChange = e => {
    const progress = e.target.value;

    this.setState(() => ({ progress }));
  };

  render() {
    return (
      <Mutation mutation={CREATE_SUBMISSION}>
        {(createSubmission, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <form
              onSubmit={e => {
                e.preventDefault();

                const { text, progress } = this.state;

                createSubmission({
                  variables: {
                    userChallengeId: this.props.userChallengeId,
                    date: new Date(),
                    progress: Number(progress),
                    text,
                  },
                }).then(() =>
                  this.props.history.push(
                    `/challenge/${this.props.userChallengeId}`
                  )
                );
              }}
            >
              <FormInput
                id="text"
                label="Text"
                onChange={this.onTextChange}
                value={this.state.text}
              />
              <div>
                <p>Added Progress: +</p>
                <FormInput
                  id="progress"
                  label="Progress"
                  nolabel
                  onChange={this.onProgressChange}
                  type="number"
                  value={this.state.progress}
                />
                <p>{this.props.goalType}</p>
              </div>
              <button type="submit">Add Submission</button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default AddSubmissionForm;
