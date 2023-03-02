import React from 'react';
import { Link } from 'react-router-dom';

import Style from './Header.module.scss';

export default function Header() {
  return (
    <Link to='/'>
      <h1 className={Style.root}>SomeName</h1>
    </Link>
  );
}
