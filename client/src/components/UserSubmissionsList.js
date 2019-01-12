import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_USER_SUBMISSIONS } from '../constants/queries';
import UserSubmissionsWrapper from './UserSubmissionsWrapper';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const UserSubmissionsList = ({ userChallenge }) => (
  <Query
    query={GET_USER_SUBMISSIONS}
    partialRefetch={true}
    variables={{ userChallengeId: userChallenge.id }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div className="list-container-item col-lg-6 col-md-6 col-sm-6 col-xs-12">
          <h4 className="title header">My Submissions</h4>
          {data.submissions.length > 0 ? (
            <div>
              <UserSubmissionsWrapper
                amount={5}
                startDate={userChallenge.startDate}
                submissions={data.submissions}
                userChallenge={userChallenge}
              />
              <Link className="button-transparent"
                to={{
                  pathname: `/challenge/${userChallenge.id}/submissions`,
                  state: {
                    submissions: data.submissions,
                    startDate: userChallenge.startDate,
                    userChallenge,
                  },
                }}
              >
                View All
              </Link>
            </div>
          ) : (
            <p className="no-submissions">None yet. Try adding something you worked on!</p>
          )}
        </div>
      );
    }}
  </Query>
);

export default UserSubmissionsList;
