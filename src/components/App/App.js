import { Route, Switch } from 'react-router-dom';
import About from '../About/About';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNews from '../SavedNews/SavedNews';
import './App.css';

import newsData from '../../vendor/test_data'
import Popup from '../Popup/Popup';
const articles = newsData.articles;


function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/">
          <Main />
          <NewsCardList type="search" articles={articles}/>
          <About />
        </Route>
        <Route exact path="/savedNews">
          <SavedNews />
          <NewsCardList type="saved" articles={articles}/>
        </Route>
      </Switch>
      <Footer />

      <Popup />
    </div>
  );
}

export default App;
