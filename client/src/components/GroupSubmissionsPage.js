import React from 'react';
import GroupSubmissionsWrapper from './GroupSubmissionsWrapper';

const GroupSubmissionsPage = ({ match }) => (
  <div className="page-content">
    <h4 className="title header">All Group Submissions</h4>
    <div className="list-container-item width100  col-lg-4 col-md-6 col-sm-6 col-xs-12 m-b-15">
    <GroupSubmissionsWrapper
      amount={20}
      challengeGroupId={match.params.id}
      showPageNumbers
    />
    </div>
  </div>
);

export default GroupSubmissionsPage;
