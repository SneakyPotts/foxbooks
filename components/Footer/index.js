import Link from 'next/link';
import Logo from '../Logo';
import Twitter from '../../public/twitter.svg';
import Telegram from '../../public/telegram.svg';
import Vk from '../../public/vkontakte.svg';
import st from './footer.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import {useSelector} from "react-redux";

const Footer = () => {
  const router = useRouter();
  const { innerWidthWindow } = useSelector(state => state.common);

  const isShown = () => {
    if (router.pathname.includes('reader')) {
      return false
    } else if (router.pathname.includes('/404')) {
      return false
    } else if ( innerWidthWindow < 768 && router.pathname.includes('/categories')) {
      return false
    } else return true
  }

  return (
    <>
      { isShown() && <div className={st.wrapper}>
        <div className={st.container}>
          <div>
            <div className={st.logo}>
              <Logo />
            </div>
            <p className={st.slogan}>
              Foxbooks.ag — мы лучшие в мире бесплатных онлайн книг
            </p>
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
              <Link href="/books?type=books&sortBy=1">
                <a className={st.page}>Книги</a>
              </Link>
              <Link href="/books?type=audioBooks&sortBy=1">
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
      }
    </>
  );
};
export default Footer;
