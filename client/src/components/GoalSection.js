import React from 'react';

const GoalSection = ({ challengeGroup, onChange, value }) => (
  <div className="p-t-15">
    <h5 className="small-text">My Goal over 100 Days</h5>
    <label className="small-text" htmlFor="goal">
      {challengeGroup.goalAction}
      <input name="goal" className="form-input" onChange={onChange} type="number" value={value} />
      {challengeGroup.goalType}!
    </label>
  </div>
);

export default GoalSection;
