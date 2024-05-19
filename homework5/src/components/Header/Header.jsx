// src/components/Header.js
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <div className="header">
      <Link className='link-header' to="/">Главная</Link>
      <Link className='link-header' to="/search">Поиск</Link>
    </div>
  );
};

export default Header;
