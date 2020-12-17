import React from 'react'
import { Route, Switch } from 'react-router-dom';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNews from '../SavedNews/SavedNews';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
import './App.css';
import newsApi from '../../utils/NewsApi';

import newsData from '../../vendor/test_data';
const articles = newsData.articles;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupOpen: false,
      activeUser: null,
      isLoading: false,
      noResults: false,
      searchError: false,
      popupType: 'signin',
      searchedNews: [],
    }
    this.handleSigninOpen = this.handleSigninOpen.bind(this);
    this.handlePopupOpen = this.handlePopupOpen.bind(this);
    this.handleChangePopup = this.handleChangePopup.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSigninOpen() {
    this.setState({ isPopupOpen: true, popupType: 'signin' });
  }

  handlePopupOpen() {
    if (this.state.isPopupOpen) {
      this.setState({ isPopupOpen: !this.state.isPopupOpen });
    } else {
      this.setState({ isPopupOpen: true, popupType: 'signin' });
    }
  }

  handleChangePopup(newType) {
    this.setState({ popupType: newType })
  }

  handleSearch(keyword) { 
    this.setState({ isLoading: true, noResults: false, searchError: false, searchedNews: [] });
    newsApi.getNews(keyword)
      .then((newNews) => {
        if (newNews.error || newNews.status === "error") {
          this.setState({ noResults: true, searchError: true })
        } else if (newNews.totalResults != null) {
          if (newNews.totalResults > 0) {
            this.setState({ searchedNews: newNews.articles, isLoading: false })
          } else {
            this.setState({ noResults: true });
          }
        }  
      });
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main handlePopup={this.handlePopupOpen} handleSearch={this.handleSearch} isOpen={this.state.isPopupOpen} user={this.state.activeUser} />
            {this.state.isLoading && <Preloader noResults={this.state.noResults} error={this.state.searchError}/>}
            {this.state.searchedNews.length > 0 && <NewsCardList type="search" articles={this.state.searchedNews} />}
            <About />
          </Route>
          <Route exact path="/savedNews">
            <SavedNews user={this.state.activeUser} />
            <NewsCardList type="saved" articles={articles} />
          </Route>
        </Switch>
        <Footer />

        <Popup isOpen={this.state.isPopupOpen} popupType={this.state.popupType} changePopup={this.handleChangePopup} handlePopup={this.handlePopupOpen}/>
      </div>
    );
  }
}

export default App;
