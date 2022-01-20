import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Book from '../../shared/icons/navMenu/book';
import Fire from '../../shared/icons/navMenu/fire';
import MyBooks from '../../shared/icons/navMenu/myBooks';
import Selections from '../../shared/icons/navMenu/selections';
import Headphones from '../../shared/icons/headphones';
import Grid from '../../../public/grid.svg';
import LogoMobileWhite from '../../shared/icons/logoMobileWhite';
import LogoMobileActive from '../../shared/icons/logoMobileActive';
import User from '../../shared/icons/user';
import css from './menu.module.scss';

const Navigation = ({ setModal }) => {
  const router = useRouter();
  const { isAuth } = useSelector(state => state.auth);
  // console.log(router);
  return (
    <>
      <nav className={css.navigation}>
        <Link href="/books?sortBy=1">
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
            }`}
          >
            <div className={css.icon}>
              <Fire />
            </div>
            Новинки
          </a>
        </Link>

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
