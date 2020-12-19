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
      isLoading: false,
      noResults: false,
      searchError: false,
      regFail: false,
      popupType: 'signin',
      searchedNews: [],
    }
    this.handleSigninOpen = this.handleSigninOpen.bind(this);
    this.handlePopupOpen = this.handlePopupOpen.bind(this);
    this.handleChangePopup = this.handleChangePopup.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
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
            console.log(newNews.articles)
            this.setState({ searchedNews: newNews.articles, isLoading: false })
          } else {
            this.setState({ noResults: true });
          }
        }
      });
  }

  onRegister(values) {
    mainApi.register(values)
      .then((res) => {
        if (res) {
          // If successful, show success popup/change popup
          console.log(res);
          this.setState({ regFail: false, popupType: 'success' });
        }
      })
      .catch((err) => {
        this.setState({ regFail: true });
      });
  }

  onLogin(values) {
    mainApi.logIn(values);
  }

  onSignOut() {
    mainApi.logOut();
  }

  render() {
    return (
      <div className="app">
        <CurrentUserContext.Provider value={this.state.activeUser}>
          <Switch>
            <Route exact path="/">
              <Main handlePopup={this.handlePopupOpen} handleSearch={this.handleSearch} isOpen={this.state.isPopupOpen} user={this.state.activeUser} />
              {this.state.isLoading && <Preloader noResults={this.state.noResults} error={this.state.searchError} />}
              {this.state.searchedNews.length > 0 && <NewsCardList type="search" articles={this.state.searchedNews} />}
              <About />
            </Route>
            <ProtectedRoute exact path="/savedNews" user={this.state.activeUser}>
              <SavedNews user={this.state.activeUser} />
              <NewsCardList type="saved" articles={[]} />
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
