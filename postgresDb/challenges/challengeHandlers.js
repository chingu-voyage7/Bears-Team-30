
/**
 * Returns all challenge groups
 */
function challengeGroups(){

    return {
        id,
        name,
        description,
        category,
        goalAction,
        goalNumber,
        goalType,
        users,
        submissions: [],
        updatedAt,
        createdAt,
    }
}

/**
 * Returns a specific challenge group
 */
function challengeGroup({id}){

}



/**
 * Returns a user's challenges
 */
function userChallenges(){

}

/**
 * Returns a specific challenge from a specific user
 */
function userChallenge(){

};

/**
 * returns all of user's submissions for a specific challenge
 * @param {*} userid 
 * @param {*} challengid 
 */
function submissions(userid, challengid){

}

/**
 * Returns a specific submission
 * @param {*} submissionId 
 */
function submission(){

}


// Mutations:

/**
 * Creates a user_challenges row and returns a challenge
 */
function startUserChallenge(){

}


/**
 * creates a new submission
 */
function createSubmission(){
    
};

/**
 * Updates a submission
 */
function updateSubmission(){

}

module.exports = {
    challengeGroups, challengeGroup,userChallenges, userChallenge, submissions, submission, startUserChallenge, createSubmission, updateSubmission
}