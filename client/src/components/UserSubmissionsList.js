import React from 'react';
import { Link } from 'react-router-dom';

import UserSubmissionsWrapper from './UserSubmissionsWrapper';

const UserSubmissionsList = ({ userChallenge, submissions, startDate }) => (
  <div>
    <h4>My Submissions</h4>
    {submissions.length > 0 ? (
      <div>
        <UserSubmissionsWrapper
          amount={5}
          startDate={startDate}
          submissions={submissions}
          userChallenge={userChallenge}
        />
        <Link
          to={{
            pathname: `/challenge/${userChallenge.id}/submissions`,
            state: {
              submissions,
              startDate,
              userChallenge,
            },
          }}
        >
          View All
        </Link>
      </div>
    ) : (
      <p>None yet. Try adding something you worked on!</p>
    )}
  </div>
);

export default UserSubmissionsList;
