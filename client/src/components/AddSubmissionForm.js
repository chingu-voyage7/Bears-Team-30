import React from 'react';

import FormInput from './FormInput';

const AddSubmissionForm = props => (
  <form onSubmit={props.onSubmit}>
    <FormInput
      id="description"
      label="Description"
      onChange={props.onDescriptionChange}
    />
  </form>
);

export default AddSubmissionForm;
