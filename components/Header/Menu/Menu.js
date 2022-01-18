import Link from 'next/link';
import { useRouter } from 'next/router';
import Book from '../../shared/icons/navMenu/book';
import Fire from '../../shared/icons/navMenu/fire';
import MyBooks from '../../shared/icons/navMenu/myBooks';
import Selections from '../../shared/icons/navMenu/selections';
import Headphones from '../../shared/icons/headphones';
import Grid from '../../../public/grid.svg';
import css from './menu.module.css';

const Navigation = () => {
  const router = useRouter();
  // console.log(router);
  return (
    <>
      <nav className={css.navigation}>
        <Link
          href="/books"
          // href={{
          //   pathname: '/books',
          //   query: {
          //     page: 'Книги',
          //     comingFrom: 'home',
          //   },
          // }}
        >
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
        <Link
          href="/audiobooks"
          // href={{
          //   pathname: '/audiobooks',
          //   query: {
          //     page: 'Аудиокниги',
          //     comingFrom: 'home',
          //   },
          // }}
        >
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
        <Link
          href="/selections"
          // href={{
          //   pathname: '/selections',
          //   query: {
          //     page: 'Подборки',
          //     comingFrom: 'home',
          //   },
          // }}
        >
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
        <Link
          href="/new"
          // href={{
          //   pathname: '/new',
          //   query: {
          //     page: 'Новинки',
          //     comingFrom: 'home',
          //   },
          // }}
        >
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
        <Link href="/categories">
          <a
            className={`${css.link} ${css.linkStroke} ${
              router.pathname == '/categories' ? css.activeStroke : css.link
            }`}
          >
            <div className={css.icon}>
              <Grid />
            </div>
            Категории
          </a>
        </Link>
        <Link
          href="/mybooks"
          // href={{
          //   pathname: '/mybooks',
          //   query: {
          //     page: 'Мои книги',
          //     comingFrom: 'home',
          //   },
          // }}
        >
          <a
            className={`${css.link} ${css.linkStroke} ${
              router.pathname == '/mybooks' ? css.activeStroke : css.link
            }`}
          >
            <div className={css.icon}>
              <MyBooks />
            </div>
            Мои книги
          </a>
        </Link>
      </nav>
    </>
  );
};
export default Navigation;
