import React from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_MY_CHALLENGES } from '../constants/queries';

import '../styles/sidebar.scss';


const UserChallengesList = () => (
  <Query query={GET_MY_CHALLENGES} partialRefetch={true}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div className="challenges">
          <h3>My Challenges</h3>
          {data.myChallenges.length > 0
            ? data.myChallenges
                .sort((a, b) => a.startDate > b.startDate)
                .map(challenge => {
                  const day = Math.ceil(
                    (new Date().getTime() -
                      new Date(challenge.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  );

                  const status = challenge.status
                    .toLowerCase()
                    .split('_')
                    .map(word =>
                      word
                        .charAt(0)
                        .toUpperCase()
                        .concat(word.slice(1))
                    )
                    .join(' ');
                  return (
                    <div className="link-hover">

                    <NavLink
                      key={challenge.id}
                      to={`/challenge/${challenge.id}`}
                      activeClassName="active"
                    >
                      <h4>{challenge.challengeGroup.name}</h4>
                      <span>Day {day}</span>
                      <p>{status}</p>
                      <p>
                        {challenge.progress}/{challenge.goal}{' '}
                        {challenge.challengeGroup.goalType}
                      </p>
                    </NavLink>
                  </div>
                  );
                })
            : 'No Challenges Joined'}
        </div>
      );
    }}
  </Query>
);

export default UserChallengesList;
