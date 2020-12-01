import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
  return (
    <div className="searchbar">
      <input type="text" className="searchbar__text" placeholder="Enter topic" />
      <button type="submit" className="searchbar__button">Search</button>
    </div>
  )
}

export default SearchBar
