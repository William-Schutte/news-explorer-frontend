import React from 'react'
import './SavedNewsHeader.css'
import { CurrentUserContext } from '../App/App';

const SavedNewsHeader = () => {
  return (
    <header className="savedNewsHeader">
      <h2 className="savedNewsHeader__name">Saved articles</h2>
      <h3 className="savedNewsHeader__summary">Will, you have 5 saved articles</h3>
      <p className="savedNewsHeader__keywords">By keywords: <span className="savedNewsHeader__bold">Cool, Science and 2 other</span></p>
    </header>
  )
}

export default SavedNewsHeader
