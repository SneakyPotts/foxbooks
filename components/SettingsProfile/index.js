import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Notification from '../Notification';
import NotificationItem from '../NotificationItem';
import Arrow from './../../public/chevron-right.svg';
import EditingProfile from './editingProfile';
import styles from './index.module.scss';
import SettingNotification from './settingNotification';
import SettingPassword from './settingPassword';
import classNames from 'classnames';
import Cookies from 'js-cookie';

import { setAuth } from '../../store/authSlice';
import { setHeaderVisibility } from '../../store/commonSlice';

import AvatarWithLetter from '../shared/common/AvatarWithLetter';
import BackBtn from '../shared/common/BackBtn';
import Bell from '../shared/icons/Bell';
import Lock from '../shared/icons/Lock';
import Exit from '../shared/icons/exit';
import Pencil from '../shared/icons/pencil';
import Setting from '../shared/icons/setting';

const settingMenu = [
  { text: 'Редактировать профиль', icon: <Pencil /> },
  { text: 'Настройки уведомлений', icon: <Bell /> },
  { text: 'Настройки пароля', icon: <Lock /> },
];

const SettingsProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { profile, notifications } = useSelector((state) => state.profile);

  const [currentIndexMenu, setCurrentIndexMenu] = useState(0);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [settingsIsVisible, setSettingsIsVisible] = useState(false);
  const [notificationsIsVisible, setNotificationsIsVisible] = useState(false);

  const handleMenuItemClick = (index) => {
    setCurrentIndexMenu(index);
    if (innerWidthWindow <= 768) {
      setMenuIsVisible(false);
    }
  };

  const handleNotificationClick = () => {
    dispatch(setHeaderVisibility(false));
    setNotificationsIsVisible(true);
  };

  const backHandler = () => {
    dispatch(setHeaderVisibility(true));
    setNotificationsIsVisible(false);
  };

  const logOut = () => {
    if (router.pathname.includes('settings') || router.pathname.includes('mybooks')) {
      router.push('/');
    }
    dispatch(setAuth(false));
    Cookies.remove('token');
    localStorage.removeItem('avatarColor');
  };

  return (
    <div className={classNames('container', styles.container)}>
      {innerWidthWindow <= 768 && !settingsIsVisible && !notificationsIsVisible && (
        <>
          <h1 className={'title'}>Профиль</h1>

          <div className={styles.settingFlex}>
            <Notification callback={handleNotificationClick} />
            <span className={styles.settingControl} onClick={() => setSettingsIsVisible(true)}>
              <Setting />
              Настройки
            </span>
          </div>

          <div className={styles.settingUser}>
            <div className={styles.settingUserAvatar}>
              {profile?.avatar ? (
                <Image src={profile?.avatar} alt="Avatar" width="102" height="102" placeholder="blur" blurDataURL="/blur.webp" />
              ) : (
                <AvatarWithLetter letter={profile?.nickname?.slice(0, 1) || profile?.name?.slice(0, 1) || 'П'} width={102} id={profile?.id} isProfile />
              )}
            </div>
            <span className={styles.settingUserName}>{profile?.nickname || `${profile?.name} ${profile?.surname || ''}`}</span>
          </div>

          <span className={classNames(styles.settingControl, styles.settingLogout)} onClick={logOut}>
            <Exit />
            <span>Выйти</span>
          </span>
        </>
      )}

      {(innerWidthWindow > 768 || (settingsIsVisible && !notificationsIsVisible)) && (
        <div className={styles.setting}>
          <div className={styles.settingMenu}>
            <h1 className={'title'}>Настройки профиля</h1>
            <div className={styles.settingDropdown}>
              <div
                className={classNames(styles.menuItem, styles.settingDropdownBtn, {
                  [styles.active]: menuIsVisible,
                })}
                onClick={() => setMenuIsVisible((prev) => !prev)}
              >
                {settingMenu[currentIndexMenu].icon}
                <span>{settingMenu[currentIndexMenu].text}</span>
                <span
                  className={classNames(styles.settingDropdownIcon, {
                    [styles.active]: menuIsVisible,
                  })}
                >
                  <Arrow />
                </span>
              </div>
              {(innerWidthWindow > 768 || menuIsVisible) && (
                <ul>
                  {settingMenu.map((r, index) => {
                    return (
                      <li key={r.text} className={classNames(styles.menuItem, { [styles.active]: currentIndexMenu === index })} onClick={() => handleMenuItemClick(index)}>
                        {r.icon}
                        <span>{r.text}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className={styles.settingContent}>
            {currentIndexMenu === 0 ? (
              <>
                <h2 className={'title'}>Редактировать профиль</h2>
                <EditingProfile />
              </>
            ) : currentIndexMenu === 1 ? (
              <>
                <h2 className={'title'}>Настройки уведомлений</h2>
                <SettingNotification />
              </>
            ) : (
              <>
                <h2 className={'title'}>Настройки пароля</h2>
                <SettingPassword />
              </>
            )}
          </div>
        </div>
      )}

      {innerWidthWindow <= 768 && !settingsIsVisible && notificationsIsVisible && (
        <>
          <BackBtn onClick={backHandler} externalClass={styles.backBtn} />
          <h1 className={classNames('title', styles.notificationTitle)}>Уведомления</h1>

          {notifications?.length ? (
            notifications.map((i) => <NotificationItem key={i?.createdAt} data={i} />)
          ) : (
            <p className={classNames('empty', styles.empty)}>Уведомлений нет</p>
          )}
        </>
      )}
    </div>
  );
};

export default SettingsProfile;
