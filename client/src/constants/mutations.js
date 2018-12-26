import gql from 'graphql-tag';

export const CREATE_USER_CHALLENGE = gql`
  mutation createUserChallenge(
    $challengeGroupId: ID!
    $goal: Int!
    $startDate: DateTime!
    $status: Status!
  ) {
    createUserChallenge(
      data: {
        challengeGroupId: $challengeGroupId
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
        challengeGroup {
          id
        }
      }
    }
  }
`;

export const UPDATE_USER_CHALLENGE = gql`
  mutation updateUserChallenge(
    $userChallengeId: ID!
    $goal: Int
    $progress: Int
    $startDate: DateTime
    $status: Status
  ) {
    updateUserChallenge(
      userChallengeId: $userChallengeId
      data: {
        goal: $goal
        progress: $progress
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
    $progress: Int!
    $image: String
    $text: String
  ) {
    createSubmission(
      userChallengeId: $userChallengeId
      data: { date: $date, progress: $progress, image: $image, text: $text }
    ) {
      success
      code
      message
    }
  }
`;
