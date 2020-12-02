import React from 'react'
import './NewsCard.css'

const NewsCard = ({ data }) => {
  
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
    const i = text.lastIndexOf(' [+');
    return text.slice(0, i);
  }

  return (
    <article className="newsCard">
      <img className="newsCard__img" src={data.urlToImage} alt={data.title} />
      <button className="newsCard__save">
        <i className="far fa-bookmark"></i>
      </button>
      <p className="newsCard__topic">Topic</p>
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
