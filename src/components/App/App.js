import React from 'react'
import { Route, Switch } from 'react-router-dom';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNews from '../SavedNews/SavedNews';
import Popup from '../Popup/Popup';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';

export const CurrentUserContext = React.createContext();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupOpen: false,
      activeUser: null,
      jwt: null,
      isLoading: false,
      noResults: false,
      searchError: false,
      regFail: false,
      popupType: 'signin',
      searchedNews: [],
      savedNews: [],
    }
    this.handleSigninOpen = this.handleSigninOpen.bind(this);
    this.handlePopupOpen = this.handlePopupOpen.bind(this);
    this.handleChangePopup = this.handleChangePopup.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.checkSearchedForSaved = this.checkSearchedForSaved.bind(this);
    this.handleSaveArticleClick = this.handleSaveArticleClick.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  componentDidMount() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.setState({ jwt: jwt });
      mainApi.getUser(jwt)
        .then((res) => {
          this.setState({
            activeUser: res.data,
          })
        })
        .catch((err) => {
          console.log(err);
        });

      mainApi.getSavedNews(jwt)
        .then((res) => {
          this.setState({
            savedNews: res.data,
          })
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  checkSearchedForSaved(articles, keyword) {
    const savedTitles = this.state.savedNews.map((article) => article.title);
    const searchedArticles = articles.map((article) => {
      return {
        title: article.title,
        text: article.content,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
        saved: (savedTitles.includes(article.title)),
        keyword: keyword
      }
    });
    return searchedArticles;
  }

  handleSearch(keyword) {
    this.setState({ isLoading: true, noResults: false, searchError: false, searchedNews: [] });
    newsApi.getNews(keyword)
      .then((newNews) => {
        if (newNews.error || newNews.status === "error") {
          this.setState({ noResults: true, searchError: true })
        } else if (newNews.totalResults != null) {
          if (newNews.totalResults > 0) {
            const searched = this.checkSearchedForSaved(newNews.articles, keyword)
            this.setState({ searchedNews: searched, isLoading: false })
          } else {
            this.setState({ noResults: true });
          }
        }
      });
  }

  handleSaveArticleClick(articleData, saved) {
    // Add to savedNews, update searchedNews card
    // or Remove from savedNews, update searchedNews card
    if (saved) {
      mainApi.deleteArticle(this.state.jwt, articleData.id)
    } else {
      mainApi.saveArticle({
        token: this.state.jwt,
        userId: this.state.activeUser._id,
        article: articleData
      })
        .then((article) => {
          this.setState({ savedNews: [...this.state.savedNews, {...article, saved: true} ]});
        });
    }

  }

  onRegister(values) {
    mainApi.register(values)
      .then((res) => {
        if (res) {
          // If successful, show success popup/change popup
          this.setState({ regFail: false, popupType: 'success' });
        }
      })
      .catch((err) => {
        this.setState({ regFail: true });
      });
  }

  onLogin(values) {
    mainApi.logIn(values)
      .then((res) => {
        // If successful, close popup, change state
        this.componentDidMount();
        this.handlePopupOpen();
      });
  }

  onSignOut() {
    localStorage.removeItem('jwt');
    this.setState({ activeUser: null, savedNews: [] });
  }

  render() {
    return (
      <div className="app">
        <CurrentUserContext.Provider value={this.state.activeUser}>
          <Switch>
            <Route exact path="/">
              <Main
                handlePopup={this.handlePopupOpen}
                handleSearch={this.handleSearch}
                handleSignOut={this.onSignOut}
                isOpen={this.state.isPopupOpen}
              />
              {/* If loading, will display the preloader or 'not found' error */}
              {this.state.isLoading && <Preloader noResults={this.state.noResults} error={this.state.searchError} />}
              {/* Once done loading will show articles */}
              {this.state.searchedNews.length > 0 && <NewsCardList type="search" articles={this.state.searchedNews} handleSave={this.handleSaveArticleClick} />}
              <About />
            </Route>
            <ProtectedRoute exact path="/savedNews">
              <SavedNews articles={this.state.savedNews} handleSignOut={this.onSignOut} />
              <NewsCardList type="saved" articles={this.state.savedNews} handleSave={this.handleSaveArticleClick} />
            </ProtectedRoute>
          </Switch>
        </CurrentUserContext.Provider>
        <Footer />
        <Popup
          isOpen={this.state.isPopupOpen}
          popupType={this.state.popupType}
          regFail={this.state.regFail}
          changePopup={this.handleChangePopup}
          handlePopup={this.handlePopupOpen}
          handleSignin={this.onLogin}
          handleSignup={this.onRegister}
        />
      </div>
    );
  }
}

export default App;
