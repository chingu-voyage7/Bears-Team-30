import React from 'react';
import { Query } from 'react-apollo';

import {
  GET_GROUP_SUBMISSIONS_COUNT,
  GET_GROUP_SUBMISSIONS,
} from '../constants/queries';
import SubmissionsList from './SubmissionsList';

class GroupSubmissionsList extends React.Component {
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
    return (
      <Query
        query={GET_GROUP_SUBMISSIONS_COUNT}
        variables={{ challengeGroupId: this.props.challengeGroupId }}
        partialRefetch={true}
      >
        {({ loading, error, data: { challengeGroup } }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const submissionsCount = challengeGroup.challenges.reduce(
            (tot, curr) => (tot += curr.submissions.length),
            0
          );

          return (
            <Query
              query={GET_GROUP_SUBMISSIONS}
              partialRefetch={true}
              variables={{
                challengeGroupId: this.props.challengeGroupId,
                amount: 5,
              }}
              notifyOnNetworkStatusChange={true}
            >
              {({ loading, error, client, data, fetchMore }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                const submissions = data.challengeGroupSubmissions.filter(
                  (submission, ind) =>
                    ind >= this.state.page * 5 - 5 && ind < this.state.page * 5
                );

                return (
                  <div>
                    <h4>All Group Submissions</h4>
                    {data.challengeGroupSubmissions && (
                      <SubmissionsList
                        submissions={submissions}
                        page={this.state.page}
                        totalPages={Math.ceil(submissionsCount / 5)}
                        handleShowNext={this.handleShowNext}
                        handleShowPrevious={this.handleShowPrevious}
                        onLoadMore={() => {
                          if (
                            data.challengeGroupSubmissions.length >=
                              (this.state.page + 1) * 5 ||
                            data.challengeGroupSubmissions.length ===
                              submissionsCount
                          ) {
                            return this.handleShowNext();
                          }

                          fetchMore({
                            variables: {
                              offset: data.challengeGroupSubmissions.length,
                            },
                            updateQuery: (prev, { fetchMoreResult }) => {
                              if (!fetchMoreResult) return prev;
                              return Object.assign({}, prev, {
                                challengeGroupSubmissions: [
                                  ...prev.challengeGroupSubmissions,
                                  ...fetchMoreResult.challengeGroupSubmissions,
                                ],
                              });
                            },
                          }).then(() => this.handleShowNext());
                        }}
                      />
                    )}
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default GroupSubmissionsList;
