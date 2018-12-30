const { cleanProps } = require('../../postgresDb/pgHelpers');
const { PubSub } = require('apollo-server');

const SUCCESS = {
  code: 's200',
  success: true,
  message: 'Success',
};

const FAILURE = {
  code: 'e500',
  success: false,
  message: `Database error`,
};

const pubsub = new PubSub();

function success(res) {
  return { ...SUCCESS, ...res };
}

function failure(err) {
  console.error(err);
  const code = err.code;
  switch (code) {
    case 'e500':
      return FAILURE;
    case 'e416':
      return {
        code,
        success: false,
        message:
          'This entry does not exist, or you do not have permission to modify it.',
      };
    case '23505':
      return {
        code: 'e415',
        success: false,
        message: `Rejected because of duplicate content.`,
      };
    case '23503':
      return {
        code: 'e417',
        success: false,
        message: 'Rejected because of invalid table id.',
      };
    default:
      return { ...FAILURE, message: `DB error: ${err.message}` };
  }
}

function notAuthenticated(id) {
  if (!id) {
    return {
      code: 'e405',
      success: false,
      message: 'User not authenticated.',
    };
  }
  return false;
}

function parseResults(res) {
  const usersArr = [];
  res.rows.forEach(user => {
    cleanProps(user);
    usersArr.push(user);
  });
  return usersArr;
}

function publish(channel, prop = null) {
  return res => {
    const payload = prop ? res[prop] : res;
    pubsub.publish(channel, { [channel]: payload });
    return res;
  };
}

module.exports = {
  success,
  failure,
  notAuthenticated,
  parseResults,
  publish,
  pubsub,
};
