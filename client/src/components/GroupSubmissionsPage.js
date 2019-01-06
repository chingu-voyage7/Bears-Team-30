import React from 'react';
import GroupSubmissionsWrapper from './GroupSubmissionsWrapper';

const GroupSubmissionsPage = ({ match }) => (
  <div>
    <h4>All Group Submissions</h4>
    <GroupSubmissionsWrapper
      amount={20}
      challengeGroupId={match.params.id}
      showPageNumbers
    />
  </div>
);

export default GroupSubmissionsPage;
