import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setBreakPoint } from '../headerSlice';
import Book from '../../shared/icons/navMenu/book';
import Fire from '../../shared/icons/navMenu/fire';
import MyBooks from '../../shared/icons/navMenu/myBooks';
import Selections from '../../shared/icons/navMenu/selections';
import Headphones from '../../shared/icons/headphones';
import Grid from '../../shared/icons/navMenu/grid';
import LogoMobileWhite from '../../shared/icons/logoMobileWhite';
import LogoMobileActive from '../../shared/icons/logoMobileActive';
import User from '../../shared/icons/user';
import css from './menu.module.scss';

const Navigation = ({ setModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state => state.auth);
  const { innerWidthWindow } = useSelector(state => state.headerSlice);
  // console.log(router);
  // console.log('innerWidthWindow', innerWidthWindow);

  useEffect(() => {
    dispatch(setBreakPoint(window.innerWidth));
    window.addEventListener('resize', function () {
      dispatch(setBreakPoint(this.innerWidth));
    });
  }, []);

  return (
    <>
      <nav className={css.navigation}>
        <div className={css.topMenu}>
          <Link href="/books?type=books&sortBy=1">
            <a
              className={`${css.link} ${
                router.pathname.includes('/books') ? css.active : css.link
              }`}
            >
              <div className={css.icon}>
                <Book />
              </div>
              Книги
            </a>
          </Link>
          <Link href="/audiobooks">
            <a
              className={`${css.link} ${css.linkStroke} ${
                router.pathname.includes('/audiobooks')
                  ? css.activeStroke
                  : css.link
              }`}
            >
              <div className={css.icon}>
                <Headphones />
              </div>

              <span>Аудиокниги</span>
            </a>
          </Link>
          <Link href="/selections">
            <a
              className={`${css.link} ${css.linkStroke} ${
                router.pathname.includes('/selections')
                  ? css.activeStroke
                  : css.link
              }`}
            >
              <div className={css.icon}>
                <Selections />
              </div>
              Подборки
            </a>
          </Link>
          <Link href="/new">
            <a
              className={`${css.link} ${
                router.pathname.includes('/new') ? css.active : css.link
              } ${innerWidthWindow <= 768 && css.noSpace}`}
            >
              <div className={css.icon}>
                <Fire />
              </div>
              Новинки
            </a>
          </Link>
        </div>

        <div className={css.dovnMenu}>
          <Link href="/">
            <a
              className={`${css.dovnMenuLogo} ${
                router.pathname !== '/' ? css.dovnMenuLogo : css.active
              }`}
            >
              {router.pathname === '/' ? (
                <LogoMobileActive />
              ) : (
                <LogoMobileWhite />
              )}
              <span className={css.dovnMenuLogoText}>Главная</span>
            </a>
          </Link>
          <Link href="/categories">
            <a
              className={`${css.link} ${css.linkStroke} ${css.noSpace} ${
                router.pathname == '/categories' ? css.activeStroke : css.link
              }`}
            >
              <div className={css.icon}>
                <Grid />
              </div>
              Категории
            </a>
          </Link>

          <Link href="/mybooks">
            <a
              onClick={e => {
                if (!isAuth) {
                  e.preventDefault();
                  setModal();
                }
              }}
              className={`${css.link} ${css.linkStroke} ${css.noSpace} ${
                router.pathname == '/mybooks' ? css.activeStroke : css.link
              }`}
            >
              <div className={css.icon}>
                <MyBooks />
              </div>
              Мои книги
            </a>
          </Link>

          <div
            onClick={() => setModal()}
            className={`${css.link} ${css.linkStroke} ${css.noSpace} ${css.dovnMenuLink}`}
          >
            <div className={css.icon}>
              <User />
            </div>
            Профиль
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navigation;
