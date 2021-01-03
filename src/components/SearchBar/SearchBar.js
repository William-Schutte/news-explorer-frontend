import React from 'react'
import './SearchBar.css'
import { SEARCHBAR_MOBILE_WIDTH } from '../../utils/configData.json'

const SearchBar = ({ handleSearch, searching }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [searchText, setSearchText] = React.useState('');
  const [placeholderText, setPlaceholderText] = React.useState('Enter topic');

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
    if (searchText === "") {
      setPlaceholderText("Please enter a keyword");
    } else {
      setPlaceholderText("Enter topic");
      handleSearch(searchText);
    }
  }

  return (
    <>
    {width > SEARCHBAR_MOBILE_WIDTH && (
      <div className="searchbar">
        <input type="text" value={searchText} onChange={handleSearchText} className="searchbar__text" placeholder={placeholderText} disabled={searching} />
        <button type="submit" className={`searchbar__button ${searching && "searchbar__button_disabled"}`} onClick={handleSubmit} disabled={searching}>Search</button>
      </div>
    )}
    {width <= SEARCHBAR_MOBILE_WIDTH && (
      <>
        <div className="searchbar">
          <input type="text" value={searchText} onChange={handleSearchText} className="searchbar__text" placeholder={placeholderText} disabled={searching} />
        </div>
        <button type="submit" className={`searchbar__button ${searching && "searchbar__button_disabled"}`} onClick={handleSubmit} disabled={searching}>Search</button>
      </>
    )}
    </>
  )
}

export default SearchBar
