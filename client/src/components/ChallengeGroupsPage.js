import React from 'react';

import CategorySelect from './CategorySelect';
import SearchBar from './SearchBar';
import ChallengeGroupsList from './ChallengeGroupsList';
import JoinChallengeGroupPage from './JoinChallengeGroupPage';

class ChallengeGroupsPage extends React.Component {
  state = {
    category: '',
    userQuery: '',
    showJoinChallenge: false,
    challengeGroupId: null,
  };

  onCategoryChange = e => {
    const category = e.target.value;

    this.setState(() => ({ category }));
  };

  onUserQueryChange = e => {
    const userQuery = e.target.value;

    this.setState(() => ({ userQuery }));
  };

  onChallengeSelect = e => {
    e.preventDefault();
    const challengeGroupId = e.target.value;

    this.setState(() => ({ showJoinChallenge: true, challengeGroupId }));
  };

  render() {
    return (
      <div>
        {!this.state.showJoinChallenge && (
          <div>
            <h2>Find a Challenge to Join</h2>
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
              userQuery={this.state.userQuery}
            />
          </div>
        )}
        {this.state.showJoinChallenge && (
          <JoinChallengeGroupPage
            challengeGroupId={this.state.challengeGroupId}
          />
        )}
      </div>
    );
  }
}

export default ChallengeGroupsPage;
