import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_MY_CHALLENGES } from '../constants/queries';

const UserChallengesList = () => (
  <Query query={GET_MY_CHALLENGES} partialRefetch={true}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h3>My Challenges</h3>
          {data.myChallenges.length > 0
            ? data.myChallenges.map(challenge => (
                <Link key={challenge.id} to={`/challenge/${challenge.id}`}>
                  <h4>{challenge.challengeGroup.name}</h4>
                  <p>
                    {challenge.progress}/{challenge.goal}{' '}
                    {challenge.challengeGroup.goalType}
                  </p>
                </Link>
              ))
            : 'No Challenges Joined'}
        </div>
      );
    }}
  </Query>
);

export default UserChallengesList;
