import React from 'react';

import ActionButton from './ActionButton';
import { DELETE_LIKE, CREATE_LIKE } from '../constants/mutations';

const SubmissionsList = ({ startDate, submissions }) =>
  submissions.map(submission => {
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
          <ActionButton
            mutations={['deleteLike', 'createLike']}
            mutationTypes={[DELETE_LIKE, CREATE_LIKE]}
            submissionId={submission.id}
          />
          <button>★</button>
        </div>
      </div>
    );
  });

export default SubmissionsList;
