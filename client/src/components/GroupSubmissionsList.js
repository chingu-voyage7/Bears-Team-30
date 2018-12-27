import React from 'react';
import { Query } from 'react-apollo';

import { GET_CHALLENGE_GROUP_SUBMISSIONS } from '../constants/queries';
import SubmissionsList from './SubmissionsList';

const GroupSubmissionsList = ({ challengeGroupId }) => (
  <Query
    query={GET_CHALLENGE_GROUP_SUBMISSIONS}
    partialRefetch={true}
    variables={{ challengeGroupId }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      console.log(data);

      return (
        <div>
          <h4>All Group Submissions</h4>
          {data.challengeGroup.challenges.map(challenge => (
            <>
              {challenge.submissions.length > 0 && (
                <SubmissionsList
                  startDate={challenge.startDate}
                  submissions={challenge.submissions}
                />
              )}
            </>
          ))}
        </div>
      );
    }}
  </Query>
);

export default GroupSubmissionsList;
