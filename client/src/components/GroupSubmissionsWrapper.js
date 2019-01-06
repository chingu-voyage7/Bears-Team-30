import React from 'react';
import { Query } from 'react-apollo';

import {
  GET_GROUP_SUBMISSIONS_COUNT,
  GET_GROUP_SUBMISSIONS,
} from '../constants/queries';
import SubmissionsList from './SubmissionsList';

class GroupSubmissionsWrapper extends React.Component {
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
    const { amount, challengeGroupId } = this.props;
    const { page } = this.state;

    return (
      <Query
        query={GET_GROUP_SUBMISSIONS_COUNT}
        variables={{ challengeGroupId }}
        partialRefetch={true}
      >
        {({ loading, error, data: countData }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const submissionsCount = countData.challengeGroup.challenges.reduce(
            (tot, curr) => (tot += curr.submissions.length),
            0
          );

          return (
            <Query
              query={GET_GROUP_SUBMISSIONS}
              partialRefetch={true}
              variables={{
                challengeGroupId,
                amount,
              }}
              notifyOnNetworkStatusChange={true}
            >
              {({ loading, error, data, fetchMore }) => {
                if (loading) return 'Loading...';
                if (error) return `Error! ${error.message}`;

                const submissions = data.challengeGroupSubmissions.filter(
                  (submission, ind) =>
                    ind >= page * amount - amount && ind < page * amount
                );

                return (
                  <div>
                    {data.challengeGroupSubmissions && (
                      <SubmissionsList
                        submissions={submissions}
                        page={page}
                        totalPages={Math.ceil(submissionsCount / amount)}
                        handleShowNext={this.handleShowNext}
                        handleShowPrevious={this.handleShowPrevious}
                        onLoadMore={() => {
                          if (
                            data.challengeGroupSubmissions.length >=
                              (page + 1) * amount ||
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

export default GroupSubmissionsWrapper;
