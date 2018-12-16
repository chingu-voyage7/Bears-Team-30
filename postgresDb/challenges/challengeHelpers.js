const db = require('../index');
const { makeQuery } = require('../pgHelpers');

module.exports = { getChallengeGroups, getChallengeGroupUsers };

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
