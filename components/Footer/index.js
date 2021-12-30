import Link from 'next/link';
import Logo from '../Logo';
import Twitter from '../../public/twitter.svg';
import Telegram from '../../public/telegram.svg';
import Vk from '../../public/vkontakte.svg';
import st from './footer.module.scss';

const Footer = () => {
  return (
    <div className={st.wrapper}>
      <div className={st.container}>
        <div>
          <Logo />
          <p className={st.slogan}>
            Foxbooks.ag — мы лучшие в мире бесплатных онлайн книг
          </p>
        </div>
        <div className={st.footerInfo}>
          <div className={st.socialmedia}>
            <Twitter className={st.socialmediaLink} />
            <Telegram className={st.socialmediaLink} />
            <Vk className={st.socialmediaLink} />
          </div>
          <ul className={st.pagesList}>
            <Link href="#">
              <a className={st.page}>Книги</a>
            </Link>
            <Link href="#">
              <a className={st.page}>Аудиокниги</a>
            </Link>
            <Link href="/holders">
              <a className={st.page}>Правообладателям</a>
            </Link>
            <Link href="/support">
              <a className={st.page}>Поддержка</a>
            </Link>
          </ul>
          <p className={st.label}>© 2021 Foxbooks</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
