import React from 'react';

import LikeButton from './LikeButton';
import { DELETE_LIKE, CREATE_LIKE } from '../constants/mutations';

class SubmissionsList extends React.Component {
  state = {
    liked: false,
    favorited: false,
  };

  toggleLiked = () => this.setState(prevState => ({ liked: !prevState.liked }));

  render() {
    const { startDate, submissions } = this.props;
    return submissions.map(submission => {
      const day = Math.ceil(
        (new Date(submission.date).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return (
        <div key={submission.id}>
          <h5>Day {day}</h5>
          <p>{submission.text}</p>
          {submission.progress && <p>Progress: +{submission.progress}</p>}
          <div>
            <LikeButton
              mutation={this.state.liked ? 'deleteLike' : 'createLike'}
              mutationType={this.state.liked ? DELETE_LIKE : CREATE_LIKE}
              submissionId={submission.id}
              toggleLiked={this.toggleLiked}
            />
            <button>★</button>
          </div>
        </div>
      );
    });
  }
}

export default SubmissionsList;
