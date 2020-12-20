import React, { useContext } from 'react'
import './NewsCard.css'
import notFoundImg from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png'
import { CurrentUserContext } from '../App/App'

const NewsCard = ({ data, type }) => {
  const user = useContext(CurrentUserContext);
  
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

  function handleSave() {
    data.saved = !data.saved;
  }

  return (
    <article className="newsCard">
      <img className="newsCard__img" src={data.urlToImage !== null ? data.urlToImage : notFoundImg} alt={data.title} />
      <button className="newsCard__interact" onClick={handleSave}>
        {user === null && <div className="newsCard__help">Sign in to save articles</div>}
        {data.saved && <div className="newsCard__help">Remove from saved</div>}
        <div className="newsCard__btn">
          {type === "saved" ? <i class="far fa-trash-alt"/> : <i className={`${data.saved ? `fas newsCard__saved` : `far`} fa-bookmark`}/>}
        </div>
      </button>
      {type === "saved" && <p className="newsCard__topic">Topic</p>}
      <div className="newsCard__container">
        <p className="newsCard__date">{formatDate(data.publishedAt)}</p>
        <h4 className="newsCard__title">{cleanTitle(data.title)}</h4>
        <p className="newsCard__text">{cleanText(data.content)}</p>
        <h5 className="newsCard__source">{data.source.name}</h5>
      </div>
      
    </article>
  )
}

export default NewsCard
