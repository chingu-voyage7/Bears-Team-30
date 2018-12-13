import React, { Component } from 'react';

import CHALLENGE_GROUPS from '../constants/challengeGroups';

class ChallengeGroupsList extends Component {
  renderGroups = group => {
    const isQueryMatch =
      this.props.query === '' ||
      group.name.toLowerCase().includes(this.props.query.toLowerCase()) ||
      group.description.toLowerCase().includes(this.props.query.toLowerCase());
    const isCategoryMatch =
      this.props.category === '' || group.category === this.props.category;

    const category = group.category
      .toLowerCase()
      .split('_')
      .map(word => word.replace(word[0], word[0].toUpperCase()))
      .join('/');

    return (
      <>
        {isQueryMatch && isCategoryMatch && (
          <div>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <p>{category}</p>
            <button onClick={this.props.onChallengeSelect} value={group.id}>
              Join Challenge
            </button>
          </div>
        )}
      </>
    );
  };

  render() {
    return <div>{CHALLENGE_GROUPS.map(group => this.renderGroups(group))}</div>;
  }
}

export default ChallengeGroupsList;
