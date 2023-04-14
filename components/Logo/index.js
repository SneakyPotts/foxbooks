import Link from 'next/link';

import { useSelector } from 'react-redux';

import st from './logo.module.scss';

import LogoIcon from '../shared/icons/Logo';
import LogoMobile from '../shared/icons/logoMobile';

const Logo = () => {
  const { innerWidthWindow } = useSelector((state) => state.common);
  return (
    <Link href="/">
      <a className={st.logo}>{innerWidthWindow <= 768 ? <LogoMobile /> : <LogoIcon />}</a>
    </Link>
  );
};
export default Logo;
