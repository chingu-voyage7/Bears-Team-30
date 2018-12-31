import React from 'react';
import SubmissionsList from './SubmissionsList';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const GroupSubmissionsList = ({ userChallengeId }) => (
  <Query query={GET_USER_CHALLENGE} variables={{ userChallengeId }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      console.log(data);

      return (
        <div className="submissions-container">
          <h4 className="title header">All Group Submissions</h4>
          {data.userChallenge.submissions.length > 0 ? (
            <SubmissionsList
              startDate={data.userChallenge.startDate}
              submissions={data.userChallenge.submissions}
            />
          ) : (
            <p className="no-submissions">None yet. Try adding something you worked on!</p>
          )}
        </div>
      );
    }}
  </Query>
);

export default GroupSubmissionsList;
