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

export const DELETE_USER_CHALLENGE = gql`
  mutation deleteUserChallenge($userChallengeId: ID!) {
    deleteUserChallenge(userChallengeId: $userChallengeId) {
      success
      code
      message
    }
  }
`;

export const CREATE_SUBMISSION = gql`
  mutation createSubmission(
    $id: ID!
    $date: DateTime!
    $progress: Int!
    $image: String
    $text: String
  ) {
    createSubmission(
      userChallengeId: $id
      data: { date: $date, progress: $progress, image: $image, text: $text }
    ) {
      success
      code
      message
    }
  }
`;

export const UPDATE_SUBMISSION = gql`
  mutation updateSubmission(
    $id: ID!
    $date: DateTime
    $progress: Int
    $image: String
    $text: String
  ) {
    updateSubmission(
      submissionId: $id
      data: { date: $date, progress: $progress, image: $image, text: $text }
    ) {
      success
      code
      message
    }
  }
`;

export const DELETE_SUBMISSION = gql`
  mutation deleteSubmission($submissionId: ID!) {
    deleteSubmission(submissionId: $submissionId) {
      success
      code
      message
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation createLike($id: ID!) {
    createLike(submissionId: $id) {
      success
      code
      message
      like {
        id
      }
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($id: ID!) {
    deleteLike(likeId: $id) {
      success
      code
      message
      like {
        id
      }
    }
  }
`;

export const CREATE_FAVORITE = gql`
  mutation createFavorite($id: ID!) {
    createFavorite(submissionId: $id) {
      success
      code
      message
      favorite {
        id
      }
    }
  }
`;

export const DELETE_FAVORITE = gql`
  mutation deleteFavorite($id: ID!) {
    deleteFavorite(favoriteId: $id) {
      success
      code
      message
      favorite {
        id
      }
    }
  }
`;
