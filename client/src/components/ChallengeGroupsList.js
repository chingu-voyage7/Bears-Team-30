import React from 'react';
import {Query, Mutation} from 'react-apollo';

import {GET_CHALLENGE_GROUPS, GET_MY_CHALLENGES} from '../constants/queries';
import {CREATE_USER_CHALLENGE} from '../constants/mutations';

import '../styles/components/challengeGroups.scss';

const ChallengeGroupsList = ({category, onChallengeSelect, userChallenges, userQuery}) => (<Query query={GET_CHALLENGE_GROUPS} partialRefetch={true} variables={{
    userQuery,
    category: !!category
      ? category
      : null
  }}>
  {
    ({loading, error, data: queryData}) => {
      if (loading)
        return 'Loading...';
      if (error)
        return `Error! ${error.message}`;

      return (
        <div className="list-container fadeInUp">
        {
          queryData.challengeGroups.map(group => {
            const isJoined = userChallenges.includes(group.id);
            const displayCategory = group.category.toLowerCase().split('_').map(word => word.replace(word[0], word[0].toUpperCase())).join('/');
            return (<Mutation key={group.id} mutation={CREATE_USER_CHALLENGE} onCompleted={data => onChallengeSelect(data)} update={(proxy, {data: {
                  createUserChallenge
                }}) => {
                const data = proxy.readQuery({query: GET_MY_CHALLENGES});

                data.myChallenges.push(createUserChallenge.challenge);

                proxy.writeQuery({query: GET_MY_CHALLENGES, data});
              }}>
              {
                (createUserChallenge, {data: mutationData}) => (
                // feel free to change classNames, 'joined' class is for groups that the user has already joined so add some styling to show a difference
                <div className="list-container-item group-list-item col-lg-4 col-md-6 col-sm-6 col-xs-12">
                  <div className="content scroll box-shadow p-t-15 p-b-15">
                    <div className={isJoined
                        ? 'joined'
                        : 'group'}>
                        <div className="border-box box-shadow">
                          <h3 className="border">{group.name}</h3>
                        </div>
                      <p>{group.description}</p>
                      <p>{displayCategory}</p>
                      {
                        isJoined
                          ? (<div className="is-joined">Joined!</div>)
                          : (<button className="main-button" onClick={e => {
                              e.preventDefault();

                              createUserChallenge({
                                variables: {
                                  challengeGroupId: group.id,
                                  goal: group.goalNumber,
                                  startDate: new Date(),
                                  status: 'IN_PROGRESS'
                                }
                              });
                            }}>
                            Join Challenge
                          </button>)
                      }
                    </div>
                  </div>
                </div>)
              }
            </Mutation>);
          })
        }
      </div>);
    }
  }
</Query>);

export default ChallengeGroupsList;
