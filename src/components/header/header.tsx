import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  return (
    <header>
      <nav className="header">
        <ul className="header__list">
          <li className="header__item">
            <Link className="header__link" to="/">Список дел</Link>
          </li>
          <li className="header__item">
            <Link className="header__link" to="/stats">Статистика</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
