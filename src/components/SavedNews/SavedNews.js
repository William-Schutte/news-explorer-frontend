import React from 'react'
import Navbar from '../Navbar/Navbar'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import './SavedNews.css'

const SavedNews = () => {
  return (
    <main className="savedNews">
      <Navbar alt="true" user="Will" />
      <SavedNewsHeader />
    </main>
  )
}

export default SavedNews
