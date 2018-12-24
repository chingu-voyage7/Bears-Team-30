import gql from 'graphql-tag';

export const CREATE_USER_CHALLENGE = gql`
  mutation createUserChallenge(
    $challengeId: ID!
    $goal: Int!
    $startDate: DateTime!
    $status: Status!
  ) {
    createUserChallenge(
      data: {
        challengeId: $challengeId
        goal: $goal
        startDate: $startDate
        status: $status
      }
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

export const CREATE_SUBMISSION = gql`
  mutation createSubmission(
    $userChallengeId: ID!
    $date: DateTime!
    $day: Int!
    $progress: Int!
    $image: String
    $text: String
  ) {
    createSubmission(
      userChallengeId: $userChallengeId
      data: {
        date: $date
        day: $day
        progress: $progress
        image: $image
        text: $text
      }
    ) {
      id
    }
  }
`;
