import React from 'react'
import Navbar from '../Navbar/Navbar'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import './SavedNews.css'

const SavedNews = ({ user }) => {
  return (
    <main className="savedNews">
      <Navbar alt="true" user={user} />
      <SavedNewsHeader />
    </main>
  )
}

export default SavedNews
