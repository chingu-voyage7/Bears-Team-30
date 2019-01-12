import React from 'react';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';
import { CREATE_SUBMISSION } from '../constants/mutations';
import SubmissionForm from './SubmissionForm';

const AddSubmissionPage = ({ history, match }) => (
  <Query
    query={GET_USER_CHALLENGE}
    variables={{ userChallengeId: match.params.id }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const startDate = new Date(data.userChallenge.createdAt).valueOf();
      const day = Math.ceil((Date.now() - startDate) / (1000 * 60 * 60 * 24));

      return (
        <div>
          <h2>Today's Submission</h2>
          <p>Day {day}</p>
          <SubmissionForm
            goalType={data.userChallenge.challengeGroup.goalType}
            history={history}
            mutation="createSubmission"
            mutationType={CREATE_SUBMISSION}
            userChallengeId={data.userChallenge.id}
          />
        </div>
      );
    }}
  </Query>
);

export default AddSubmissionPage;