import Link from 'next/link';
import LogoIcon from '../../public/Logo.svg';

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <LogoIcon />
      </a>
    </Link>
  );
};
export default Logo;
