import React from 'react';
import { Query, Mutation } from 'react-apollo';

import { GET_CHALLENGE_GROUPS } from '../constants/queries';
import { CREATE_USER_CHALLENGE } from '../constants/mutations';

const ChallengeGroupsList = ({
  category,
  onChallengeSelect,
  userChallenges,
  userQuery,
}) => (
  <Query
    query={GET_CHALLENGE_GROUPS}
    partialRefetch={true}
    variables={{
      userQuery,
      category: !!category ? category : null,
    }}
  >
    {({ loading, error, data: queryData }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          {queryData.challengeGroups.map(group => {
            const isJoined = userChallenges.includes(group.id);
            const displayCategory = group.category
              .toLowerCase()
              .split('_')
              .map(word => word.replace(word[0], word[0].toUpperCase()))
              .join('/');
            return (
              <Mutation
                key={group.id}
                mutation={CREATE_USER_CHALLENGE}
                onCompleted={data => onChallengeSelect(data)}
                partialRefetch={true}
              >
                {(createUserChallenge, { data: mutationData }) => (
                  // feel free to change classNames, 'joined' class is for groups that the user has already joined so add some styling to show a difference
                  <div className={isJoined ? 'joined' : 'group'}>
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <p>{displayCategory}</p>
                    {isJoined ? (
                      <div>Joined!</div>
                    ) : (
                      <button
                        onClick={e => {
                          e.preventDefault();

                          createUserChallenge({
                            variables: {
                              challengeGroupId: group.id,
                              goal: group.goalNumber,
                              startDate: new Date(),
                              status: 'IN_PROGRESS',
                            },
                          });
                        }}
                      >
                        Join Challenge
                      </button>
                    )}
                  </div>
                )}
              </Mutation>
            );
          })}
        </div>
      );
    }}
  </Query>
);

export default ChallengeGroupsList;
