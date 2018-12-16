import React from 'react';

import USERS from '../constants/users';

const token = localStorage.getItem('token');
const currUser = USERS.find(user => user.id === token);

const Sidebar = ({ onClick }) => (
  <div>
    <h1>100 Days</h1>
    <h5>{currUser.username}</h5>
    <h5>My Challenges</h5>
    {currUser.userChallenges.length > 0
      ? currUser.userChallenges.map(challenge => (
          <button key={challenge.id} onClick={onClick} value={challenge.id}>
            <p>{challenge.challengeGroup.name}</p>
            <p>
              {challenge.startDate} - {challenge.progress}/
              {challenge.goalNumber} {challenge.challengeGroup.goalType}
            </p>
          </button>
        ))
      : 'No challenges joined'}
  </div>
);

export default Sidebar;
