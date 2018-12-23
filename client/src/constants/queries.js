import gql from 'graphql-tag';

export const GET_MY_CHALLENGES = gql`
  {
    myChallenges {
      id
      createdAt
      progress
      goal
      challengeGroup {
        id
        name
        goalType
      }
    }
  }
`;
