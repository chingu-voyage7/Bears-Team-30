import React from 'react';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import * as routes from '../constants/routes';
import Sidebar from '../components/Sidebar';

const GET_AUTH = gql`
  {
    auth {
      isAuthenticated
    }
  }
`;

const privateRoute = Component => {
  const PrivateRoute = () => (
    <Query query={GET_AUTH}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log(data.auth.isAuthenticated);

        return data.auth.isAuthenticated ? (
          <div>
            <Sidebar />
            <Component />
          </div>
        ) : (
          <Redirect to={routes.LOGIN} />
        );
      }}
    </Query>
  );

  return PrivateRoute;
};

export default privateRoute;
