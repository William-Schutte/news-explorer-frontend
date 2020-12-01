import Main from '../Main/Main';
import './App.css';

function App() {
  return (
    <div className="app">
      <Main />
      <section className="newsCardList">Cards</section>
      <section className="about">About me</section>
      
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
