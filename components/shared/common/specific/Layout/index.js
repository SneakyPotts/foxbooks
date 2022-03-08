import {useEffect, useState} from 'react';
import Header from '../../../../Header';
import Footer from '../../../../Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  setAuth,
  verifyEmail,
  signInWithSocial,
} from '../../../../../store/authSlice';
import Cookies from 'js-cookie';
import { getProfile } from '../../../../../store/profileSlice';
import AudioPlayer from '../../../../AudioPlayer';
import { setBreakPoint } from '../../../../../store/commonSlice';
import debounce from 'lodash.debounce';
import ArrowUp from '../../../icons/arrowUp';
import st from './layout.module.scss';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { playerIsVisible } = useSelector(state => state.common);

  const [position, setPosition] = useState(0);
  const { innerWidthWindow } = useSelector(state => state.common);

  useEffect(() => {
    dispatch(setBreakPoint(window.innerWidth));
    window.addEventListener(
      'resize',
      debounce(() => {
        dispatch(setBreakPoint(window.innerWidth));
      }, 100)
    );

    const storageToken = Cookies.get('token');
    const { email, token, id } = router.query;

    if (storageToken) {
      dispatch(getProfile());
      dispatch(setAuth(true));
    } else if (email && token) {
      dispatch(verifyEmail({ email, token }));
    } else if (token && id) {
      dispatch(signInWithSocial({ id, token }));
    }

    window.addEventListener('scroll', function () {
      setPosition(this.scrollY);
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className={st.wrapper}>
      <Header/>
      {children}
      {playerIsVisible && <AudioPlayer />}
      {innerWidthWindow <= 768 && position > 500 && (
        <div onClick={scrollUp} className={st.buttonUp}>
          <ArrowUp />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Layout;
