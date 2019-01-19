import React, { Component } from 'react';

const CategorySelect = ({ onCategoryChange, value }) => (
  <div className="styled-select">
    <select onChange={onCategoryChange} value={value}>
      <option value="">All Categories</option>
      <option value="ART">Art</option>
      <option value="HEALTH_WELLNESS">Health/Wellness</option>
      <option value="TECHNOLOGY">Technology</option>
    </select>
    <div class="select-button"><div class="select-button-text"><div class="small-arrow-down"></div></div></div>
  </div>
);

export default CategorySelect;
