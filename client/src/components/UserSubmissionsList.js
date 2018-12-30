import React from 'react';
import SubmissionsList from './SubmissionsList';

const UserSubmissionsList = ({ challenge, submissions, startDate }) => (
  <div>
    <h4>My Submissions</h4>
    {submissions.length > 0 ? (
      <SubmissionsList
        startDate={startDate}
        submissions={submissions}
        challenge={challenge}
        canEdit
      />
    ) : (
      <p>None yet. Try adding something you worked on!</p>
    )}
  </div>
);

export default UserSubmissionsList;
