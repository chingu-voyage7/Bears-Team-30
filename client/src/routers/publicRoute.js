import React from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import * as routes from '../constants/routes';
import { GET_AUTH } from '../constants/queries';

const publicRoute = Component => {
  const PublicRoute = props => (
    <Query query={GET_AUTH}>
      {({ loading, error, data }) => {
        if (loading) return <p className="loading-message">Loading...</p>;
        if (error) return `Error! ${error.message}`;

        return data.auth.isAuthenticated ? (
          <Redirect to={routes.DASHBOARD} />
        ) : (
          <Component {...props} />
        );
      }}
    </Query>
  );

  return PublicRoute;
};

export default publicRoute;
