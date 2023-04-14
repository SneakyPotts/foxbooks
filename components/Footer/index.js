import Link from 'next/link';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';

import Telegram from '../../public/telegram.svg';
import Twitter from '../../public/twitter.svg';
import Vk from '../../public/vkontakte.svg';
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
              <p className={st.slogan}>Foxbooks.ag — мы лучшие в мире бесплатных онлайн книг</p>
            </div>
            <div className={st.footerInfo}>
              <div className={st.socialmedia}>
                <a href="" className={st.socialmediaLink}>
                  <Twitter />
                </a>
                <a href="" className={classNames(st.socialmediaLink, st.mobile)}>
                  <Telegram />
                </a>
                <a href="" className={st.socialmediaLink}>
                  <Vk />
                </a>
              </div>
              <nav className={st.pagesList}>
                <Link href="/books">
                  <a className={st.page}>Книги</a>
                </Link>
                <Link href="/audiobooks">
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
                <p className={st.label}>© 2021 Foxbooks</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Footer;
