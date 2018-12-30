import React from 'react';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';

import * as routes from '../constants/routes';
import { GET_AUTH } from '../constants/queries';
import Sidebar from '../components/Sidebar';

const privateRoute = Component => {
  const PrivateRoute = props => (
    <Query query={GET_AUTH}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        console.log(data.auth.isAuthenticated);

        return data.auth.isAuthenticated ? (
          <div>
            <Sidebar />
            <Component {...props} />
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
