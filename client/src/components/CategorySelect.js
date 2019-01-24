import React, { Component } from 'react';

import CATEGORIES from '../constants/categories';

const CategorySelect = ({ onCategoryChange, value }) => (

<div className="styled-select">
  <select onChange={onCategoryChange} value={value}>
    <option value="">All Categories</option>
    {CATEGORIES.map(category => (
      <option key={category[0]} value={category[0]}>
        {category[1]}
      </option>
    ))}
  </select>
  <div class="select-button"><div class="select-button-text"><div class="small-arrow-down"></div></div></div>

</div>
);

export default CategorySelect;
