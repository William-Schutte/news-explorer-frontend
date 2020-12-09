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

import newsData from '../../vendor/test_data'
const articles = newsData.articles;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupOpen: false,
      activeUser: null,
      popupType: 'signin',
    }
    this.handleSigninOpen = this.handleSigninOpen.bind(this);
    this.handlePopupOpen = this.handlePopupOpen.bind(this);
    this.handleChangePopup = this.handleChangePopup.bind(this);
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

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Main handlePopup={this.handlePopupOpen} isOpen={this.state.isPopupOpen} user={this.state.activeUser} />
            <Preloader searching={true}/>
            {/* <NewsCardList type="search" articles={articles} /> */}
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
