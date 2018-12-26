import React from 'react';

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
        <p>Progress: +{submission.progress}</p>
      </div>
    );
  });

export default SubmissionsList;
