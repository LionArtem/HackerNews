import React from 'react';
import { Link } from 'react-router-dom';
import convertTimestamp from '../.././utils/convertTimestamp/convertTimestamp';

import { useSelector, useDispatch } from 'react-redux';
import { setOneNews } from '../../redax/slices/oneNews';

export default function News() {
  const dispatch = useDispatch();
  const oneNews = useSelector((state) => state.news.oneNews);
  
  const [news, setNews] = React.useState([]);

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
        const arrIdNews = res.slice([0], [100]);
        // getLinkNews(arrIdNews);
        // console.log(arrIdNews);
        // setNews(getLinkNews(arrIdNews));
        arrIdNews.forEach((n) => getLinkNews(n));
        setShow(false);
      })
      .catch((res) => console.log(res));
  }, []);

  const getLinkNews = (news) => {
    //let newNews = [];

    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${news}.json?print=pretty`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        //newNews.push(res);
        setNews((prev) => [...prev, res]);
      })
      .catch((res) => console.log(res));
  };

  return (
    <>
      {/* <button onClick={() => getListAllNews()}>Обновить</button> */}
      {show ? (
        <>
          <p>загрузка</p>
        </>
      ) : (
        news.map((n, i) => (
          <div key={i}>
            <Link to="/news">
              <h1
                onClick={() => {
                  dispatch(setOneNews(n));
                }}
              >
                {n.title}
              </h1>
            </Link>
            <p>{n.score}</p>
            <h2>{n.by}</h2>
            <span>{convertTimestamp(n.time)}</span>
          </div>
        ))
      )}
    </>
  );
}
