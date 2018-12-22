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
} = require('./resolvers/auth');

const {
  challengeGroups,
  createUserChallenge,
  userChallenge,
  challengeGroup,
  myChallenges,
  userChallenges,
  Challenge,
  ChallengeGroup,
} = require('./resolvers/challenge');

const {
  createSubmission,
  Submission,
  submissions,
  submission,
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
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser,
    createUserChallenge,
    loginUser,
    createSubmission,
  },
  MutationResponse: {
    __resolveType() {
      return null;
    },
  },
  ChallengeGroup,
  Challenge,
  Submission,
};

module.exports = resolvers;
