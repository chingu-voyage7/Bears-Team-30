const UUID = require('graphql-type-uuid');

const {
  createUser,
  auth,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  users,
  me,
  User,
} = require('./resolvers/auth');

const {
  challengeGroups,
  createUserChallenge,
  updateUserChallenge,
  userChallenge,
  challengeGroup,
  myChallenges,
  userChallenges,
  Challenge,
  ChallengeGroup,
  myStuff,
} = require('./resolvers/challenge');

const {
  createSubmission,
  Submission,
  submissions,
  submission,
  challengeGroupSubmissions,
  updateSubmission,
  deleteSubmission,
  createComment,
  updateComment,
  deleteComment,
  Comment,
  createLike,
  deleteLike,
  Like,
  createFavorite,
  deleteFavorite,
  Favorite,
} = require('./resolvers/submissions');

const resolvers = {
  UUID,
  Query: {
    user: getUser,
    auth,
    users,
    me,
    challengeGroups,
    challengeGroup,
    userChallenge,
    userChallenges,
    myChallenges,
    submissions,
    submission,
    challengeGroupSubmissions,
  },
  Mutation: {
    createUser,
    updateUser,
    // deleteUser,
    createUserChallenge,
    updateUserChallenge,
    loginUser,
    createSubmission,
    updateSubmission,
    deleteSubmission,
    createComment,
    updateComment,
    deleteComment,
    createLike,
    deleteLike,
    createFavorite,
    deleteFavorite,
  },
  Subscription: {
    myStuff,
  },
  MutationResponse: {
    __resolveType() {
      return null;
    },
  },
  User,
  ChallengeGroup,
  Challenge,
  Submission,
  Comment,
  Like,
  Favorite,
};

module.exports = resolvers;
