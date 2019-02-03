import React, { Component } from 'react';

import SubmissionsList from './SubmissionsList';

class UserSubmissionsWrapper extends Component {
  state = {
    page: 1,
  };

  handleShowNext = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleShowPrevious = e => {
    e.preventDefault();

    this.setState(prevState => ({
      page: prevState.page > 1 ? prevState.page - 1 : prevState.page,
    }));
  };

  render() {
    const {
      amount,
      showPageNumbers,
      startDate,
      submissions,
      userChallenge,
    } = this.props;
    const { page } = this.state;

    const currSubmissions = submissions
      .sort(
        (a, b) =>
          new Date(a.createdAt).valueOf() < new Date(b.createdAt).valueOf()
      )
      .filter(
        (submission, ind) =>
          ind >= page * amount - amount && ind < page * amount
      );

    return (
      <SubmissionsList
        handleShowPrevious={this.handleShowPrevious}
        onLoadMore={this.handleShowNext}
        page={page}
        showPageNumbers={showPageNumbers}
        startDate={startDate}
        submissions={currSubmissions}
        totalPages={Math.ceil(submissions.length / amount)}
        userChallenge={userChallenge}
        sortByNewest
      />
    );
  }
}

export default UserSubmissionsWrapper;
