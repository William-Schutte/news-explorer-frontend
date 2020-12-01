import React from 'react'
import SearchBar from '../SearchBar/SearchBar'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">What's going on in the world?</h1>
      <h2 className="header__subtitle">Find the latest news on any topic and same them in your personal account.</h2>
    </header>
  )
}

export default Header
