const db = require('../index');
const {
  makeQuery,
  makeInsert,
  makeUpdate,
  cleanProps,
  renameProp,
} = require('../pgHelpers');

module.exports = {
  getChallengeGroups,
  getChallengeGroupUsers,
  insertUserChallenge,
  getUserChallenge,
  getUserChallenges,
  getMyChallenges,
  getChallengeGroup,
  updateUserChallenge,
};

function getChallengeGroups() {
  return db.query('SELECT * FROM challenge_groups').catch(err => {
    console.error('Error retrieving challenge groups');
    throw new Error('Error retrieving challenge groups');
  });
}

function getChallengeGroup(id) {
  return db
    .query(`SELECT * FROM challenge_groups WHERE id = ${id}`)
    .then(res => {
      const challengeGroup = res.rows[0];
      if (challengeGroup) {
        cleanProps(challengeGroup);
        return challengeGroup;
      }
      return null;
    });
}

function getChallengeGroupUsers(challengeId) {
  const QUERY = `
  SELECT userid AS id, email, username, auth.created_at, auth.updated_at
  FROM user_challenges AS u_c
  INNER JOIN auth ON u_c.userid = auth.id
  WHERE u_c.challengeid = ${challengeId}
  `;
  return db.query(QUERY);
}

//userid, goal, challengeid
function insertUserChallenge(values, userid) {
  if (!userid) {
    return {
      code: 'e405',
      success: false,
      message: 'Invalid authorization header / user not logged in',
    };
  }

  values.userid = `'${userid}'`;
  values.status = `'${values.status}'`;
  const QUERY = makeInsert('user_challenges', values);
  return db
    .query(QUERY)
    .then(res => {
      const challenge = res.rows[0];
      formatUserChallenge(challenge);

      return {
        code: 's200',
        success: true,
        message: 'SUCCESS',
        challenge,
      };
    })
    .catch(err => {
      if (err.code === '23505') {
        return {
          code: 'e415',
          success: false,
          message: 'User has already started this challenge',
        };
      }
      if (err.code === '23503') {
        return {
          code: 'e405',
          success: false,
          message: "Invalid authorization header / user doesn't exist",
        };
      }
      return {
        code: 'e500',
        success: false,
        message: `Internal db error: ${err.message}`,
      };
    });
}

function updateUserChallenge(userChallengeId, valuesObj, userid) {
  
  const QUERY = makeUpdate(
    'user_challenges',
    valuesObj,
    { id: userChallengeId },
    { userid }
  );
  return db.query(QUERY);
}

function getUserChallenge(userChallengeId) {
  return db
    .query(`SELECT * FROM user_challenges WHERE id = ${userChallengeId}`)
    .then(res => {
      const userChallenge = res.rows[0];
      if (userChallenge) {
        cleanProps(userChallenge);
        return userChallenge;
      }
      return null;
    });
}

function getUserChallenges(userInfo) {
  if (userInfo.id) {
    renameProp(userInfo, 'id', 'a.id');
  }
  const QUERY = makeQuery({
    query: 'SELECT a.id, u.* FROM auth a',
    clause: 'INNER JOIN user_challenges u ON a.id = u.userid',
    condition: `WHERE`,
    conditionProps: userInfo,
  });

  console.log(QUERY);
  return db.query(QUERY).then(res => {
    return res.rows.map(row => {
      cleanProps(row);
      return row;
    });
  });
}

function getMyChallenges(id) {
  return db
    .query(`SELECT * FROM user_challenges WHERE userid = '${id}'`)
    .then(res => {
      return res.rows.map(row => {
        cleanProps(row);
        return row;
      });
    });
}

function formatUserChallenge(userChallenge) {
  cleanProps(userChallenge);
  // renameProp(userChallenge, 'challengeid', 'id' );
}
