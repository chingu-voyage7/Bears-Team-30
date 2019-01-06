import React from 'react';
import { Mutation } from 'react-apollo';

import FormInput from './FormInput';

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
            <div className="form-edit">
              <p className="small-text">Text</p>
              <FormInput
                id="text"
                label="Text"
                nolabel
                onChange={this.onTextChange}
                value={this.state.text}
              />
              <div>
                <p className="small-text">Added Progress: +</p>
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
