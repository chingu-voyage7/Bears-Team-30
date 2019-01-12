import React from 'react';
import { Link } from 'react-router-dom';
import GroupSubmissionsWrapper from './GroupSubmissionsWrapper';

const GroupSubmissionsList = ({ challengeGroupId }) => (
  <div>
    <h4>Group Submissions</h4>
    <GroupSubmissionsWrapper challengeGroupId={challengeGroupId} amount={5} />
    <Link to={`/groups/${challengeGroupId}/submissions`}>View All</Link>
  </div>
);

export default GroupSubmissionsList;
