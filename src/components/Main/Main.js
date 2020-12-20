import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import SearchBar from '../SearchBar/SearchBar'
import './Main.css'
import { CurrentUserContext } from '../App/App';

const Main = ({ handlePopup, handleSearch, handleSignOut, isOpen }) => {
  const user = React.useContext(CurrentUserContext);

  return (
    <main className="main">
        <Navbar handlePopup={handlePopup} handleSignOut={handleSignOut} user={user} isOpen={isOpen} />
        <Header />
        <SearchBar handleSearch={handleSearch} />
    </main>
  )
}

export default Main
