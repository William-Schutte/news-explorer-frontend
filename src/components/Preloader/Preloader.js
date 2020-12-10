import React from 'react'
import './Preloader.css'

const Preloader = ({ searching }) => {
  return (
    <section className="preloader">
      {searching ? 
        <>
          <i className="preloader__icon"></i>
          <p className="preloader__text">Searching for news...</p>
        </>
      :
        <>
          <i className=" preloader__notfound-icon far fa-frown"></i>
          <h3 className="preloader__notfound">Nothing found</h3>
          <p className="preloader__notfound-text">Sorry, but nothing matched your search terms.</p>
        </>}
      
    </section>
  )
}

export default Preloader
