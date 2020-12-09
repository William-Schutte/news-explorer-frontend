import React from 'react'
import './Preloader.css'

const Preloader = ({ searching }) => {
  return (
    <section class="preloader">
      {searching ? 
        <>
          <i class="preloader__icon"></i>
          <p class="preloader__text">Searching for news...</p>
        </>
      :
        <>
          <i class=" preloader__notfound-icon far fa-frown"></i>
          <h3 class="preloader__notfound">Nothing found</h3>
          <p class="preloader__notfound-text">Sorry, but nothing matched your search terms.</p>
        </>}
      
    </section>
  )
}

export default Preloader
