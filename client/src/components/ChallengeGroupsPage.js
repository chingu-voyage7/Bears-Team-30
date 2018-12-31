import React from 'react';
import { Query } from 'react-apollo';

import { GET_MY_CHALLENGES } from '../constants/queries';
import CategorySelect from './CategorySelect';
import SearchBar from './SearchBar';
import ChallengeGroupsList from './ChallengeGroupsList';
import UserChallengeSettingsPage from './UserChallengeSettingsPage';
import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';



class ChallengeGroupsPage extends React.Component {
  state = {
    category: '',
    userQuery: '',
    showSettingsPage: false,
    challengeGroupId: null,
    userChallengeId: null,
  };

  onCategoryChange = e => {
    const category = e.target.value;

    this.setState(() => ({ category }));
  };

  onUserQueryChange = e => {
    const userQuery = e.target.value;

    this.setState(() => ({ userQuery }));
  };

  onChallengeSelect = data => {
    const challengeGroupId =
      data.createUserChallenge.challenge.challengeGroup.id;
    const userChallengeId = data.createUserChallenge.challenge.id;

    this.setState(() => ({
      showSettingsPage: true,
      challengeGroupId,
      userChallengeId,
    }));
  };

  render() {
    return (
      <Query query={GET_MY_CHALLENGES} partialRefetch={true}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const userChallenges =
            data.myChallenges &&
            data.myChallenges.map(challenge => challenge.challengeGroup.id);

          return (
            <div className="page-content">
              {!this.state.showSettingsPage && (
                <div>
                  <h2 className="title header">Find a Challenge to Join</h2>
                  <SearchBar
                    onUserQueryChange={this.onUserQueryChange}
                    value={this.state.query}
                  />
                  <CategorySelect
                    onCategoryChange={this.onCategoryChange}
                    value={this.state.category}
                  />
                <ChallengeGroupsList
                    category={this.state.category}
                    onChallengeSelect={this.onChallengeSelect}
                    userChallenges={userChallenges}
                    userQuery={this.state.userQuery}
                  />
                </div>
              )}
              {this.state.showSettingsPage && (
                <UserChallengeSettingsPage
                  challengeGroupId={this.state.challengeGroupId}
                  userChallengeId={this.state.userChallengeId}
                />
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ChallengeGroupsPage;
