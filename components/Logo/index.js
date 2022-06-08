import Link from 'next/link';
import { useSelector } from 'react-redux';
import LogoMobile from '../shared/icons/logoMobile';
import LogoIcon from '../shared/icons/Logo';
import st from './logo.module.scss';

const Logo = () => {
  const { innerWidthWindow } = useSelector(state => state.common);
  return (
    <Link href="/">
      <a className={st.logo}>
        {innerWidthWindow <= 768 ? <LogoMobile /> : <LogoIcon />}
      </a>
    </Link>
  );
};
export default Logo;
