import React, { Component } from 'react';

import CATEGORIES from '../constants/categories';

const CategorySelect = ({ onCategoryChange, value }) => (
  <select onChange={onCategoryChange} value={value}>
    <option value="">All Categories</option>
    {CATEGORIES.map(category => (
      <option key={category[0]} value={category[0]}>
        {category[1]}
      </option>
    ))}
  </select>
);

export default CategorySelect;
