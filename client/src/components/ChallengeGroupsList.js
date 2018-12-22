import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CHALLENGE_GROUPS = gql`
  query challengeGroups($category: CategoryType, $userQuery: String) {
    challengeGroups(category: $category, query: $userQuery) {
      category
      description
      id
      name
    }
  }
`;

const ChallengeGroupsList = ({ category, onChallengeSelect, userQuery }) => (
  <Query
    query={GET_CHALLENGE_GROUPS}
    partialRefetch={true}
    variables={{
      userQuery,
      category: !!category ? category : null,
    }}
  >
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          {data.challengeGroups.map(group => {
            const displayCategory = group.category
              .toLowerCase()
              .split('_')
              .map(word => word.replace(word[0], word[0].toUpperCase()))
              .join('/');
            return (
              <div key={group.id}>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
                <p>{displayCategory}</p>
                <button onClick={onChallengeSelect} value={group.id}>
                  Join Challenge
                </button>
              </div>
            );
          })}
        </div>
      );
    }}
  </Query>
);

export default ChallengeGroupsList;
