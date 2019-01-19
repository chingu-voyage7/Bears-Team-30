import React from 'react';
import { Query } from 'react-apollo';

import { ME } from '../constants/queries';
import { CREATE_FAVORITE, DELETE_FAVORITE } from '../constants/mutations';
import ActionButton from './ActionButton';

const FavoriteButton = ({ submissionId }) => (
  <Query query={ME} partialRefetch={true}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const matchedItem = data.me.favorites.find(
        favorite => favorite.submission.id === submissionId
      );

      return (
        <div className="like-button">
          <ActionButton className="like"
            matchedItem={matchedItem}
            mutations={['createFavorite', 'deleteFavorite']}
            mutationTypes={[CREATE_FAVORITE, DELETE_FAVORITE]}
            submissionId={submissionId}
            text="★"
            type="favorite"
          />
          <span>Favorite</span>
        </div>

      );
    }}
  </Query>
);

export default FavoriteButton;
