import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import News from './components/News/News';
import NodFound from './components/nodFound';
import PageNews from './components/PageNews/PageNews';

function App() {
  return (
    <div className="page">
      <header>
        <Header />
      </header>
      <main>
        <section>
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/news" element={<PageNews />} />
            <Route path="*" element={<NodFound />} />
          </Routes>
        </section>
      </main>
      <footer>
        <p>ArtemGreen</p>
      </footer>
    </div>
  );
}

export default App;
