import React from 'react';

import { UPDATE_SUBMISSION } from '../constants/mutations';
import SubmissionForm from './SubmissionForm';

const UpdateSubmissionPage = ({ history, location }) => (
  <div>
    <h2>Edit Submission</h2>
    <p>Day </p>
    <SubmissionForm
      history={history}
      mutation="updateSubmission"
      mutationType={UPDATE_SUBMISSION}
      submission={location.state.submission}
      userChallengeId={location.state.userChallengeId}
    />
  </div>
);

export default UpdateSubmissionPage;
