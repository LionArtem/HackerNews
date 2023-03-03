import React from 'react';
import { Link } from 'react-router-dom';
import convertTimestamp from '../.././utils/convertTimestamp/convertTimestamp';

import { useSelector, useDispatch } from 'react-redux';
import { setOneNews } from '../../redax/slices/oneNews';

import Style from './News.module.scss';

export default function News() {
  const dispatch = useDispatch();
  const oneNews = useSelector((state) => state.news.oneNews);

  const [news, setNews] = React.useState([]);
  const [show, setShow] = React.useState(true);

  const getListAllNews = () => {
    setNews([]);
    setShow(true);
    fetch(' https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        const arrIdNews = res.slice([0], [100]);
        arrIdNews.forEach((n) => getLinkNews(n));
        setShow(false);
      })
      .catch((res) => console.log(res));
  };

  React.useEffect(() => {
    getListAllNews();
  }, []);

  const getLinkNews = (news) => {
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
        setNews((prev) => [...prev, res]);
      })
      .catch((res) => console.log(res));
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      getListAllNews();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <button className={Style.button} onClick={() => getListAllNews()}>
        Update news list
      </button>
      {show ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        news.map((n, i) => (
          <div className={Style.root} key={i}>
            <Link className={Style.link} to="/news">
              <h1
                onClick={() => {
                  dispatch(setOneNews(n));
                }}
              >
                {n.title}
              </h1>
            </Link>
            <div className={Style.info}>
              <p>{`autor: ${n.by}`}</p>
              <p>{`score: ${n.score}`}</p>
              <span>{convertTimestamp(n.time)}</span>
            </div>
            <div
              onClick={() => window.scrollTo(0, 0)}
              className={Style.button_top}
            >
              top
            </div>
          </div>
        ))
      )}
    </>
  );
}
