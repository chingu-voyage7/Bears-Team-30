import React from 'react';

const UserSubmissionsList = ({ submissions, startDate }) => (
  <div>
    <h4>My Submissions</h4>
    {console.log(submissions)}
    {/* {submissions &&
      submissions.map(submission => {
        const day = Math.ceil(
          (submission.date.parse() - startDate.parse()) / (1000 * 60 * 60 * 24)
        );
        console.log(day);
        return (
          <div>
            <h5>Day {day}</h5>
          </div>
        );
      })} */}
  </div>
);

export default UserSubmissionsList;
