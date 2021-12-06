import Link from 'next/link';
import css from './logo.module.css';

const Logo = () => {
    return <Link href="/categories" >
        <a className={css.logo}><span className={css.logoAccent}>Fox</span>
            <span>Books</span>
        </a>
    </Link>
}
export default Logo;