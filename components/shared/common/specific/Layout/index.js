import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cookiesSettings } from '../../../../../utils';
import AudioPlayer from '../../../../AudioPlayer';
import Footer from '../../../../Footer';
import Header from '../../../../Header';
import ArrowUp from '../../../icons/arrowUp';
import Cookies from 'js-cookie';
import debounce from 'lodash.debounce';
import { io } from 'socket.io-client';

import st from './layout.module.scss';

import { setAuth, signInWithSocial, verifyEmail } from '../../../../../store/authSlice';
import { setAuthPopupVisibility, setBreakPoint } from '../../../../../store/commonSlice';
import { addNotification, getProfile, setNewNotification } from '../../../../../store/profileSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { newPass } = router.query;

  if (!!newPass) {
    dispatch(setAuthPopupVisibility(true));
  }

  const { innerWidthWindow, playerIsVisible } = useSelector((state) => state.common);
  const { profile } = useSelector((state) => state.profile);

  const [position, setPosition] = useState(0);
  const [socket, setSocket] = useState(null);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // (async () => {
    //   const data = await CategoriesService.getCategories()
    //   dispatch(setCategories(data.data.data));
    // })()

    dispatch(setBreakPoint(window.innerWidth));
    window.addEventListener(
      'resize',
      debounce(() => {
        dispatch(setBreakPoint(window.innerWidth));
      }, 100),
    );

    const storageToken = Cookies.get('token');
    const { email, token, id, modalType } = router.query;

    if (email && token && modalType === 'registry') {
      dispatch(verifyEmail({ email, token }));
    } else if (token && id) {
      Cookies.remove('token');
      dispatch(signInWithSocial({ id, token })).then(() => {
        router.replace('/', { query: {} }, { shallow: true });
      });
    } else if (storageToken) {
      dispatch(getProfile());
      dispatch(setAuth(true));
      cookiesSettings({}, 'remove');
    }

    window.addEventListener(
      'scroll',
      debounce(function () {
        setPosition(this.scrollY);
      }, 300),
    );
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    const url = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

    if (token && profile?.id) {
      setSocket(
        io(url, {
          auth: {
            token,
          },
        }),
      );
    }
  }, [profile?.id]);

  useEffect(() => {
    if (socket) {
      socket.on('liked_comment', (res) => {
        if (profile?.user_settings?.likes) {
          const data = {
            ...res,
            type: 'like',
            caption: 'ваш комментарий',
          };
          dispatch(setNewNotification(true));
          dispatch(addNotification(data));
        }
      });

      socket.on('liked_review', (res) => {
        if (profile?.user_settings?.likes) {
          const data = {
            ...res,
            type: 'like',
            caption: 'вашу рецензию',
          };
          dispatch(setNewNotification(true));
          dispatch(addNotification(data));
        }
      });

      socket.on('new_answer_on_review', (res) => {
        if (profile?.user_settings?.commented) {
          const data = {
            ...res,
            type: 'answer',
            caption: 'на вашу рецензию о книге',
          };
          dispatch(setNewNotification(true));
          dispatch(addNotification(data));
        }
      });

      socket.on('new_answer_on_comment', (res) => {
        if (profile?.user_settings?.commented) {
          const data = {
            ...res,
            type: 'answer',
            caption: 'на ваш комментарий о книге',
          };
          dispatch(setNewNotification(true));
          dispatch(addNotification(data));
        }
      });

      socket.on('new_answer_in_branch', (res) => {
        if (profile?.user_settings?.commentedOthers) {
          const data = {
            ...res,
            type: 'answer',
            caption: 'в ветке коментариев о книге',
          };
          dispatch(setNewNotification(true));
          dispatch(addNotification(data));
        }
      });
    }
  }, [socket]);

  return (
    <div className={st.wrapper}>
      <Header socket={socket} />
      {children}
      {playerIsVisible && <AudioPlayer />}
      {innerWidthWindow <= 768 && position > 500 && router.pathname !== '/reader' && (
        <div
          onClick={scrollUp}
          className={st.buttonUp}
        >
          <ArrowUp />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Layout;
