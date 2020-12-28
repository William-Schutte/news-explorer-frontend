import React, { useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import CurrentUserContext from '../../utils/CurrentUserContext';

import './SavedNews.css'

const SavedNews = ({ articles, handleSignOut }) => {
  const user = useContext(CurrentUserContext)

  return (
    <main className="savedNews">
      <Navbar alt="true" user={user} handleSignOut={handleSignOut} />
      <SavedNewsHeader savedNews={articles} />
    </main>
  )
}

export default SavedNews
