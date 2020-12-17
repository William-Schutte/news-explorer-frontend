import React from 'react'
import './SearchBar.css'

const SearchBar = ({ handleSearch }) => {
  const MOBILE_WIDTH = 500;
  const [width, setWidth] = React.useState(window.innerWidth);
  const [searchText, setSearchText] = React.useState('');

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  });

  function handleSearchText(e) {
    setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleSearch(searchText);
  }

  return (
    <>
    {width > MOBILE_WIDTH && (
      <div className="searchbar">
        <input type="text" value={searchText} onChange={handleSearchText} className="searchbar__text" placeholder="Enter topic" />
        <button type="submit" className="searchbar__button" onClick={handleSubmit} >Search</button>
      </div>
    )}
    {width <= MOBILE_WIDTH && (
      <>
        <div className="searchbar">
          <input type="text" className="searchbar__text" placeholder="Enter topic" />
        </div>
        <button type="submit" className="searchbar__button">Search</button>
      </>
    )}
    </>
  )
}

export default SearchBar
