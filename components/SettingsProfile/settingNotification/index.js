import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import ButtonGroup from '../buttonGroup';

import styles from './index.module.scss';

import { setNotificationSettings } from '../../../store/profileSlice';

import Checkbox from '../../shared/common/checkbox/checkbox';
import CommentSetting from '../../shared/icons/commentSetting';
import HeartSetting from '../../shared/icons/heartSetting';
import SgbCommentSetting from '../../shared/icons/sgbCommentSetting';

const data = [
  { svg: <HeartSetting />, bg: '#E92A20', title: 'Отметка нравится', subTitle: 'Уведомления о реакциях к вашим комментариям.', name: 'likes' },
  { svg: <CommentSetting />, bg: '#2D9CDB', title: 'Комментарии', subTitle: 'Оповестим, что на ваш комментарий ответили.', name: 'commented' },
  { svg: <SgbCommentSetting />, bg: '#27AE60', title: 'Также прокомментировали', subTitle: 'Кто-то еще написал в той же ветке обсуждений.', name: 'commentedOthers' },
];

const SettingNotification = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setNotificationSettings(data));
  };

  const setDefaultValues = () => {
    setValue('likes', !!profile?.user_settings?.likes);
    setValue('commented', !!profile?.user_settings?.commented);
    setValue('commentedOthers', !!profile?.user_settings?.commentedOthers);
  };

  useEffect(() => {
    setDefaultValues();
  }, [profile?.user_settings]);

  return (
    <div className={styles.container}>
      <div className={styles.notification}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          {data.map(({ svg, title, subTitle, name, bg }) => {
            return (
              <div
                className={styles.settingWrap}
                key={title}
              >
                <div className={styles.setting}>
                  <div
                    style={{ background: `${bg}` }}
                    className={styles.settingIcon}
                  >
                    {svg}
                  </div>
                  <div className={styles.settingDescription}>
                    <h3>{title}</h3>
                    <p>{subTitle}</p>
                  </div>
                </div>
                <div className={styles.checkbox}>
                  <Checkbox
                    register={register}
                    name={name}
                  />
                </div>
              </div>
            );
          })}
          <ButtonGroup
            cancelClick={setDefaultValues}
            ClassName={styles.groupButton}
          />
        </form>
      </div>
    </div>
  );
};

export default SettingNotification;
