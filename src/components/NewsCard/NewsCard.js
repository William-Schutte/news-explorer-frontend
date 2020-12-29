import React from 'react'
import './NewsCard.css'
import notFoundImg from '../../images/georgia-de-lotz--UsJoNxLaNo-unsplash.png'
import CurrentUserContext from '../../utils/CurrentUserContext'

class NewsCard extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super();
    this.state = {
      data: props.data,
      type: props.type,
      handleSaveApi: props.handleSaveApi,
      handlePopup: props.handlePopup
    }
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }
  
  formatDate(date) {
    const dt = new Date(date);
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    return (month[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear());
  }

  cleanText(text) {
    if (text === null || text === undefined) {
      return "No summary available for this article";
    }
    const i = text.lastIndexOf(' [+');
    return text.slice(0, i);
  }

  handleSaveClick(user) {
    if (user === null) {
      this.state.handlePopup();
      return;
    }
    this.state.handleSaveApi(this.state.data);
  }

  render() {
    const user = this.context;

    return (
      <article className="newsCard">
        <img className="newsCard__img" src={this.state.data.image !== null ? this.state.data.image : notFoundImg} alt={this.state.data.title} />
        <button className="newsCard__interact" onClick={() => {this.handleSaveClick(user)}}>
          {user === null && <div className="newsCard__help">Sign in to save articles</div>}
          {this.state.data._id && <div className="newsCard__help">Remove from saved</div>}
          <div className="newsCard__btn">
            {this.state.type === "saved" ? <i className="far fa-trash-alt" /> : <i className={`${this.state.data._id ? `fas newsCard__saved` : `far`} fa-bookmark`} />}
          </div>
        </button>
        {this.state.type === "saved" && <p className="newsCard__topic">{this.state.data.keyword}</p>}
        <div className="newsCard__container">
          <p className="newsCard__date">{this.formatDate(this.state.data.date)}</p>
          <h4 className="newsCard__title">{this.state.data.title}</h4>
          <p className="newsCard__text">{this.cleanText(this.state.data.text)}</p>
          <h5 className="newsCard__source">{this.state.data.source}</h5>
        </div>
      </article>
    )
  }
}

export default NewsCard
