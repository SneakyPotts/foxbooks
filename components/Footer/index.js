import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import Telegram from '../../public/telegram.svg';
import Twitter from '../../public/twitter.svg';
import Vk from '../../public/vkontakte.svg';
import { currentYear } from '../../utils';
import Logo from '../Logo';
import classNames from 'classnames';

import st from './footer.module.scss';

const Footer = () => {
  const router = useRouter();
  const { innerWidthWindow } = useSelector((state) => state.common);

  const isShown = () => {
    return !(router.pathname.includes('reader') || router.pathname.includes('/404') || (innerWidthWindow < 768 && router.pathname.includes('/categories')));
  };

  return (
    <>
      {isShown() && (
        <div className={st.wrapper}>
          <div className={st.container}>
            <div>
              <div className={st.logo}>
                <Logo />
              </div>
              <p className={st.slogan}>Foxbooks.ec — мы лучшие в мире бесплатных онлайн книг</p>
            </div>
            <div className={st.footerInfo}>
              <div className={st.socialmedia}>
                <a
                  href=""
                  className={st.socialmediaLink}
                >
                  <Twitter />
                </a>
                <a
                  href=""
                  className={classNames(st.socialmediaLink, st.mobile)}
                >
                  <Telegram />
                </a>
                <a
                  href=""
                  className={st.socialmediaLink}
                >
                  <Vk />
                </a>
              </div>
              <nav className={st.pagesList}>
                <Link
                  href={{
                    pathname: '/[books_type]',
                    query: { books_type: 'books' },
                  }}
                >
                  <a className={st.page}>Книги</a>
                </Link>
                <Link
                  href={{
                    pathname: '/[books_type]',
                    query: { books_type: 'audiobooks' },
                  }}
                >
                  <a className={st.page}>Аудиокниги</a>
                </Link>
                <Link href="/holders">
                  <a className={st.page}>Правообладателям</a>
                </Link>
                <Link href="/support">
                  <a className={st.page}>Поддержка</a>
                </Link>
              </nav>
              <div className={st.txt}>
                <p className={st.label}>&#169;{`2024 - ${currentYear()} Foxbooks`}</p>
              </div>
            </div>
          </div>
          <p className={st.extraInfo}>
            Все материалы взяты из открытых источников и представлены исключительно в ознакомительных целях.Все права на книги принадлежат их авторам и издательствам.
          </p>
          <p className={st.extraInfo}>Внимание! Сайт может содержать материалы, не предназначенные для просмотра лицами, не достигшими 18 лет!</p>
        </div>
      )}
    </>
  );
};
export default Footer;
