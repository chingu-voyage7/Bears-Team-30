import React from 'react';
import { Query } from 'react-apollo';

import { GET_GROUP_SUBMISSIONS } from '../constants/queries';
import SubmissionsList from './SubmissionsList';

const GroupSubmissionsList = ({ challengeGroupId }) => (
  <Query
    query={GET_GROUP_SUBMISSIONS}
    partialRefetch={true}
    variables={{ challengeGroupId, amount: 5 }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h4>All Group Submissions</h4>
          {data.challengeGroupSubmissions && (
            <SubmissionsList submissions={data.challengeGroupSubmissions} />
          )}
        </div>
      );
    }}
  </Query>
);

export default GroupSubmissionsList;
