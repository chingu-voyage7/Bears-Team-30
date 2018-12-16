const db = require('../index');
const { makeQuery, makeInsert } = require('../pgHelpers');

module.exports = {
  getChallengeGroups,
  getChallengeGroupUsers,
  insertUserChallenge,
};

function getChallengeGroups() {
  return db.query('SELECT * FROM challenge_groups').catch(err => {
    console.error('Error retrieving challenge groups', err);
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

  values.userid = userid;
  console.log(values);
  const QUERY = makeInsert('user_challenges', values);
  return db
    .query(QUERY)
    .then(res => {
      const userChallenge = res.rows[0];
      console.log('userChallenge', userChallenge);

      return {
        code: 's200',
        success: true,
        message: 'SUCCESS',
        challenge: res.rows,
      };
    })
    .catch(err => {
      console.error('caught db err', err);
      return {
        code: 'e500',
        success: false,
        message: `Internal db error: ${err.message}`,
      };
    });
}
