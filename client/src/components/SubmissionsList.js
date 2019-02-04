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
          <div className="my-submissions box-shadow" key={submission.id}>
            <div className="list-container-item">
              <div className="content">
                <h5>Day {day}</h5>
                <p className="small-font">
                  {months[submissionDate.getMonth()]} {submissionDate.getDate()}
                  , {submissionDate.getFullYear()}
                </p>
                <p className="submission-text">{submission.text}</p>
                {showUsernames && (
                  <span className="username">{submission.user.username}</span>
                )}
                <br />
                <span className="submission-progress">
                  Progress: +{submission.progress ? submission.progress : '0'}
                </span>
                <div className="like-favorite">
                  <LikeButton submissionId={submission.id} />
                  <span className="num-font">{likeCount}</span>
                  <FavoriteButton submissionId={submission.id} />
                  <span className="num-font">{faveCount}</span>
                </div>
                <Query
                  query={ME}
                  fetchPolicy="cache-only"
                  partialRefetch={true}
                >
                  {({ loading, error, data }) => {
                    return (
                      data.me.username === submission.user.username && (
                        <Link
                          className="button-small"
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
            </div>
          </div>
        );
      })}
      {onLoadMore && (
        <div>
          {page > 1 && (
            <button
              className="button-small-transparent"
              onClick={handleShowPrevious}
            >
              Previous
            </button>
          )}
          {showPageNumbers && (
            <span>
              Page {page}/{totalPages}
            </span>
          )}
          {page < totalPages && (
            <button className="button-small-transparent" onClick={onLoadMore}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;
