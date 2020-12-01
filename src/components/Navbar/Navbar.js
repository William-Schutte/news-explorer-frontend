import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav class="navbar">
      <a className="navbar__logo" href="#home">NewsExplorer</a>
      <a className="navbar__link navbar__link_active" href="#home">
        <p className="navbar__link-text">Home</p>
      </a>
      <button className="navbar__user">Sign In</button>
    </nav>
  )
}

export default Navbar
