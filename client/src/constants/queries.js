import gql from 'graphql-tag';

export const GET_AUTH = gql`
  {
    auth {
      isAuthenticated
    }
  }
`;

export const ME = gql`
  {
    me {
      id
      username
      email
      likes {
        id
        submission {
          id
        }
      }
      favorites {
        id
        submission {
          id
        }
      }
      comments {
        id
        submission {
          id
        }
      }
    }
  }
`;

export const GET_MY_CHALLENGES = gql`
  {
    myChallenges {
      id
      progress
      createdAt
      startDate
      goal
      challengeGroup {
        id
        name
        goalType
      }
      submissions {
        id
        date
        image
        text
        progress
      }
    }
  }
`;

export const GET_USER_CHALLENGE = gql`
  query userChallenge($userChallengeId: ID!) {
    userChallenge(userChallengeId: $userChallengeId) {
      id
      progress
      createdAt
      startDate
      goal
      challengeGroup {
        id
        name
        goalType
      }
      submissions {
        id
        date
        image
        text
        progress
      }
    }
  }
`;

export const GET_CHALLENGE_GROUPS = gql`
  query challengeGroups($category: CategoryType, $userQuery: String) {
    challengeGroups(category: $category, query: $userQuery) {
      category
      description
      id
      name
      goalAction
      goalNumber
      goalType
    }
  }
`;

export const GET_CHALLENGE_GROUP = gql`
  query challengeGroup($challengeGroupId: ID!) {
    challengeGroup(challengeGroupId: $challengeGroupId) {
      category
      description
      id
      name
      goalAction
      goalNumber
      goalType
    }
  }
`;

export const GET_CHALLENGE_GROUP_SUBMISSIONS = gql`
  query challengeGroup($challengeGroupId: ID!) {
    challengeGroup(challengeGroupId: $challengeGroupId) {
      id
      challenges {
        id
        startDate
        submissions {
          id
          date
          text
          image
          user {
            username
          }
        }
      }
    }
  }
`;
