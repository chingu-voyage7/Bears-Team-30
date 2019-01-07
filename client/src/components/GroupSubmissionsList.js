import React from 'react';
import { Link } from 'react-router-dom';
import GroupSubmissionsWrapper from './GroupSubmissionsWrapper';

const GroupSubmissionsList = ({ challengeGroupId }) => (
  <div className="list-container-item col-lg-4 col-md-6 col-sm-6 col-xs-12">
    <h4 className="title header">Group Submissions</h4>
    <GroupSubmissionsWrapper challengeGroupId={challengeGroupId} amount={5} />
    <Link className="button-transparent m-b-15 m-t-15" to={`/groups/${challengeGroupId}/submissions`}>View All</Link>
  </div>
);

export default GroupSubmissionsList;
