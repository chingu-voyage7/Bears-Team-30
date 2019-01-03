import React from 'react';
import { Query } from 'react-apollo';

import { ME, GET_FAVORITED } from '../constants/queries';
import { CREATE_FAVORITE, DELETE_FAVORITE } from '../constants/mutations';
import ActionButton from './ActionButton';

const LikeButton = ({ submissionId }) => (
  <Query
    query={GET_FAVORITED}
    partialRefetch={true}
    variables={{ submissionId }}
  >
    {({ loading, error, client, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const { me } = client.readQuery({
        query: ME,
      });

      const favoritedBy = data.submission.favorites.map(
        favorite => favorite.creator.id
      );
      const favorites = data.submission.favorites.map(favorite => favorite.id);
      const existingId = favorites[favoritedBy.indexOf(me.id)];

      return (
        <ActionButton
          existingId={existingId}
          mutations={['createFavorite', 'deleteFavorite']}
          mutationTypes={[CREATE_FAVORITE, DELETE_FAVORITE]}
          submissionId={submissionId}
          text="★"
          type="favorite"
        />
      );
    }}
  </Query>
);

export default LikeButton;
