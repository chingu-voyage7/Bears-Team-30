import React from 'react';
import { Mutation } from 'react-apollo';

import { GET_LIKED, GET_FAVORITED } from '../constants/queries';

const ActionButton = ({
  mutations,
  mutationTypes,
  submissionId,
  text,
  type,
  existingId,
}) => {
  const index = !existingId ? 0 : 1;
  const mutation = mutations[index];
  const id = !!existingId ? existingId : submissionId;
  const create = mutations[0];
  return (
    <Mutation
      mutation={mutationTypes[index]}
      variables={{ id }}
      refetchQueries={[
        {
          query: GET_LIKED,
          variables: { submissionId },
        },
        {
          query: GET_FAVORITED,
          variables: { submissionId },
        },
      ]}
    >
      {(mutation, { data }) => (
        <button
          onClick={e => {
            e.preventDefault();

            mutation();
          }}
          style={{ background: !!existingId ? 'red' : 'white' }}
        >
          {text}
        </button>
      )}
    </Mutation>
  );
};

export default ActionButton;
