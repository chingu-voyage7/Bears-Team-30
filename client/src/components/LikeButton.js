import React from 'react';
import { Mutation } from 'react-apollo';

const LikeButton = ({ mutation, mutationType, submissionId, toggleLiked}) => (
  <Mutation mutation={mutationType} variables={{ submissionId }}>
    {(mutation, { loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return <button onClick={e => {
        e.preventDefault();

        mutation().then(data => {
          console.log(data);
          toggleLiked()});
      }}>❤</button>
    }}
  </Mutation>
);

export default LikeButton;
