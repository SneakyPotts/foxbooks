import Link from 'next/link';
import LogoIcon from '../shared/icons/Logo';
import st from './logo.module.scss';

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <LogoIcon classNames={st.logo} />
      </a>
    </Link>
  );
};
export default Logo;
