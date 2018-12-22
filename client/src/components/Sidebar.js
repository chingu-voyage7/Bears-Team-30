// TODO: rerun query on joining challenge group

import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import * as routes from '../constants/routes';
import UserChallengesList from './UserChallengesList';

const Sidebar = ({ data }) => (
  <div>
    <Link to={routes.DASHBOARD}>
      <h1>100 Days</h1>
    </Link>
    <h2>{data && data.me && data.me.username}</h2>
    <UserChallengesList />
  </div>
);

export default graphql(gql`
  query ME {
    me {
      username
    }
  }
`)(Sidebar);
