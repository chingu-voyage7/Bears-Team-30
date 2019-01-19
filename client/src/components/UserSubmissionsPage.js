import React from 'react';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';
import UserSubmissionsWrapper from './UserSubmissionsWrapper';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const UserSubmissionsPage = ({ location, match }) => {
  const { id } = match.params;

  return (
    <div className="page-content">
      <h2 className="title header">My Submissions</h2>
      <div className="list-container width100  col-lg-4 col-md-6 col-sm-6 col-xs-12 m-b-15">
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
    </div>
  );
};

export default UserSubmissionsPage;
