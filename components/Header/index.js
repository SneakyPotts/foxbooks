import {FiSearch, FiBell} from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import Menu from './Menu/Menu';
import User from '../shared/icons/user';
import Logo from '../Logo';
import GroupForms from './groupForms/GroupForms';
import Setting from '../shared/icons/setting';
import Exit from '../shared/icons/exit';
import Close from '../shared/icons/close';
import {setAuth} from '../../store/authSlice';
import Cookies from 'js-cookie';
import st from './header.module.scss';
import AvatarWithLetter from '../shared/common/AvatarWithLetter';
import {showMenu} from '../../store/commonSlice';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {innerWidthWindow, showMenu: showMenuFlag} = useSelector(
      state => state.common
  );

  const { isAuth } = useSelector(state => state.auth);
  const { profile } = useSelector(state => state.profile);
  const [modal, setModal] = useState(false);
  const [flagSettings, setFlagSettings] = useState(false);

  const onSearchInput = () => {
    dispatch(showMenu(true));
    const body = document.querySelector('body');
    body.classList.add('nonScroll');
  };

  const closeModal = () => {
    dispatch(showMenu(false));
    const body = document.querySelector('body');
    body.classList.remove('nonScroll');
  };

  const logOut = () => {
    if (router.pathname.includes('settings')) {
      router.push('/');
    }
    dispatch(setAuth(false));
    Cookies.remove('token');
    localStorage.removeItem('avatarColor');
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

    const isShown = () => {
        if (router.pathname.includes('reader')) {
            return false
        } else if (router.pathname.includes('/404')) {
            return false
        } else if (router.pathname.includes('/categories') && innerWidthWindow < 768) {
            return false
        } else return true
    }

    return (
        <>
            {isShown() && <div className={classNames(st.main)}>
                        <div className={st.container}>
                            <header className={st.header}>
                                <div className={st.logo}>
                                    <Logo/>
                                </div>
                                <div className={st.inputMenu}>
                                    <div className={st.input}>
                                        <input
                                            type="text"
                                            placeholder={
                                                innerWidthWindow >= 970
                                                    ? 'Искать книги, авторов, жанры, издательства'
                                                    : 'Искать книги'
                                            }
                                            className={classNames(st.inputCastom, {
                                                [st.inputCastomOpened]: showMenuFlag,
                                            })}
                                            onClick={onSearchInput}
                                        />
                                        <FiSearch
                                            className={classNames({
                                                [st.iconSearch]: !showMenuFlag,
                                                [st.active]: showMenuFlag,
                                            })}
                                        />
                                        {showMenuFlag && (
                                            <span className={st.closeIcon} onClick={closeModal}>
                        <Close/>
                      </span>
                                        )}
                                    </div>
                                    <div className={st.menu}>
                                        <FiBell className={st.iconBell}/>
                                        {isAuth ? (
                                            <div
                                                onClick={() => setFlagSettings(!flagSettings)}
                                                className={st.avatarUser}
                                            >
                                                <div>
                                                    {profile?.avatar ? (
                                                        <Image
                                                            src={profile?.avatar}
                                                            alt="Avatar"
                                                            width="40"
                                                            height="40"
                                                            placeholder="blur"
                                                            blurDataURL="/images/blur.jpg"
                                                        />
                                                    ) : (
                                                        <AvatarWithLetter
                                                            letter={
                                                                profile?.nickname?.slice(0, 1) ||
                                                                profile?.name?.slice(0, 1) ||
                                                                'П'
                                                            }
                                                            width={40}
                                                            id={profile?.id}
                                                            isProfile
                                                        />
                                                    )}
                                                </div>
                                                <div
                                                    className={classNames(st.settingAccount, {
                                                        [st.settingAccountActive]: flagSettings,
                                                    })}
                                                >
                                                    <ul>
                                                        <li>
                                                            <Setting/>
                                                            <Link href="/settings">
                                                                <a>Настройки профиля</a>
                                                            </Link>
                                                        </li>
                                                        <li onClick={logOut}>
                                                            <Exit/>
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
                                                <div className={st.iconUser}>
                                                    <User
                                                        style={{minWidth: '24px', minHeight: '24px'}}
                                                    />
                                                </div>
                                                Войти
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </header>
                            <Menu setModal={() => setModal(!modal)}/>
                        </div>
                        {showMenuFlag && (
                            <div className={st.overlay} onClick={closeModal}>
                                <div
                                    className={classNames(st.dropDown)}
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div className={classNames('container', st.border)}>
                                        <div className={st.dropDownContent}>
                                            <div className={st.dropDownContentUser}>
                                                <h2 className={st.dropDownContentTitle}>Часто ищут</h2>
                                                <ul className={st.dropDownContentPopular}>
                                                    {popularBooks.map(it => (
                                                        <li
                                                            key={it.id}
                                                            className={st.dropDownContentPopularItem}
                                                        >
                                                            <Image
                                                                src={it?.img}
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
                                            </div>
                                            <div className={st.dropDownContentAuthor}>
                                                <h2 className={st.dropDownContentTitle}>Авторы</h2>
                                                <ul className={st.authorsList}>
                                                    {authors.map(({id, author}) => (
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
                            </div>
                        )}
                        {/* <div className="container">
              
            </div> */}

                        <GroupForms setModal={setModal} modal={modal}/>
                    </div>}
        </>
    );
};
export default Header;
