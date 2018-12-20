import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import UserChallengesList from './UserChallengesList';

const Sidebar = ({ data }) => (
  <div>
    <h1>100 Days</h1>
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
