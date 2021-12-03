import { FiSearch, FiBell } from 'react-icons/fi';
import Menu from './Menu/Menu';
import User from '../../public/user.svg';
import css from './header.module.css';

const Header = () => {
  return (
    <div className={css.main}>
      <div className={css.container}>
        <header className={css.header}>
          <a href="/categories" className={css.logo}>
            <span className={css.logoAccent}>Fox</span>
            <span>Books</span>
          </a>
          <div className={css.input}>
            <input
              type="text"
              placeholder="Искать книги, авторов, жанры, издательства"
              className={css.inputCastom}
            />
            <FiSearch className={css.iconSearch} />
          </div>
          <div className={css.menu}>
            <FiBell className={css.iconBell} />
            <div className={css.userMenu}>
              <User className={css.iconUser} />
              Войти
            </div>
          </div>
        </header>

        <Menu />
      </div>
    </div>
  );
};
export default Header;
