import React, { useContext } from 'react'
import './NewsCard.css'
import notFoundImg from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png'
import { CurrentUserContext } from '../App/App'

const NewsCard = ({ data, type, handleSaveApi }) => {
  const user = useContext(CurrentUserContext);
  const [saved, setSaved] = React.useState(data.saved);

  
  function formatDate(date) {
    const dt = new Date(date);
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    return (month[dt.getMonth()] + ' ' + dt.getDay() + ', ' + dt.getFullYear());
  }
  
  function cleanTitle(title) {
    const i = title.lastIndexOf(' - ');
    return title.slice(0, i);
  }

  function cleanText(text) {
    if (text === null) {
      return "No summary available for this article";
    }
    const i = text.lastIndexOf(' [+');
    return text.slice(0, i);
  }

  function handleSaveClick() {
    handleSaveApi(data, saved);
    setSaved(!saved);
  }

  return (
    <article className="newsCard">
      <img className="newsCard__img" src={data.image !== null ? data.image : notFoundImg} alt={data.title} />
      <button className="newsCard__interact" onClick={handleSaveClick}>
        {user === null && <div className="newsCard__help">Sign in to save articles</div>}
        {saved && <div className="newsCard__help">Remove from saved</div>}
        <div className="newsCard__btn">
          {type === "saved" ? <i className="far fa-trash-alt"/> : <i className={`${saved ? `fas newsCard__saved` : `far`} fa-bookmark`}/>}
        </div>
      </button>
      {type === "saved" && <p className="newsCard__topic">{data.keyword}</p>}
      <div className="newsCard__container">
        <p className="newsCard__date">{formatDate(data.date)}</p>
        <h4 className="newsCard__title">{cleanTitle(data.title)}</h4>
        <p className="newsCard__text">{cleanText(data.text)}</p>
        <h5 className="newsCard__source">{data.source}</h5>
      </div>
      
    </article>
  )
}

export default NewsCard
