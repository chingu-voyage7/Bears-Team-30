import React from 'react';
import { Mutation } from 'react-apollo';

import FormInput from './FormInput';

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
    const { mutation, mutationType, submission, userChallengeId } = this.props;
    return (
      <Mutation mutation={mutationType}>
        {(mutation, { loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return (
            <form
              onSubmit={e => {
                e.preventDefault();

                const { text, progress } = this.state;

                mutation({
                  variables: {
                    id: submission ? submission.id : userChallengeId,
                    date: submission ? submission.date : new Date(),
                    progress: Number(progress),
                    text,
                  },
                }).then(data => {
                  console.log(data);
                  this.props.history.push(`/challenge/${userChallengeId}`);
                });
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
                  onBlur={this.onProgressBlur}
                  onChange={this.onProgressChange}
                  type="number"
                  value={this.state.progress}
                />
                <p>{this.props.goalType}</p>
              </div>
              <button type="submit">
                {this.props.submission ? 'Update' : 'Add'} Submission
              </button>
            </form>
          );
        }}
      </Mutation>
    );
  }
}

export default SubmissionForm;
