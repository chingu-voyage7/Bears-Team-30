import React from 'react';
import { Query } from 'react-apollo';

import { ME, GET_LIKED } from '../constants/queries';
import { CREATE_LIKE, DELETE_LIKE } from '../constants/mutations';
import ActionButton from './ActionButton';

const LikeButton = ({ submissionId }) => (
  <Query query={GET_LIKED} partialRefetch={true} variables={{ submissionId }}>
    {({ loading, error, client, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      const { me } = client.readQuery({
        query: ME,
      });

      const likedBy = data.submission.likes.map(like => like.creator.id);
      const likes = data.submission.likes.map(like => like.id);
      const existingId = likes[likedBy.indexOf(me.id)];

      return (
        <ActionButton
          existingId={existingId}
          mutations={['createLike', 'deleteLike']}
          mutationTypes={[CREATE_LIKE, DELETE_LIKE]}
          submissionId={submissionId}
          text="❤"
          type="like"
        />
      );
    }}
  </Query>
);

export default LikeButton;
