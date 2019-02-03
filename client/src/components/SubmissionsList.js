import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { ME } from '../constants/queries';
import LikeButton from './LikeButton';
import FavoriteButton from './FavoriteButton';

const SubmissionsList = ({
  challengeGroupId,
  handleShowPrevious,
  onLoadMore,
  page,
  showPageNumbers,
  showUsernames,
  startDate,
  submissions,
  totalPages,
  userChallenge,
}) => {
  return (
    <div>
      {submissions.map(submission => {
        const challengeStartDate = startDate
          ? startDate
          : submission.userChallenge.startDate;
        const submissionDate = new Date(submission.date);
        const day = Math.ceil(
          (submissionDate.getTime() - new Date(challengeStartDate).getTime()) /
            (1000 * 60 * 60 * 24)
        );

        const likeCount = submission.likes.length;
        const faveCount = submission.favorites.length;

        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];

        return (
          <div key={submission.id}>
            <h5>Day {day}</h5>
            <p>
              {months[submissionDate.getMonth()]} {submissionDate.getDate()},{' '}
              {submissionDate.getFullYear()}
            </p>
            <p>{submission.text}</p>
            {showUsernames && <p>{submission.user.username}</p>}
            <p>Progress: +{submission.progress ? submission.progress : '0'}</p>
            <div>
              <LikeButton submissionId={submission.id} />
              <span>{likeCount}</span>
              <FavoriteButton submissionId={submission.id} />
              {faveCount}
            </div>
            <Query query={ME} fetchPolicy="cache-only" partialRefetch={true}>
              {({ loading, error, data }) => {
                return (
                  data.me.username === submission.user.username && (
                    <Link
                      to={{
                        pathname: `/${submission.id}/edit`,
                        state: {
                          userChallengeId: userChallenge
                            ? userChallenge.id
                            : submission.userChallenge.id,
                          challengeGroupId: userChallenge
                            ? userChallenge.challengeGroup.id
                            : challengeGroupId,
                          challengeStartDate: userChallenge
                            ? userChallenge.startDate
                            : submission.userChallenge.startDate,
                          submission,
                        },
                      }}
                    >
                      Edit
                    </Link>
                  )
                );
              }}
            </Query>
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
};

export default SubmissionsList;
