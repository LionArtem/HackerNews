import React from 'react';
import convertTimestamp from '../.././utils/convertTimestamp/convertTimestamp';
import { useSelector, useDispatch } from 'react-redux';
import { setOneNews } from '../../redax/slices/oneNews';

import Style from './Page.module.scss';

export default function PageNews() {
  const dispatch = useDispatch();
  const oneNews = useSelector((state) => state.news.oneNews);
  const newsStorage = JSON.parse(localStorage.getItem('myKey'));
  //console.log(newsStorage);
  const { url, title, time, by, kids, id } = newsStorage;
  const [comments, setComments] = React.useState([]);

  const getLinkNews = (id) => {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        dispatch(setOneNews(res));
      })
      .catch((res) => console.log(res));
  };

  const getListComments = (c) => {
    setComments([]);
    fetch(`https://hacker-news.firebaseio.com/v0/item/${c}.json?print=pretty`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((res) => {
        setComments((prev) => [...prev, res]);
      })
      .catch((res) => console.log(res));
  };

  React.useEffect(() => {
    if (kids !== undefined && kids.length > 0) {
      kids.forEach((element) => {
        getListComments(element);
      });
    }
    //console.log(kids);
    dispatch(setOneNews(newsStorage));
  }, []);

  return (
    <div className={Style.root}>
      <h1>{title}</h1>
      <a target="_blank" rel="noreferrer" href={url}>
        <p className={Style.link}>Link</p>
      </a>
      <p className={Style.autor}>{`autor: ${by}`}</p>
      <span>{convertTimestamp(time)}</span>

      <button onClick={() => getLinkNews(id)}>update comments</button>
      {kids === undefined || kids.length < 0 ? (
        <p className={Style.caunter_comments}>comments:0</p>
      ) : (
        <div className={Style.comments}>
          <p className={Style.caunter_comments}>comments:{kids.length}</p>
          <ul>
            {comments.map((c, i) => (
              <li key={i}>{c.text}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
