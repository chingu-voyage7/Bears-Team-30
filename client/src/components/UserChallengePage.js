import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';
import UserSubmissionsList from './UserSubmissionsList';
import GroupSubmissionsList from './GroupSubmissionsList';

const UserChallengePage = ({ match }) => (
  <Query
    query={GET_USER_CHALLENGE}
    partialRefetch={true}
    variables={{ userChallengeId: match.params.id }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h3>100 Days of {data.userChallenge.challengeGroup.name}</h3>
          <p>
            Progress: {data.userChallenge.progress} / {data.userChallenge.goal}{' '}
            {data.userChallenge.challengeGroup.goalType}
          </p>
          <Link to={`/challenge/${data.userChallenge.id}/new`}>Add New</Link>
          <UserSubmissionsList
            startDate={data.userChallenge.createdAt}
            submissions={data.userChallenge.submissions}
            userChallengeId={data.userChallenge.id}
          />
          <GroupSubmissionsList
            challengeGroupId={data.userChallenge.challengeGroup.id}
          />
        </div>
      );
    }}
  </Query>
);

export default UserChallengePage;
