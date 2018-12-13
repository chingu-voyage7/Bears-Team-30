import React, { Component } from 'react';

const CategorySelect = ({ onCategoryChange, value }) => (
  <select onChange={onCategoryChange} value={value}>
    <option value="">All Categories</option>
    <option value="ART">Art</option>
    <option value="HEALTH_WELLNESS">Health/Wellness</option>
    <option value="TECHNOLOGY">Technology</option>
  </select>
);

export default CategorySelect;
