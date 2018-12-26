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
    ): SubmissionResponse!

    updateSubmission(
      submissionId: ID!
      data: UpdateSubmissionInput!
    ): SubmissionResponse!

    deleteSubmission(submissionId: ID!): SubmissionResponse!

    createComment(data: CommentInput!): CommentResponse!

    updateComment(commentId: ID!, data: CommentInput!): CommentResponse!

    deleteComment(commentId: ID!): CommentResponse!

    createLike(submissionId: ID!): LikeResponse!

    deleteLike(submissionId: ID!): LikeResponse!

    createFavorite(submissionId: ID!): FavoriteResponse!

    deleteFavorite(submissionId: ID!): FavoriteResponse!
  }

  type Submission {
    id: ID!
    date: DateTime!
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

  type SubmissionResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    submission: Submission
  }

  type CommentResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    comment: Comment
  }

  type LikeResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    like: Like
  }

  type FavoriteResponse implements MutationResponse {
    code: ResponseCodes!
    success: Boolean!
    message: String!
    favorite: Favorite
  }
`;

module.exports = submissionDefs;
