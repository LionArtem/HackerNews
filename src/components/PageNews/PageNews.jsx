import React from 'react';
import convertTimestamp from '../.././utils/convertTimestamp/convertTimestamp';
import { useSelector, useDispatch } from 'react-redux';
import { setOneNews } from '../../redax/slices/oneNews';

export default function PageNews() {
  const dispatch = useDispatch();
  const oneNews = useSelector((state) => state.news.oneNews);
  const { url, title, time, by, kids, id } = oneNews;
  const [comments, setComments] = React.useState([]);
  console.log(oneNews);

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
  }, []);

  return (
    <div>
      <a href={url}>
        <p>{url}</p>
        <h1>{title}</h1>
      </a>
      <span>{convertTimestamp(time)}</span>
      <h2>{by}</h2>
      <button onClick={()=>getLinkNews(id)}>обновить комментарии</button>
      {kids === undefined || kids.length < 0 ? (
        <p>comments:0</p>
      ) : (
        <>
          <p>comments:{kids.length}</p>
          <ul>
            {comments.map((c, i) => (
              <li key={i}>{c.text}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
