import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';

const UserChallengePage = ({ match }) => (
  <Query
    query={GET_USER_CHALLENGE}
    variables={{ userChallengeId: match.params.id }}
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
          <Link to={`/challenge/${data.userChallenge.id}/new`}>
            Add Progress
          </Link>
        </div>
      );
    }}
  </Query>
);

export default UserChallengePage;
