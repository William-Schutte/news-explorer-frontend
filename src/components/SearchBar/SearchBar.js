import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
  const MOBILE_WIDTH = 500;
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  });

  return (
    <>
    {width > MOBILE_WIDTH && (
      <div className="searchbar">
        <input type="text" className="searchbar__text" placeholder="Enter topic" />
        <button type="submit" className="searchbar__button">Search</button>
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
