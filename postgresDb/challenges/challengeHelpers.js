const db = require('../index');
const { makeQuery } = require('../pgHelpers');

module.exports = { getChallengeGroups, getChallengeGroupUsers };

async function getChallengeGroups() {
  try {
    const client = await db.getClient();
    const challengeGroupsData = await client.query(
      'SELECT * FROM challenge_groups'
    );
    const userDataPromises = [];

    const challengeGroupIds = challengeGroupsData.rows.map(group => group.id);
    const usersData = {};
    challengeGroupIds.forEach(id => {
      const query = makeQuery({
        query: 'SELECT userid AS id FROM user_challenges',
        clause: 'WHERE',
        clauseProps: { challengeid: id },
        condition: 'LIMIT 10',
      });
      usersData[id] = client.query(query);
      userDataPromises.push(usersData[id]);
    });
    await Promise.all(userDataPromises);
    client.release();

    return { challengeGroupsData, usersData };
  } catch (err) {
    console.error('Error retrieving challenge groups', err);
    throw err;
  }
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
