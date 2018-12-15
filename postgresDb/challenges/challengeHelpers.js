const db = require('../index');
const { makeQuery } = require('../pgHelpers');

module.exports = {getChallengeGroups};

async function getChallengeGroups(){
    
    const client = await db.getClient;
    const challengeGroups = await client.query()

    db.query()
}