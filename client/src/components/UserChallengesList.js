import React from 'react';
import { NavLink } from 'react-router-dom';
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
                <NavLink key={challenge.id} to={`/challenge/${challenge.id}`}>
                  <h4>{challenge.challengeGroup.name}</h4>
                  <p>
                    {challenge.progress}/{challenge.goal}{' '}
                    {challenge.challengeGroup.goalType}
                  </p>
                </NavLink>
              ))
            : 'No Challenges Joined'}
        </div>
      );
    }}
  </Query>
);

export default UserChallengesList;
