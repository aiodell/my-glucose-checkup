import React from "react";

function SearchBar({ setSearch }) {
  
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="search">
      <h2>Search User</h2>
      <input type="text" className="searchTerm" onChange={handleSearch}/>
    </div>
  )
}

export default SearchBar;