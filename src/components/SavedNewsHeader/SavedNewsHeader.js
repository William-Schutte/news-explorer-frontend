import React, { useContext } from 'react'
import './SavedNewsHeader.css'
// import { CurrentUserContext } from '../App/App';
import CurrentUserContext from '../../utils/CurrentUserContext';

const SavedNewsHeader = ({ savedNews }) => {
  const user = useContext(CurrentUserContext);

  const getKeywords = () => {
    if (savedNews.length > 0) {
      let keywords = savedNews.map((itm) => itm.keyword).filter((itm, i, arr) => {
        return (i === arr.indexOf(itm));
      }).map((itm) => ({ key: itm, count: 0 }));

      // show 3 or fewer keywords
      // else: "a, b, and x more"
      for (let i = 0; i < savedNews.length; i++) {
        for (let j = 0; j < keywords.length; j++) {
          if (keywords[j].key === savedNews[i].keyword) {
            keywords[j].count++;
          }
        }
      }
      keywords.sort((a, b) => {
        return a.count > b.count;
      });

      switch (keywords.length) {
        case (1):
          return keywords[0].key;

        case (2):
          return `${keywords[0].key} and ${keywords[1].key}`;

        case (3):
          return `${keywords[0].key}, ${keywords[1].key}, and ${keywords[2].key}`;
    
        default:
          return `${keywords[0].key}, ${keywords[1].key}, and ${keywords.length - 2} more`;;
      }
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
