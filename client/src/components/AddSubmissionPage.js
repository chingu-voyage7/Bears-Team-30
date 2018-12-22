import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import AddSubmissionForm from './AddSubmissionForm';

const GET_USER_CHALLENGE = gql`
  query userChallenge($userChallengeId: ID!) {
    userChallenge(userChallengeId: $userChallengeId) {
      id
      progress
      createdAt
      challengeGroup {
        name
        goalType
      }
    }
  }
`;

const AddSubmissionPage = ({ match }) => (
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
          <h2>Add Your Progress for Today</h2>
          <p>Day {day}</p>
          <AddSubmissionForm />
        </div>
      );
    }}
  </Query>
);

export default AddSubmissionPage;
