import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import * as routes from '../constants/routes';

const GET_USER_CHALLENGE = gql`
  query userChallenge($userChallengeId: ID!) {
    userChallenge(userChallengeId: $userChallengeId) {
      id
      progress
      goal
      challengeGroup {
        name
        goalType
      }
    }
  }
`;

const UserChallengePage = ({ match }) => (
  <Query
    query={GET_USER_CHALLENGE}
    variables={{ userChallengeId: match.params.id }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h3>100 Days of {data.userChallenge.challengeGroup.name}</h3>
          <p>
            Progress: {data.userChallenge.progress} / {data.userChallenge.goal}{' '}
            {data.userChallenge.challengeGroup.goalType}
          </p>
          <Link to={routes.ADD_SUBMISSION}>Add Progress</Link>
        </div>
      );
    }}
  </Query>
);

export default UserChallengePage;
