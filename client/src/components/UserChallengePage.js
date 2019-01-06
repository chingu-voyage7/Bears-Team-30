import React from 'react';
import {Link} from 'react-router-dom';
import {Query} from 'react-apollo';

import {GET_USER_CHALLENGE} from '../constants/queries';
import UserSubmissionsList from './UserSubmissionsList';
import GroupSubmissionsList from './GroupSubmissionsList';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const UserChallengePage = ({match}) => (<Query query={GET_USER_CHALLENGE} partialRefetch={true} variables={{
    userChallengeId: match.params.id
  }} fetchPolicy="cache-and-network">
  {
    ({loading, error, data: {
        userChallenge
      }}) => {
      if (loading)
        return 'Loading...';
      if (error)
        return `Error! ${error.message}`;

      return (
      <div className="page-content">
        <h3 className="title header">100 Days of {userChallenge.challengeGroup.name}</h3>
        <div className="fadeInUp">

          <p className="user-header">
            Progress: {userChallenge.progress}
            / {userChallenge.goal}{' '}
            {userChallenge.challengeGroup.goalType}
          </p>
          <Link className="add-new" to={`/challenge/${userChallenge.id}/new`}>Add New</Link>

          <div className="submissions-box">
            <div className="submission-list">

              <UserSubmissionsList startDate={userChallenge.createdAt} submissions={userChallenge.submissions} userChallenge={userChallenge}/>
            </div>
            <div className="submission-list">

              <GroupSubmissionsList challengeGroupId={userChallenge.challengeGroup.id}/>
            </div>

            <div className="submission-list  p-b-15 p-t-15">
              <Link className="add-new" to={{
                  pathname: `/challenge/${userChallenge.id}/settings`,
                  state: {
                    userChallenge
                  }
                }}>
                Challenge Settings
              </Link>
            </div>
          </div>

        </div>
      </div>);
    }
  }
</Query>);

export default UserChallengePage;
