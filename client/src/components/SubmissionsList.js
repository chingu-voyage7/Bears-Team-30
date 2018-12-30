import React from 'react';
import { Link } from 'react-router-dom';

import ActionButton from './ActionButton';
import {
  DELETE_LIKE,
  CREATE_LIKE,
  DELETE_FAVORITE,
  CREATE_FAVORITE,
} from '../constants/mutations';

const SubmissionsList = ({
  canEdit,
  userChallengeId,
  startDate,
  submissions,
}) =>
  submissions.map(submission => {
    const day = Math.ceil(
      (new Date(submission.date).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return (
      <div key={submission.id}>
        <h5>Day {day}</h5>
        <p>{submission.text}</p>
        {submission.progress && <p>Progress: +{submission.progress}</p>}
        <div>
          <ActionButton
            mutations={['createLike', 'deleteLike']}
            mutationTypes={[CREATE_LIKE, DELETE_LIKE]}
            submissionId={submission.id}
            text="❤"
            type="like"
          />
          <ActionButton
            mutations={['createFavorite', 'deleteFavorite']}
            mutationTypes={[CREATE_FAVORITE, DELETE_FAVORITE]}
            submissionId={submission.id}
            text="★"
            type="favorite"
          />
        </div>
        {canEdit && (
          <Link
            to={{
              pathname: `/${submission.id}/edit`,
              state: {
                userChallengeId,
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
