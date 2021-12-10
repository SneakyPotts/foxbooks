import Link from 'next/link';
import { BiGridAlt } from 'react-icons/bi';
import { useRouter } from 'next/router';
import css from './menu.module.css';

const Navigation = () => {
  const router = useRouter();

  return (
    <>
      <nav className={css.navigation}>
        <BiGridAlt className={css.icon} />
        <Link href="/categories">
          <a
            className={`${css.link} ${
              router.pathname == '/categories' ? css.active : css.link
            }`}
          >
            Категории
          </a>
        </Link>
        <Link href="/books">
          <a
            className={`${css.link} ${
              router.pathname == '/books' ? css.active : css.link
            }`}
          >
            Книги
          </a>
        </Link>
        <Link href="/audiobooks">
          <a
            className={`${css.link} ${
              router.pathname == '/audiobooks' ? css.active : css.link
            }`}
          >
            Аудиокниги
          </a>
        </Link>
        <Link href="/compilations">
          <a
            className={`${css.link} ${
              router.pathname == '/compilations' ? css.active : css.link
            }`}
          >
            Подборки
          </a>
        </Link>
        <Link href="/new">
          <a
            className={`${css.link} ${
              router.pathname == '/new' ? css.active : css.link
            }`}
          >
            Новинки
          </a>
        </Link>
        <Link href="/mybooks">
          <a
            className={`${css.link} ${
              router.pathname == '/mybooks' ? css.active : css.link
            }`}
          >
            Мои книги
          </a>
        </Link>
      </nav>
    </>
  );
};
export default Navigation;
