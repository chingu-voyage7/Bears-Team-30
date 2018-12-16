import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../constants/routes';

const UserChallengePage = ({ challenge }) => (
  <div>
    <h3>100 Days of {challenge.challengeGroup.name}</h3>
    <p>
      Progress: {challenge.progress} / {challenge.goalNumber}{' '}
      {challenge.challengeGroup.goalType}
    </p>
  </div>
);

export default UserChallengePage;
