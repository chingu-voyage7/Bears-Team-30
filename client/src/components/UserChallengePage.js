import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';
import UserSubmissionsList from './UserSubmissionsList';
import GroupSubmissionsList from './GroupSubmissionsList';
import ProgressMessage from './ProgressMessage';

const UserChallengePage = ({ match }) => (
  <Query
    query={GET_USER_CHALLENGE}
    partialRefetch={true}
    variables={{ userChallengeId: match.params.id }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data: { userChallenge } }) => {
      if (loading) return <p className="loading-message">Loading...</p>;
      if (error) return `Error! ${error.message}`;

      const day = Math.ceil(
        (new Date().valueOf() - new Date(userChallenge.createdAt).valueOf()) /
          (1000 * 60 * 60 * 24)
      );

      return (
        <div className="page-content">
          <h3 className="title header">
            100 Days of {userChallenge.challengeGroup.name}
          </h3>
          <p className="user-header">
            Progress: {userChallenge.progress} / {userChallenge.goal}{' '}
            {userChallenge.challengeGroup.goalType}
          </p>
          <ProgressMessage
            progressPercent={
              Number(userChallenge.progress) / Number(userChallenge.goal)
            }
          />
          {userChallenge.status === 'IN_PROGRESS' && day <= 100 && (
            <Link
              className="button-transparent"
              to={`/challenge/${userChallenge.id}/new`}
            >
              Add New
            </Link>
          )}
          <Link
            className="button-transparent m-t-15"
            to={{
              pathname: `/challenge/${userChallenge.id}/settings`,
              state: {
                userChallenge,
              },
            }}
          >
            Challenge Settings
          </Link>
          <div>
            <div>
              <UserSubmissionsList userChallenge={userChallenge} />
            </div>
            <div>
              <GroupSubmissionsList
                challengeGroupId={userChallenge.challengeGroup.id}
              />
            </div>
          </div>
        </div>
      );
    }}
  </Query>
);

export default UserChallengePage;
