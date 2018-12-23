const { gql } = require('apollo-server');

const submissionDefs = gql`
  extend type Query {
    # optional filter by status
    submission(submissionId: ID!): Submission!

    # show all of a user's submissions for a userchallenge
    submissions(userId: UUID, userChallengeId: Int!): [Submission!]
  }

  extend type Mutation {
    # creates a submission for the user with optional image
    createSubmission(
      userChallengeId: ID!
      data: CreateSubmissionInput!
    ): Submission!

    updateSubmission(
      submissionId: ID!
      data: UpdateSubmissionInput!
    ): Submission!

    deleteSubmission(submissionId: ID!): Submission!

    createComment(data: CommentInput!): Comment!

    updateComment(commentId: ID!, data: CommentInput!): Comment!

    deleteComment(commentId: ID!): Comment!

    createLike(submissionId: ID!): Like!

    deleteLike(submissionId: ID!): Like!

    createFavorite(submissionId: ID!): Favorite!

    deleteFavorite(submissionId: ID!): Favorite!
  }

  type Submission {
    id: ID!
    date: DateTime!
    day: Int!
    image: String
    text: String
    progress: Int!
    user: User!
    comments: [Comment!]
    likes: [Like!]
    favorites: [Favorite!]
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type Comment {
    id: ID!
    text: String!
    creator: User!
    submission: Submission!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type Like {
    id: ID!
    creator: User!
    submission: Submission!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  type Favorite {
    id: ID!
    creator: User!
    submission: Submission!
    updatedAt: DateTime!
    createdAt: DateTime!
  }

  input CreateSubmissionInput {
    date: DateTime!
    day: Int!
    image: String
    text: String
    progress: Int!
  }

  input UpdateSubmissionInput {
    date: DateTime
    image: String
    text: String
    progress: Int
  }

  input CommentInput {
    text: String!
    submissionId: ID!
  }
`;

module.exports = submissionDefs;
