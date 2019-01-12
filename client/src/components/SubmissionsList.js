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
  showUsernames,
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
        <div className="my-submissions">

        <div key={submission.id} className="content">
          <h5>Day {day}</h5>
          <p>{submission.text}</p>
          {showUsernames && <p>{submission.user.username}</p>}
          <p>Progress: +{submission.progress ? submission.progress : '0'}</p>
          <div className="like-favorite">
            <LikeButton submissionId={submission.id} />
            <span className="num-font">{likeCount}</span>
            <FavoriteButton submissionId={submission.id} />
            <span className="num-font">{faveCount}</span>
          </div>
          {canEdit && (
            <Link className="button-small"
              to={{
                pathname: `/${submission.id}/edit`,
                state: { userChallenge, submission },
              }}
            >
              Edit
            </Link>
          )}
        </div>
      </div>
      );
    })}
    {onLoadMore && (
      <div>
        {page > 1 && <button className="button-small-transparent" onClick={handleShowPrevious}>Previous</button>}
        {showPageNumbers && (
          <span>
            Page {page}/{totalPages}
          </span>
        )}
        {page < totalPages && <button className="button-small-transparent" onClick={onLoadMore}>Next</button>}
      </div>
    )}
  </div>
);

export default SubmissionsList;
