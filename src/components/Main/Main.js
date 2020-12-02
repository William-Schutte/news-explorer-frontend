import React from 'react'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import SearchBar from '../SearchBar/SearchBar'
import './Main.css'


const Main = () => {
  return (
    <main className="main">
        <Navbar />
        <Header />
        <SearchBar />
    </main>
  )
}

export default Main
