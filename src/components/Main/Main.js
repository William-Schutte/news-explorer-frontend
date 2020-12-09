import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import SearchBar from '../SearchBar/SearchBar'
import './Main.css'


const Main = ({ handlePopup, user, isOpen }) => {
  return (
    <main className="main">
        <Navbar handlePopup={handlePopup} user={user} isOpen={isOpen} />
        <Header />
        <SearchBar />
    </main>
  )
}

export default Main
