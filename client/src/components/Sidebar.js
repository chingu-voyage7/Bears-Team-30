import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Sidebar = ({ data }) => (
  <div>
    <h1>100 Days</h1>
    <h5>{data && data.me && data.me.username}</h5>
    <h5>My Challenges</h5>
  </div>
);

export default graphql(gql`
  query ME {
    me {
      username
    }
  }
`)(Sidebar);
