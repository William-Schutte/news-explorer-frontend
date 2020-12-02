import About from '../About/About';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import NewsCardList from '../NewsCardList/NewsCardList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Main />
      <NewsCardList />
      <About />
      
      {/* <main className="savedNews">
        <nav className="navbar">Nav Bar</nav>
        <header className="savedNewsHeader">Header Section</header>
        <section className="newsCardList"></section>
      </main> */}
      <Footer />
    </div>
  );
}

export default App;
