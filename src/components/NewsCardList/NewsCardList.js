import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import './NewsCardList.css'

import newsData from '../../vendor/test_data'
const articles = newsData.articles;

const NewsCardList = () => {
  return (
    <section className="newsCardList">
      <h3 className="newsCardList__title">Search Results</h3>
      <div className="newsCardList__container">
        {articles.map((article, i) => (
          <NewsCard data={article} key={i}/>
        ))}
      </div>
      <button className="newsCardList__btn">Show more</button>
    </section>
  )
}

export default NewsCardList
