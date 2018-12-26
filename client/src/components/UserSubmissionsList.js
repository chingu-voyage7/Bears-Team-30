import React from 'react';
import SubmissionsList from './SubmissionsList';

const UserSubmissionsList = ({ submissions, startDate }) => (
  <div>
    <h4>My Submissions</h4>
    {submissions.length > 0 ? (
      <SubmissionsList startDate={startDate} submissions={submissions} />
    ) : (
      <p>None yet. Try adding something you worked on!</p>
    )}
  </div>
);

export default UserSubmissionsList;
