import React from 'react';
import { Mutation } from 'react-apollo';

import { ME } from '../constants/queries';

const ActionButton = ({
  mutations,
  mutationTypes,
  submissionId,
  text,
  matchedItem,
}) => {
  const index = !matchedItem ? 0 : 1;
  const mutationType = mutationTypes[index];
  const mutation = mutations[index];
  const id = !!matchedItem ? matchedItem.id : submissionId;

  return (
    <Mutation
      mutation={mutationType}
      variables={{ id }}
      refetchQueries={[{ query: ME }]}
    >
      {(mutation, { client, data }) => (
        <button
          onClick={e => {
            e.preventDefault();

            mutation();
          }}
          style={{ background: !!matchedItem ? '#927385' : 'white' }}
        >
          {text}
        </button>
      )}
    </Mutation>
  );
};

export default ActionButton;
