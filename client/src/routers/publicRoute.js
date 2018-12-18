import React from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import * as routes from '../constants/routes';

const GET_AUTH = gql`
  {
    auth {
      isAuthenticated
    }
  }
`;

const publicRoute = Component => {
  const PublicRoute = () => (
    <Query query={GET_AUTH}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log(data.auth.isAuthenticated);

        return data.auth.isAuthenticated ? (
          <Redirect to={routes.DASHBOARD} />
        ) : (
          <Component />
        );
      }}
    </Query>
  );

  return PublicRoute;
};

export default publicRoute;
