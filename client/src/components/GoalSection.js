import React from 'react';

const GoalSection = ({ challengeGroup, onBlur, onChange, value }) => (
  <div>
    <h5>My Goal over 100 Days</h5>
    <label htmlFor="goal">
      {challengeGroup.goalAction}
      <input
        name="goal"
        onBlur={onBlur}
        onChange={onChange}
        type="number"
        value={value}
      />
      {challengeGroup.goalType}!
    </label>
  </div>
);

export default GoalSection;
