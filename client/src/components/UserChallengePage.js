import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_USER_CHALLENGE } from '../constants/queries';
import UserSubmissionsList from './UserSubmissionsList';
import GroupSubmissionsList from './GroupSubmissionsList';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';


const UserChallengePage = ({ match }) => (
  <Query
    query={GET_USER_CHALLENGE}
    partialRefetch={true}
    variables={{ userChallengeId: match.params.id }}
    fetchPolicy="cache-and-network"
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div className="page-content">
          <h3 className="title header">100 Days of {data.userChallenge.challengeGroup.name}</h3>
          <div className="fadeInUp">
            <p className="user-header">
              Progress: {data.userChallenge.progress} / {data.userChallenge.goal}{' '}
              {data.userChallenge.challengeGroup.goalType}
            </p>
            <Link className="add-new" to={`/challenge/${data.userChallenge.id}/new`}>Add New</Link>
            <div className="submission-list">
              <UserSubmissionsList
                startDate={data.userChallenge.createdAt}
                submissions={data.userChallenge && data.userChallenge.submissions}
              />
            </div>

            <div className="submission-list">
              <GroupSubmissionsList userChallengeId={data.userChallenge.id} />
            </div>

          </div>

        </div>
      );
    }}
  </Query>
);

export default UserChallengePage;
