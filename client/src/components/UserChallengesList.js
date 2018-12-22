import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_MY_CHALLENGES = gql`
  {
    myChallenges {
      id
      createdAt
      progress
      goal
      challengeGroup {
        name
        goalType
      }
    }
  }
`;

const UserChallengesList = ({ onClick }) => (
  <Query query={GET_MY_CHALLENGES}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h3>My Challenges</h3>
          {data.myChallenges.length > 0
            ? data.myChallenges.map(challenge => (
                <button key={challenge.id} onClick={onClick}>
                  <h4>{challenge.challengeGroup.name}</h4>
                  <p>
                    {challenge.progress}/{challenge.goal}{' '}
                    {challenge.challengeGroup.goalType}
                  </p>
                </button>
              ))
            : 'No Challenges Joined'}
        </div>
      );
    }}
  </Query>
);

export default UserChallengesList;
