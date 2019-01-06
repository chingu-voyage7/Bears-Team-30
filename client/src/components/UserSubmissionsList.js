import React from 'react';
import { Link } from 'react-router-dom';

import UserSubmissionsWrapper from './UserSubmissionsWrapper';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const UserSubmissionsList = ({ userChallenge, submissions, startDate }) => (
  <div className="list-container-item col-lg-4 col-md-6 col-sm-6 col-xs-12">
    <h4 className="title header">My Submissions</h4>
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
      <p className="no-submissions">None yet. Try adding something you worked on!</p>
    )}
  </div>
);

export default UserSubmissionsList;
