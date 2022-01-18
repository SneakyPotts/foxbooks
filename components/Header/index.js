import { FiSearch, FiBell } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Menu from './Menu/Menu';
import User from '../../public/user.svg';
import Logo from '../Logo';
import GroupForms from './groupForms/GroupForms';
import Setting from '../shared/icons/setting';
import Exit from '../shared/icons/exit';
import Close from '../../public/close.svg';
import { ShowMenu } from './headerSlice';
import st from './header.module.scss';
import { setAuth } from '../../store/authSlice';
import Cookies from 'js-cookie';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showMenu } = useSelector(state => state.headerSlice);
  const { isAuth } = useSelector(state => state.auth);
  const [modal, setModal] = useState(false);
  const [flagSettings, setFlagSettings] = useState(false);

  const onSearchInput = () => {
    dispatch(ShowMenu(true));
    const body = document.querySelector('body');
    body.classList.add('nonScroll');
  };

  const closeModal = () => {
    dispatch(ShowMenu(false));
    const body = document.querySelector('body');
    body.classList.remove('nonScroll');
  };

  const logOut = () => {
    dispatch(setAuth(false));
    Cookies.remove('token');
  };

  const popularBooks = [
    {
      id: '0',
      img: '/reviewsBookCovers/cover1.png',
      name: 'Пост 2. Спастись и сохранить',
    },
    {
      id: '1',
      img: '/reviewsBookCovers/cover2.png',
      name: 'Девочка в нулевой степени',
    },
    {
      id: '2',
      img: '/reviewsBookCovers/cover3.png',
      name: 'Предружба. Второй шанс',
    },
    {
      id: '3',
      img: '/reviewsBookCovers/cover1.png',
      name: 'Четыре ветра',
    },
    {
      id: '4',
      img: '/reviewsBookCovers/cover2.png',
      name: 'Последний ход',
    },
    {
      id: '5',
      img: '/reviewsBookCovers/cover3.png',
      name: 'Лето в пионерском галстуке',
    },
  ];
  const authors = [
    { id: '0', author: 'Михаил Булгаков' },
    { id: '1', author: 'Стивен Кинг' },
    { id: '2', author: 'Эрих Мария Ремарк' },
    { id: '3', author: 'Фёдор Достоевский' },
    { id: '4', author: 'Оскар Уайльд' },
    { id: '5', author: 'Рэй Брэдбери' },
    { id: '6', author: 'Джоан Роулинг' },
    { id: '7', author: 'Дэниел Киз' },
    { id: '8', author: 'Джордж Оруэлл' },
    { id: '9', author: 'Антуан де Сент-Экзюпери' },
  ];

  return (
    <>
      {!router.pathname.includes('reader') &&
        !router.pathname.includes('/404') && (
          <div className={st.main}>
            <div className={st.container}>
              <header className={st.header}>
                <Logo />
                <div className={st.input}>
                  <input
                    type="text"
                    placeholder="Искать книги, авторов, жанры, издательства"
                    className={st.inputCastom}
                    onClick={onSearchInput}
                  />
                  <FiSearch
                    className={classNames({
                      [st.iconSearch]: !showMenu,
                      [st.active]: showMenu,
                    })}
                  />
                  {showMenu && (
                    <span className={st.closeIcon} onClick={closeModal}>
                      <Close />
                    </span>
                  )}
                </div>
                <div className={st.menu}>
                  <FiBell className={st.iconBell} />
                  {isAuth ? (
                    <div
                      onClick={() => setFlagSettings(!flagSettings)}
                      className={st.avatarUser}
                    >
                      <div>
                        <Image
                          src="/horizontalBookCovers/book.png"
                          alt=""
                          width="40"
                          height="40"
                          placeholder="blur"
                          blurDataURL="/images/blur.jpg"
                        />
                      </div>
                      <div
                        className={classNames(st.settingAccount, {
                          [st.settingAccountActive]: flagSettings,
                        })}
                      >
                        <ul>
                          <li>
                            <Setting />
                            <Link href="/settings">
                              <a>Настройки профиля</a>
                            </Link>
                          </li>
                          <li onClick={logOut}>
                            <Exit />
                            <span>Выйти</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setModal(!modal)}
                      className={st.userMenu}
                    >
                      <User className={st.iconUser} />
                      Войти
                    </div>
                  )}
                </div>
              </header>
            </div>
            {showMenu && (
              <div className={st.overlay} onClick={closeModal}>
                <div
                  className={classNames(st.dropDown)}
                  onClick={e => e.stopPropagation()}
                >
                  <div className={classNames('container', st.border)}>
                    <div className={st.dropDownContent}>
                      <h2 className={st.dropDownContentTitle}>Часто ищут</h2>
                      <ul className={st.dropDownContentPopular}>
                        {popularBooks.map(it => (
                          <li
                            key={it.id}
                            className={st.dropDownContentPopularItem}
                          >
                            <Image
                              src={it.img}
                              width={124}
                              height={187}
                              // layout="fill"
                              placeholder="blur"
                              blurDataURL="/images/blur.jpg"
                            />
                            <h4 className={st.dropDownContentPopularItemName}>
                              {it.name}
                            </h4>
                          </li>
                        ))}
                      </ul>
                      <h2 className={st.dropDownContentTitle}>Авторы</h2>
                      <ul className={st.authorsList}>
                        {authors.map(({ id, author }) => (
                          <Link href="#" key={id} className={st.author}>
                            <a>
                              <h4 className={st.authorName}>{author}</h4>
                            </a>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="container">
              <Menu />
            </div>

            <GroupForms setModal={setModal} modal={modal} />
          </div>
        )}
    </>
  );
};
export default Header;
