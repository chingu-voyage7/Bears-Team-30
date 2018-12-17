import React, { Component } from 'react';

const SearchBar = ({ onQueryChange, value }) => (
  <input
    type="search"
    placeholder="Search"
    onChange={onQueryChange}
    value={value}
  />
);

export default SearchBar;
