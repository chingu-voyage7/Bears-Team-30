import React from 'react';
import { Link } from 'react-router-dom';
import { graphql, Query } from 'react-apollo';

import * as routes from '../constants/routes';
import { ME } from '../constants/queries';
import UserChallengesList from './UserChallengesList';

const Sidebar = ({ history }) => (
  <Query query={ME} partialRefetch={true}>
    {({ loading, error, client, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <Link to={routes.DASHBOARD}>
            <h1>100 Days</h1>
          </Link>
          <h2>{data.me.username}</h2>
          <button
            onClick={e => {
              e.preventDefault();

              localStorage.setItem('token', null);
              client.clearStore().then(() => history.push(routes.LOGIN));
            }}
          >
            Log Out
          </button>
          <UserChallengesList />
        </div>
      );
    }}
  </Query>
);

export default Sidebar;
