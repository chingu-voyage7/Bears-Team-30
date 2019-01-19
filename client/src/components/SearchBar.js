import React from 'react';

const SearchBar = ({ onUserQueryChange, value }) => (
  <input className="input-field"
    type="search"
    placeholder="Search"
    onChange={onUserQueryChange}
    value={value}
  />
);

export default SearchBar;
