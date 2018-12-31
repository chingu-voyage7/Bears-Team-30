import React from 'react';

import '../styles/sidebar.scss';
import '../styles/base.scss';
import '../styles/animations.scss';
import '../styles/variables.scss';
import '../styles/components/userChallenge.scss';

const SubmissionsList = ({ startDate, submissions }) =>
  submissions.map(submission => {
    const day = Math.ceil(
      (new Date(submission.date).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    return (
      <div className="list-container-item user-item col-xs-12">
        <div key={submission.id} className="content">
          <h5>Day {day}</h5>
          <p>{submission.text}</p>
          <p>Progress: +{submission.progress}</p>
        </div>
      </div>

    );
  });

export default SubmissionsList;
