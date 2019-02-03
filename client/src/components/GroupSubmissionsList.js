import React from 'react';
import { Link } from 'react-router-dom';
import GroupSubmissionsWrapper from './GroupSubmissionsWrapper';

const GroupSubmissionsList = ({ challengeGroupId }) => (
  <div className="list-container col-lg-6 col-md-6 col-sm-6 col-xs-6">
    <h4 className="title header">Group Submissions</h4>
    <GroupSubmissionsWrapper challengeGroupId={challengeGroupId} amount={5} />
    <Link className="button-transparent m-b-15 m-t-15" to={`/groups/${challengeGroupId}/submissions`}>View All</Link>
  </div>
);

export default GroupSubmissionsList;
