import React from 'react'
import './Preloader.css'

const Preloader = ({ noResults, error }) => {
  return (
    <section className="preloader">
      {noResults ? 
        <>
          <i className=" preloader__notfound-icon far fa-frown"></i>
          <h3 className="preloader__notfound">{error ? 'Server Error' : 'Nothing found'}</h3>
          <p className="preloader__notfound-text">{error ? 'Sorry, something went wrong during the request. There may be a connection issue or the server may be down. Please try again later.' : 'Sorry, but nothing matched your search terms.'}</p>
        </>
        :
        <>
          <i className="preloader__icon"></i>
          <p className="preloader__text">Searching for news...</p>
        </>}
      
    </section>
  )
}

export default Preloader
