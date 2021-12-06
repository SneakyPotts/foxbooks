import Link from 'next/link'
import Logo from "../Logo";
import Twitter from '../../public/twitter.svg'
import Telegram from '../../public/telegram.svg'
import Vk from '../../public/vkontakte.svg'
import css from './footer.module.css';


const Footer = () => {
    return <div className={css.wrapper}>
        <div className={css.container}>
            <div>
                <Logo />
                <p className={css.slogan}>Foxbooks.ag — мы лучшие в мире бесплатных онлайн книг</p>
            </div>
            <div className={css.footerInfo}>
                <div className={css.socialmedia}>
                    <Twitter className={css.socialmediaLink} />
                    <Telegram className={css.socialmediaLink} />
                    <Vk className={css.socialmediaLink} />
                </div>
                <ul className={css.pagesList}>
                    <Link href='#'><a className={css.page}>Книги</a></Link>
                    <Link href='#'><a className={css.page}>Аудиокниги</a></Link>
                    <Link href='#'><a className={css.page}>Правообладателям</a></Link>
                    <Link href='#'><a className={css.page}>Поддержка</a></Link>
                </ul>
                <p className={css.label}>©  2021 Foxbooks</p>
            </div>
            
        </div>
        
    </div>
}
export default Footer;