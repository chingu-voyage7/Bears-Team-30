import React from 'react';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';
import UserSubmissionsWrapper from './UserSubmissionsWrapper';

const UserSubmissionsPage = ({ location, match }) => {
  const { id } = match.params;

  return (
    <div>
      <h2>My Submissions</h2>
      {location.state ? (
        <UserSubmissionsWrapper
          amount={100}
          startDate={location.state.startDate}
          submissions={location.state.submissions}
          userChallenge={location.state.userChallenge}
        />
      ) : (
        <Query
          query={GET_USER_CHALLENGE}
          partialRefetch={true}
          variables={{ userChallengeId: id }}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <UserSubmissionsWrapper
                amount={100}
                startDate={data.userChallenge.startDate}
                submissions={data.userChallenge.submissions}
                userChallenge={data.userChallenge}
              />
            );
          }}
        </Query>
      )}
    </div>
  );
};

export default UserSubmissionsPage;
