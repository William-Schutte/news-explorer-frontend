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
import CurrentUserContext from '../../utils/CurrentUserContext';

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
      currentKeyword: '',
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
    const searchedArticles = JSON.parse(localStorage.getItem('searchedArticles'));

    if (jwt) {
      this.setState({ jwt: jwt });
      mainApi.getUser(jwt)
        .then((res) => {
          if (res.data) {
            this.setState({
              activeUser: res.data,
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });

      mainApi.getSavedNews(jwt)
        .then((res) => {
          if (res.data) {
            this.setState({
              savedNews: res.data,
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (searchedArticles) {
      this.setState({ searchedNews: searchedArticles })
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

  checkSearchedForSaved(articles) {
    const savedData = this.state.savedNews.map((article) => ({ title: article.title, _id: article._id }));
    const searchedArticles = articles.map((article) => {
      const cool = savedData.filter((saved) => saved.title === article.title);
      if (article.keyword) {
        article._id = cool[0] && cool[0]._id;
        return article;
      } else {
        return {
          title: article.title,
          text: article.content,
          date: article.publishedAt,
          source: article.source.name,
          link: article.url,
          image: article.urlToImage,
          keyword: this.state.currentKeyword,
          _id: cool[0] && cool[0]._id
        }
      }
    });

    localStorage.setItem('searchedArticles', JSON.stringify(searchedArticles));
    this.setState({ searchedNews: searchedArticles });
  }

  handleSearch(keyword) {
    this.setState({ isLoading: true, noResults: false, searchError: false, searchedNews: [], currentKeyword: keyword });
    newsApi.getNews(keyword)
      .then((newNews) => {
        if (newNews.error || newNews.status === "error") {
          this.setState({ noResults: true, searchError: true })
        } else if (newNews.totalResults != null) {
          if (newNews.totalResults > 0) {
            this.checkSearchedForSaved(newNews.articles);
            this.setState({ isLoading: false })
          } else {
            this.setState({ noResults: true });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSaveArticleClick(articleData) {
    // Add to savedNews, update searchedNews card
    // or Remove from savedNews, update searchedNews card
    if (articleData._id) {
      mainApi.deleteArticle(this.state.jwt, articleData._id)
        .then((article) => {
          mainApi.getSavedNews(this.state.jwt)
            .then((res) => {
              console.log("Article delete api")
              this.setState({
                savedNews: res.data,
              }, () => this.checkSearchedForSaved(this.state.searchedNews));
            })
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mainApi.saveArticle({
        token: this.state.jwt,
        userId: this.state.activeUser._id,
        article: articleData
      })
        .then((article) => {
          console.log("Article save api")
          this.setState({ savedNews: [...this.state.savedNews, { ...article.data }] },
            () => this.checkSearchedForSaved(this.state.searchedNews));
        })
        .catch((err) => {
          console.log(err);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onSignOut() {
    localStorage.removeItem('jwt');
    this.setState({ activeUser: null, savedNews: [] }, () => {
      this.checkSearchedForSaved(this.state.searchedNews);
    });
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
              {this.state.searchedNews.length > 0 &&
                <NewsCardList
                  type="search"
                  articles={this.state.searchedNews}
                  handleSave={this.handleSaveArticleClick}
                  handlePopup={this.handlePopupOpen}
                />
              }
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
