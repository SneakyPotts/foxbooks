import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import Menu from './Menu/Menu';
import User from '../shared/icons/user';
import Logo from '../Logo';
import GroupForms from './groupForms/GroupForms';
import Setting from '../shared/icons/setting';
import Exit from '../shared/icons/exit';
import {setAuth} from '../../store/authSlice';
import Cookies from 'js-cookie';
import st from './header.module.scss';
import AvatarWithLetter from '../shared/common/AvatarWithLetter';
import {setAuthPopupVisibility, showMenu} from '../../store/commonSlice';
import {search, setSearch} from "../../store/searchSlice";
import SearchInput from "../SearchInput";
import Notification from "../Notification";
import {clearNotification, setProfile} from "../../store/profileSlice";
import Search from "./Search";
import {setBookMarks, setQuotes, setSettings} from "../../store/readerSlice";

const Header = ({ socket }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    innerWidthWindow,
    headerIsVisible,
    showMenuFlag,
    authPopupIsVisible
  } = useSelector(state => state.common);

  const {isAuth} = useSelector(state => state.auth);
  const {profile} = useSelector(state => state.profile);

  const [flagSettings, setFlagSettings] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  const showAuthPopup = () => {
    dispatch(setAuthPopupVisibility(true))
  }

  const hideAuthPopup = () => {
    const { email, token } = router.query;

    (email || token) && router.push(router.pathname, null, {scroll: false})

    setTimeout(() => {
      dispatch(setAuthPopupVisibility(false))
    }, 0)
  }

  const hidePopup = () => {
    setFlagSettings(false)
  }

  const openModal = () => {
    dispatch(showMenu(true));
    document.body.classList.add('nonScroll');
  };

  const closeModal = () => {
    dispatch(showMenu(false));
    dispatch(setSearch({}));
    document.body.classList.remove('nonScroll');
  };

  const logOut = () => {
    if (router.pathname.includes('settings') || router.pathname.includes('mybooks')) {
      router.push('/');
    }
    dispatch(setAuth(false));
    Cookies.remove('token');
    localStorage.removeItem('avatarColor');
    dispatch(setProfile([]))
    dispatch(clearNotification())
    dispatch(setBookMarks([]))
    dispatch(setQuotes([]))
    dispatch(setSettings({
      isTwoColumns: false,
      fontSize: 0,
      screenBrightness: 5,
      fontName: 'Times New Roman',
      fieldSize: 2,
      rowHeight: 2,
      isCenterAlignment: false
    }))
    socket.disconnect()
  };

  const isShown = useMemo(() => {
    if (router.pathname.includes('reader')) {
      return false
    } else if (router.pathname.includes('404')) {
      return false
    } else if (router.pathname.includes('categories') && innerWidthWindow <= 768) {
      return false
    } else {
      return true
    }
  }, [router.pathname, innerWidthWindow])

  const showOnlyMenu = useMemo(() => {
    if(innerWidthWindow <= 768 && router.pathname.includes('mybooks')) {
      return !headerIsVisible
    } else if (router.pathname.includes('selections') && router.query.id && innerWidthWindow <= 768) {
      return true
    } else if (router.pathname.includes('mybooks/selection') && router.query.id && innerWidthWindow <= 768) {
      return true
    } else if (innerWidthWindow <= 768 && !headerIsVisible && router.pathname.includes('settings')) {
      return true
    } else {
      return false
    }
  }, [router.pathname, innerWidthWindow, headerIsVisible])

  const onChange = async str => {
    setSearchValue(str)
    const response = await dispatch(search({ str, type: 'short' }))
    const {books, authors} = response?.payload

    if(books?.length || authors?.length) {
      openModal()
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', hidePopup)

    return () => {
      document.body.removeEventListener('click', hidePopup)
    }
  }, [])

  return isShown &&
    <div className={classNames(st.main, {[st.hidden]: showOnlyMenu})}>
      <div className={st.container}>
        <header className={st.header}>
          <div className={st.logo}>
            <Logo/>
          </div>

          <div className={st.inputMenu}>
            <SearchInput
              withModal
              showMenuFlag={showMenuFlag}
              // onClick={openModal}
              onChange={onChange}
              onClose={closeModal}
              placeholder={
                innerWidthWindow >= 970
                  ? 'Искать книги, авторов, жанры, издательства'
                  : 'Искать книги'
              }
            />

            <div className={st.menu}>
              <Notification />
              {isAuth ? (
                <div
                  onClick={ev => {
                    ev.stopPropagation()
                    setFlagSettings(!flagSettings)
                  }}
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
                        blurDataURL="/blur.webp"
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
                    onClick={ev => ev.stopPropagation()}
                  >
                    <ul>
                      <li>
                        <Link href="/settings">
                          <a className={st.settingLink}>
                            <Setting/>
                            Настройки профиля
                          </a>
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
                  onClick={showAuthPopup}
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

        <Menu
          setModal={showAuthPopup}
          bottomOnly={showOnlyMenu}
        />
      </div>

      {showMenuFlag &&
        <Search
          value={searchValue}
          onClose={closeModal}
        />
      }

      <GroupForms
        setModal={hideAuthPopup}
        modal={authPopupIsVisible}
      />
    </div>
};

export default Header;