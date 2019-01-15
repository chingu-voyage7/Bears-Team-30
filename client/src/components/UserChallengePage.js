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
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h3>100 Days of {userChallenge.challengeGroup.name}</h3>
          <p>
            Progress: {userChallenge.progress} / {userChallenge.goal}{' '}
            {userChallenge.challengeGroup.goalType}
          </p>
          <ProgressMessage
            progressPercent={
              Number(userChallenge.progress) / Number(userChallenge.goal)
            }
          />
          <Link to={`/challenge/${userChallenge.id}/new`}>Add New</Link>
          <UserSubmissionsList userChallenge={userChallenge} />
          <GroupSubmissionsList
            challengeGroupId={userChallenge.challengeGroup.id}
          />
          <Link
            to={{
              pathname: `/challenge/${userChallenge.id}/settings`,
              state: {
                userChallenge,
              },
            }}
          >
            Challenge Settings
          </Link>
        </div>
      );
    }}
  </Query>
);

export default UserChallengePage;
