import React from 'react';
import convertTimestamp from '../.././utils/convertTimestamp/convertTimestamp';

export default function PageNews(props) {
  const { url, title, time, by, kids } = props.oneNews;
  const [comments, setComments] = React.useState([]);

  console.log(kids);
  console.log('fff');

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

  function name() {
    if (kids !== undefined && kids.length > 0) {
      kids.forEach((element) => {
        getListComments(element);
      });
    }
  }
  name();

  // console.log(comments);
  return (
    <div>
      <a href={url}>
        <p>{url}</p>
        <h1>{title}</h1>
      </a>
      <span>{convertTimestamp(time)}</span>
      <h2>{by}</h2>
      {`comments:${kids && <p>{kids.length}</p>}`}
      <ul>
        {/* {comments.map((c, i) => {
          <li key={i}>{c.text}</li>;
        })} */}
      </ul>
    </div>
  );
}
