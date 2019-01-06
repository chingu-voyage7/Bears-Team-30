import React from 'react';
import { Link } from 'react-router-dom';

import LikeButton from './LikeButton';
import FavoriteButton from './FavoriteButton';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const SubmissionsList = ({ canEdit, userChallenge, startDate, submissions }) =>
  submissions.map(submission => {
    const day = Math.ceil(
      (new Date(submission.date).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return (
<div className="list-container-item user-item col-xs-12 my-submissions">

      <div key={submission.id} className="content">
        <h5>Day {day}</h5>
        <p>{submission.text}</p>
        {submission.progress && <p>Progress: +{submission.progress}</p>}
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
  });

export default SubmissionsList;
