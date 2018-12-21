import React, { Component } from 'react';

const SearchBar = ({ onUserQueryChange, value }) => (
  <input
    type="search"
    placeholder="Search"
    onChange={onUserQueryChange}
    value={value}
  />
);

export default SearchBar;
