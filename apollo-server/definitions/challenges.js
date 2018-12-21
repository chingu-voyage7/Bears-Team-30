// priorities:
// myChallenges query: return userChallenges
// userchallenges query

const { gql } = require('apollo-server');

const challengeDefs = gql`
  extend type Query {
    # view list of challenge groups, add filterable by category later
    challengeGroups(category: CategoryType, query: String): [ChallengeGroup!]

    # view a specific challenge group
    challengeGroup(challengeGroupId: ID!): ChallengeGroup

    # view list of challenges belonging to a user
    userChallenges(user: UserIdInput!): [Challenge!]

    # view a user challenge
    userChallenge(userChallengeId: ID!): Challenge

    # optional filter by status
    submission(submissionId: ID!): Submission!

    myChallenges: [Challenge!]

    # skipping for now -- how will this be used?
    # submissions(day: String): [Submission!]!
  }

  extend type Mutation {
    # skipping until we add user generated challenge groups
    # createChallengeGroup(data: CreateChallengeGroupInput!): ChallengeGroup!
    # updateChallengeGroup(challengeGroupId: ID!, data: UpdateChallengeGroupInput!): ChallengeGroup!

    # creates a user's challenge
    createUserChallenge(
      data: CreateChallengeInput!
    ): CreateUserChallengeResponse!

    # skipping for now:
    # deleteChallenge(challengeId: ID!): Challenge!

    # creates a submission for the user with optional image
    createSubmission(
      user: UserIdInput!
      challengeGroup: ID!
      data: CreateSubmissionInput!
    ): Submission!

    updateSubmission(
      submissionId: ID!
      data: UpdateSubmissionInput!
    ): Submission!
  }

  enum CategoryType {
    ART
    HEALTH_WELLNESS
    TECHNOLOGY
  }

  type ChallengeGroup {
    id: ID!
    name: String!
    description: String!
    category: CategoryType!
    goalAction: String!
    goalNumber: Int!
    goalType: String!
    users: [User!]
    # submissions: [Submission!]
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type Challenge {
    id: ID!
    challengeGroup: ChallengeGroup!
    goal: Int!
    status: String!
    progress: Int!
    submissions: [Submission]
    user: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Submission {
    id: ID!
    date: DateTime!
    day: Int!
    image: String
    description: String
    # progress: Int!  how is this different from day?
    user: User!
    # comments: [Comment!]
    # likes: [Like!]
    # favorites: [Favorite!]
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  enum Status {
    PENDING
    IN_PROGRESS
    COMPLETED
    CANCELLED
  }

  input CreateChallengeInput {
    challengeId: ID!
    # startDate: DateTime!
    goal: Int!
    status: Status!
    # user: UserIdInput!
  }

  input UpdateChallengeInput {
    startDate: DateTime
    goal: Int
    status: Status
    progress: Int
  }

  input CreateSubmissionInput {
    # date: DateTime!
    image: String
    description: String
    # progress: Int!
    # user: UserIdInput!
  }

  input UpdateSubmissionInput {
    # date: DateTime
    image: String
    description: String
    progress: Int
  }

  type CreateUserChallengeResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    challenge: Challenge
  }
`;

module.exports = challengeDefs;
