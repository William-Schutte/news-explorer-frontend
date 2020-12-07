import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import './NewsCardList.css'

const NewsCardList = ({ type, articles }) => {
  let count = (type === 'search') ? 3 : 100;
  return (
    <section className="newsCardList">
      {type === "search" && <h3 className="newsCardList__title">Search Results</h3>}
      <div className="newsCardList__container">
        {articles.map((article, i) => {
          if (i < count) { 
            return (<NewsCard data={article} key={i} type={type} />)
          }
        })}
      </div>
      {type === "search" && <button className="newsCardList__btn">Show more</button>}
    </section>
  )
}

export default NewsCardList
