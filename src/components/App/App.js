import About from '../About/About';
import Main from '../Main/Main';
import NewsCardList from '../NewsCardList/NewsCardList';
import './App.css';

function App() {
  return (
    <div className="app">
      <Main />
      <NewsCardList />
      <About />
      
      <main className="savedNews">
        <nav class="navbar">Nav Bar</nav>
        <header className="savedNewsHeader">Header Section</header>
        <section className="newsCardList"></section>
      </main>
      <footer>Footer Here</footer>
    </div>
  );
}

export default App;
