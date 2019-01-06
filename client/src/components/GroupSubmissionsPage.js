import React from 'react';
import GroupSubmissionsWrapper from './GroupSubmissionsWrapper';

const GroupSubmissionsPage = ({ match }) => (
  <div>
    <h4>All Group Submissions</h4>
    <GroupSubmissionsWrapper challengeGroupId={match.params.id} amount={20} />
  </div>
);

export default GroupSubmissionsPage;
