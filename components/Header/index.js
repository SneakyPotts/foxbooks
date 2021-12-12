import { FiSearch, FiBell } from 'react-icons/fi';
import Menu from './Menu/Menu';
import User from '../../public/user.svg';
import Logo from '../Logo';
import css from './header.module.scss';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import { useState } from 'react';

const Header = () => {
  const [modal, setModal] = useState(true);

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
      <ModalWindow modal={modal} setModal={e => setModal(e)}>
        testsetsetset
      </ModalWindow>
    </div>
  );
};
export default Header;
