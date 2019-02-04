import React from 'react';
import { NavLink } from 'react-router-dom';
import { Query } from 'react-apollo';

import { GET_MY_CHALLENGES } from '../constants/queries';

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
                    (new Date().valueOf() -
                      new Date(challenge.createdAt).valueOf()) /
                      (1000 * 60 * 60 * 24)
                  );

                  const status =
                    challenge.status === 'IN_PROGRESS' && day > 100
                      ? 'Completed'
                      : challenge.status
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
                    <div className="link-hover" key={challenge.id}>
                      <NavLink
                        to={`/challenge/${challenge.id}`}
                        activeClassName="active"
                      >
                        <div className="navlink-content">
                          <h4>{challenge.challengeGroup.name}</h4>
                          <span>Day {day}</span>
                          <p>{status}</p>
                          <p>
                            {challenge.progress}/{challenge.goal}{' '}
                            {challenge.challengeGroup.goalType}
                          </p>
                        </div>
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
