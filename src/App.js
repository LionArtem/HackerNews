import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import News from './components/News/News';
import NodFound from './components/nodFound';
import PageNews from './components/PageNews/PageNews';

function App() {
  // const [oneNews, cetOneNews] = React.useState([]);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     getListAllNews();
  //   }, 60000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="page">
      <header className="">
        <Header />
      </header>
      <main>
        <section>
          <Routes>
            {/* <Route path="/" element={<News cetOneNews={cetOneNews} />} />
            <Route path="/news" element={<PageNews oneNews={oneNews} />} /> */}
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
