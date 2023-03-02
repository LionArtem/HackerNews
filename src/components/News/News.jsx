import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import convertTimestamp from '../.././utils/convertTimestamp/convertTimestamp';

export default function News({ cetOneNews }) {
  const [news, setNews] = React.useState([]);
  console.log(news);
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    setNews([]);
    fetch(' https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        //console.log(res.slice([0], [100]));
        const arrIdNews = res.slice([0], [100]);
        // getLinkNews(arrIdNews);
        setNews(getLinkNews(arrIdNews));
        setShow(false);
        // arrIdNews.forEach((n) => getLinkNews(n));
      })
      .catch((res) => console.log(res));
  }, []);

  const getLinkNews = (news) => {
    let newNews = [];
    news.forEach((element) => {
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((res) => {
          newNews.push(res);
          // setNews((prev) => [...prev, res]);
        })
        .catch((res) => console.log(res));
    });
    return newNews;
  };

  return (
    <>
      {/* <button onClick={() => getListAllNews()}>Обновить</button> */}
      {show ? (
        <>
        <p>{console.log('закрузка')}</p>
        <p>загрузка</p>
        </>
      ) : (
        news.map((n, i) => (
          <div key={i}>
            <Link to="/news">
              <h1 onClick={() => cetOneNews(n)}>{n.title}</h1>
            </Link>
            <Outlet />
            <p>{n.score}</p>
            <h2>{n.by}</h2>
            <span>{convertTimestamp(n.time)}</span>
          </div>
        ))
      )}
    </>
  );
}
