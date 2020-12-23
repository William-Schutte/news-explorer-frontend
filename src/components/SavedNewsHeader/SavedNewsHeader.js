import React, { useContext } from 'react'
import './SavedNewsHeader.css'
import { CurrentUserContext } from '../App/App';

const SavedNewsHeader = ({ savedNews }) => {
  const user = useContext(CurrentUserContext);
  
  const getKeywords = () => {
    if (savedNews.length > 0) {
      //get keywords
      // show 3 or fewer keywords
      // else: "a, b, and x more"
    }
    
    return "";
  }

  return (
    <header className="savedNewsHeader">
      <h2 className="savedNewsHeader__name">Saved articles</h2>
      <h3 className="savedNewsHeader__summary">{user.name}, you have {savedNews.length} saved articles</h3>
      <p className="savedNewsHeader__keywords">By keywords: <span className="savedNewsHeader__bold">{getKeywords()}</span></p>
    </header>
  )
}

export default SavedNewsHeader
