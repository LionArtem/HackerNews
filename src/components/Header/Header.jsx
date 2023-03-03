import React from 'react';
import { Link } from 'react-router-dom';

import Style from './Header.module.scss';

export default function Header() {
  return (
    <Link className={Style.link} to="/">
      <h1 className={Style.title}>Hacker News</h1>
    </Link>
  );
}
