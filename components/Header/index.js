import { FiSearch, FiBell } from 'react-icons/fi';
import Menu from './Menu/Menu';
import User from '../../public/user.svg';
import Logo from '../Logo';
import css from './header.module.scss';
import { useState } from 'react';
import GroupForms from './groupForms/GroupForms';

const Header = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className={css.main}>
      <div className={css.container}>
        <header className={css.header}>
          <Logo />
          <div className={css.input}>
            <input
              type="text"
              placeholder="Искать книги, авторов, жанры, издательства"
              className={css.inputCastom}
            />
            <FiSearch className={css.iconSearch} />
          </div>
          <div onClick={() => setModal(!modal)} className={css.menu}>
            <FiBell className={css.iconBell} />
            <div className={css.userMenu}>
              <User className={css.iconUser} />
              Войти
            </div>
          </div>
        </header>
        <Menu />
      </div>
      <GroupForms setModal={setModal} modal={modal} />
    </div>
  );
};
export default Header;
