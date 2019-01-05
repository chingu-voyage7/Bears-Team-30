import React from 'react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';
import FavoriteButton from './FavoriteButton';

const SubmissionsList = ({ canEdit, userChallenge, startDate, submissions }) =>
  submissions.map(submission => {
    const challengeStartDate = startDate
      ? startDate
      : submission.userChallenge.startDate;
    const day =
      Math.ceil(
        new Date(submission.date).getTime() -
          new Date(challengeStartDate).getTime()
      ) /
      (1000 * 60 * 60 * 24);

    return (
      <div key={submission.id}>
        <h5>Day {day}</h5>
        <p>{submission.text}</p>
        {submission.progress && <p>Progress: +{submission.progress}</p>}
        <div>
          <LikeButton submissionId={submission.id} />
          <FavoriteButton submissionId={submission.id} />
        </div>
        {canEdit && (
          <Link
            to={{
              pathname: `/${submission.id}/edit`,
              state: {
                userChallenge,
                submission,
              },
            }}
          >
            Edit
          </Link>
        )}
      </div>
    );
  });

export default SubmissionsList;
