import gql from 'graphql-tag';

export const CREATE_USER_CHALLENGE = gql`
  mutation createUserChallenge(
    $challengeId: ID!
    $goal: Int!
    $status: Status!
  ) {
    createUserChallenge(
      data: { challengeId: $challengeId, goal: $goal, status: $status }
    ) {
      success
      code
      message
      challenge {
        id
      }
    }
  }
`;
