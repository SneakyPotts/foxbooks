import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
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
import classNames from "classnames";

const Navigation = ({ setModal, bottomOnly }) => {
  const router = useRouter();
  const { isAuth } = useSelector(state => state.auth);
  const { innerWidthWindow } = useSelector(state => state.common);

  return (
    <nav className={css.navigation}>
      <div className={classNames(css.topMenu, {[css.hidden]: bottomOnly})}>
        <Link href="/books?type=books&sortBy=1">
          <a
            className={`${css.link} ${
              router.pathname === 'books' ? css.active : css.link
            }`}
          >
            <div className={css.icon}>
              <Book />
            </div>
            Книги
          </a>
        </Link>
        <Link href="/books?type=audioBooks&sortBy=1">
          <a
            className={`${css.link} ${css.linkStroke} ${
                router.asPath.includes('/books?type=audioBooks')
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
              router.pathname === '/selections'
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
        <Link href={`/new?sortBy=1&type=all`}>
          <a
            className={`${css.link} ${
              router.pathname === '/new' ? css.active : css.link
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
              router.pathname === '/categories' ? css.activeStroke : css.link
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
              router.pathname.includes('/mybooks') ? css.activeStroke : css.link
            }`}
          >
            <div className={css.icon}>
              <MyBooks />
            </div>
            Мои книги
          </a>
        </Link>

        <Link href="/settings">
          <a
            onClick={e => {
              if (!isAuth) {
                e.preventDefault();
                setModal();
              }
            }}
            className={`${css.link} ${css.linkStroke} ${css.noSpace} ${
              router.pathname.includes('/settings') ? css.activeStroke : css.link
            }`}
          >
            <div className={css.icon}>
              <User />
            </div>
            Профиль
          </a>
        </Link>
      </div>
    </nav>
  );
};
export default Navigation;
