import React from 'react';

import FormInput from './FormInput';

class AddSubmissionForm extends React.Component {
  state = {
    description: '',
    progress: 0,
  };

  onDescriptionChange = e => {
    const description = e.target.value;

    this.setState(() => ({ description }));
  };

  onProgressChange = e => {
    const progress = e.target.value;

    this.setState(() => ({ progress }));
  };

  onSubmit = e => {
    e.preventDefault();

    const { description, progress } = this.state;

    console.log(description, progress);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <FormInput
          id="description"
          label="Description"
          onChange={this.onDescriptionChange}
          value={this.state.description}
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
        <button type="submit">Add Today's Progress</button>
      </form>
    );
  }
}

export default AddSubmissionForm;
