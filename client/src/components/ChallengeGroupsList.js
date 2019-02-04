import React from 'react';
import { Query, Mutation } from 'react-apollo';

import { GET_CHALLENGE_GROUPS, GET_MY_CHALLENGES } from '../constants/queries';
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
    {({ loading, error, data: { challengeGroups } }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div className="list-container fadeInUp">
          <p className="no-submissions">
            {challengeGroups.length} group
            {challengeGroups.length !== 1 ? 's' : ''} found
          </p>
          {challengeGroups
            .sort((a, b) => a.name > b.name)
            .map(group => {
              const isJoined = userChallenges.includes(group.id);
              const displayCategory = group.category
                .toLowerCase()
                .split('_')
                .map(word => word.replace(word[0], word[0].toUpperCase()))
                .join('/');
              const membersCount = group.users.length;
              return (
                <Mutation
                  key={group.id}
                  mutation={CREATE_USER_CHALLENGE}
                  onCompleted={data => onChallengeSelect(data)}
                  update={(proxy, { data: { createUserChallenge } }) => {
                    const data = proxy.readQuery({
                      query: GET_MY_CHALLENGES,
                    });

                    data.myChallenges.push(createUserChallenge.challenge);

                    proxy.writeQuery({
                      query: GET_MY_CHALLENGES,
                      data,
                    });
                  }}
                >
                  {(createUserChallenge, { data: mutationData }) => (
                    <div className="list-container-item group-list-item col-lg-4 col-md-6 col-sm-6 col-xs-12">
                      <div
                        className={`content box-shadow p-t-15 p-b-15 ${isJoined &&
                          'is-joined'}`}
                      >
                        <div className="border-box box-shadow">
                          <h3 className="border">{group.name}</h3>
                        </div>
                        <p className="submission-text">{group.description}</p>
                        <p className="small-font">{displayCategory}</p>
                        <p className="submission-progress">
                          {membersCount} members
                        </p>
                        {isJoined ? (
                          <div className="medium-font">Joined!</div>
                        ) : (
                          <button
                            className="button-small"
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
