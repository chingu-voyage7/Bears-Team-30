import React from 'react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';
import FavoriteButton from './FavoriteButton';

const SubmissionsList = ({
  canEdit,
  handleShowPrevious,
  onLoadMore,
  page,
  showPageNumbers,
  startDate,
  submissions,
  totalPages,
  userChallenge,
}) => (
  <div>
    {submissions.map(submission => {
      const challengeStartDate = startDate
        ? startDate
        : submission.userChallenge.startDate;
      const day = Math.ceil(
        (new Date(submission.date).getTime() -
          new Date(challengeStartDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      const likeCount = submission.likes.length;
      const faveCount = submission.favorites.length;

      return (
        <div key={submission.id}>
          <h5>Day {day}</h5>
          <p>{submission.text}</p>
          <p>Progress: +{submission.progress ? submission.progress : '0'}</p>
          <div>
            <LikeButton submissionId={submission.id} />
            <span>{likeCount}</span>
            <FavoriteButton submissionId={submission.id} />
            {faveCount}
          </div>
          {canEdit && (
            <Link
              to={{
                pathname: `/${submission.id}/edit`,
                state: { userChallenge, submission },
              }}
            >
              Edit
            </Link>
          )}
        </div>
      );
    })}
    {onLoadMore && (
      <div>
        {page > 1 && <button onClick={handleShowPrevious}>Previous</button>}
        {showPageNumbers && (
          <span>
            Page {page}/{totalPages}
          </span>
        )}
        {page < totalPages && <button onClick={onLoadMore}>Next</button>}
      </div>
    )}
  </div>
);

export default SubmissionsList;
