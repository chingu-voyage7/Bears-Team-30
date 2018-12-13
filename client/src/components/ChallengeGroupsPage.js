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
  };

  onCategoryChange = e => {
    const category = e.target.value;

    this.setState(() => ({ category }));
  };

  onQueryChange = e => {
    const query = e.target.value;

    this.setState(() => ({ query }));
  };

  render() {
    return (
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
    );
  }
}

export default ChallengeGroupsPage;
