import React from 'react';
import SubmissionsList from './SubmissionsList';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const UserSubmissionsList = ({ submissions, startDate }) => (
  <div className="submissions-container">
    <h4 className="title header">My Submissions</h4>
    {submissions.length > 0 ? (
      <SubmissionsList startDate={startDate} submissions={submissions} />
    ) : (
      <p className="no-submissions">None yet. Try adding something you worked on!</p>
    )}
  </div>
);

export default UserSubmissionsList;
