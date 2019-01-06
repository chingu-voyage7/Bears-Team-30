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

      return (
        <div className="list-container-item user-item col-xs-12 my-submissions">

        <div key={submission.id} className="content">
          <h5>Day {day}</h5>
          <p>{submission.text}</p>
          <p>Progress: +{submission.progress ? submission.progress : '0'}</p>
            <div className="like-favorite">
              <LikeButton submissionId={submission.id} />
              <FavoriteButton submissionId={submission.id} />
            </div>
          {canEdit && (
            <Link className="button-small"
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
