import React from 'react';

const GoalSection = ({ challengeGroup, onBlur, onChange, value }) => (
  <div className="p-t-15">
    <h5 className="small-text">My Goal over 100 Days</h5>
    <div className="progress-form">
    <label className="small-text" htmlFor="goal">
      <span className="small-text">{challengeGroup.goalAction}</span>
      <input
        className="form-input"
        name="goal"
        onBlur={onBlur}
        onChange={onChange}
        type="number"
        value={value}
      />
      <span className="small-text">{challengeGroup.goalType}!</span>
    </label>
    </div>
  </div>
);

export default GoalSection;
