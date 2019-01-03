import React from 'react';
import { Query } from 'react-apollo';

import { ME } from '../constants/queries';
import { CREATE_LIKE, DELETE_LIKE } from '../constants/mutations';
import ActionButton from './ActionButton';

const FavoriteButton = ({ submissionId }) => (
  <Query query={ME} partialRefetch={true}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const matchedItem = data.me.likes.find(
        like => like.submission.id === submissionId
      );

      return (
        <ActionButton
          matchedItem={matchedItem}
          mutations={['createLike', 'deleteLike']}
          mutationTypes={[CREATE_LIKE, DELETE_LIKE]}
          submissionId={submissionId}
          text="★"
          type="like"
        />
      );
    }}
  </Query>
);

export default FavoriteButton;
