import React from 'react';
import { Mutation } from 'react-apollo';

import { UPDATE_SUBMISSION } from '../constants/mutations';
import FormInput from './FormInput';

class UpdateSubmissionForm extends React.Component {
  state = {
    text: '',
    progress: 0,
  };

  componentDidMount() {
    const { submission } = this.props.location.state;

    this.setState(() => ({
      text: submission.text,
      progress: submission.progress,
    }));
  }

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
      <Mutation mutation={UPDATE_SUBMISSION}>
        {(updateSubmission, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <form
              onSubmit={e => {
                e.preventDefault();

                const { text, progress } = this.state;
                const { challenge, submission } = this.props.location.state;

                updateSubmission({
                  variables: {
                    submissionId: submission.id,
                    progress: Number(progress),
                    text,
                  },
                }).then(() =>
                  this.props.history.push(`/challenge/${challenge}`)
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
              <button type="submit">Update Submission</button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default UpdateSubmissionForm;
