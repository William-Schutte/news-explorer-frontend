import React from 'react'
import './NewsCard.css'

const NewsCard = ({ data }) => {
  return (
    <article className="newsCard">
      <img className="newsCard__img" src={data.urlToImage} alt={data.title} />
      <p className="newsCard__date">{data.publishedAt}</p>
      <h4 className="newsCard__title">{data.title}</h4>
      <p className="newsCard__text">{data.content}</p>
      <h5 className="newsCard__source">{data.source.name}</h5>
    </article>
  )
}

export default NewsCard
