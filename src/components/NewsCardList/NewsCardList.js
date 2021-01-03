import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import './NewsCardList.css'
import { DISPLAY_ROW_NUMBER } from '../../utils/configData.json'

const NewsCardList = ({ type, articles, handleSave, handlePopup }) => {
  const [articleCount, setArticleCount] = React.useState(type === 'search' ? DISPLAY_ROW_NUMBER : 10 * DISPLAY_ROW_NUMBER);

  function handleShowMore() {
    setArticleCount(articleCount + DISPLAY_ROW_NUMBER);
  }

  return (
    <section className="newsCardList">
      {type === "search" && <h3 className="newsCardList__title">Search Results</h3>}
      <div className="newsCardList__container">
        {articles.map((article, i) => {
          if (i < articleCount) { 
            return (
              <NewsCard 
                data={article} 
                key={article._id ? article._id : i} 
                type={type} 
                handleSaveApi={handleSave}
                handlePopup={handlePopup}
              />);
          }
          return null;
        })}
      </div>
      {(type === "search" && articles.length > articleCount) && <button className="newsCardList__btn" onClick={handleShowMore}>Show more</button>}
    </section>
  )
}

export default NewsCardList
