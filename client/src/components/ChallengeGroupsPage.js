import React from 'react';

import CHALLENGE_GROUPS from '../constants/challengeGroups';
import CategorySelect from './CategorySelect';
import SearchBar from './SearchBar';
import ChallengeGroupsList from './ChallengeGroupsList';
import JoinChallengeGroupPage from './JoinChallengeGroupPage';

class ChallengeGroupsPage extends React.Component {
  state = {
    category: '',
    query: '',
    showJoinChallenge: false,
    challengeGroup: null,
  };

  onCategoryChange = e => {
    const category = e.target.value;

    this.setState(() => ({ category }));
  };

  onQueryChange = e => {
    const query = e.target.value;

    this.setState(() => ({ query }));
  };

  onChallengeSelect = e => {
    e.preventDefault();
    const challengeGroupId = e.target.value;

    const challengeGroup = CHALLENGE_GROUPS.filter(
      group => group.id === challengeGroupId
    )[0];

    this.setState(() => ({ showJoinChallenge: true, challengeGroup }));
  };

  render() {
    return (
      <div>
        {!this.state.showJoinChallenge && (
          <div>
            <h2>Find a Challenge to Join</h2>
            <SearchBar
              onQueryChange={this.onQueryChange}
              value={this.state.query}
            />
            <CategorySelect
              onCategoryChange={this.onCategoryChange}
              value={this.state.category}
            />
            <ChallengeGroupsList
              category={this.state.category}
              onChallengeSelect={this.onChallengeSelect}
              query={this.state.query}
            />
          </div>
        )}
        {this.state.showJoinChallenge && (
          <JoinChallengeGroupPage challengeGroup={this.state.challengeGroup} />
        )}
      </div>
    );
  }
}

export default ChallengeGroupsPage;
