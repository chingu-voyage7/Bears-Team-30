const { gql } = require('apollo-server');

const challengeDefs = gql`
  extend type Query {
    # view list of challenge groups, add filterable by category later
    challengeGroups: [ChallengeGroup!]

    # view a specific challenge group
    challengeGroup(challengeGroupId: ID!): ChallengeGroup

    # view list of challenges belonging to a user
    userChallenges(user: UserIdInput!): [Challenge!]

    # view a user challenge
    userChallenge(userChallengeId: ID!): Challenge

    myChallenges: [Challenge!]
  }

  extend type Mutation {
    # skipping until we add user generated challenge groups
    # createChallengeGroup(data: CreateChallengeGroupInput!): ChallengeGroup!
    # updateChallengeGroup(challengeGroupId: ID!, data: UpdateChallengeGroupInput!): ChallengeGroup!

    # creates a user's challenge
    createUserChallenge(data: CreateChallengeInput!): UserChallengeResponse!

    updateUserChallenge(
      userChallengeId: ID!
      data: UpdateChallengeInput!
    ): UserChallengeResponse!

    # skipping for now:
    # deleteUserChallenge(userChallengeId: ID!): UserChallengeResponse!
  }

  type ChallengeGroup {
    id: ID!
    name: String!
    description: String!
    category: String!
    goalAction: String!
    goalNumber: Int!
    goalType: String!
    users: [User!]
    challenges: [Challenge!]
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type Challenge {
    id: ID!
    challengeGroup: ChallengeGroup!
    startDate: DateTime!
    goal: Int!
    status: String!
    progress: Int!
    submissions: [Submission]
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum Status {
    PENDING
    IN_PROGRESS
    COMPLETED
    CANCELLED
  }

  input CreateChallengeInput {
    challengeGroupId: ID!
    startDate: DateTime!
    goal: Int!
    status: Status!
    # user: UserIdInput!
  }

  input UpdateChallengeInput {
    startDate: DateTime
    goal: Int
    progress: Int
    status: Status
  }

  type UserChallengeResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    challenge: Challenge
  }
`;

module.exports = challengeDefs;
