import React, { Fragment } from 'react';
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

      return (
        <div className="submissions-container">
          <h4 className="title header">All Group Submissions</h4>
          {data.challengeGroup.challenges.map(challenge => (
            <Fragment key={challenge.id}>
              {challenge.submissions.length > 0 && (
                <SubmissionsList
                  startDate={challenge.startDate}
                  submissions={challenge.submissions}
                />
              )}
            </Fragment>
          ))}
        </div>
      );
    }}
  </Query>
);

export default GroupSubmissionsList;
