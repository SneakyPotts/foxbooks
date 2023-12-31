import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { cookiesSettings } from '../../../utils';
import { yupResolver } from '@hookform/resolvers/yup';
import classnames from 'classnames';
import * as yup from 'yup';
import { ref } from 'yup';

import css from './index.module.scss';

import { forgotPassword, resetError, resetForgotPassword, setAuth, signIn, signUp } from '../../../store/authSlice';
import { getProfile } from '../../../store/profileSlice';
import { getBookMarks, getBookQuotes, getSettings } from '../../../store/readerSlice';

import Button from '../../shared/common/Button/Button';
import Input from '../../shared/common/Input/Input';
import PasswordField from '../../shared/common/PasswordField';
import SocialNetwork from '../../shared/common/SocialNetwork/SocialNetwork';
import ModalWindow from '../../shared/common/modalWindow/ModalWindow';

const GroupForms = ({ modal, setModal }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [flagLogin, setFlagLogin] = useState(true);
  const [flagRegistration, setFlagRegistration] = useState(false);
  const [flagSendEmail, setFlagSendEmail] = useState(false);
  const [flagForgetPassword, setFlagForgetPassword] = useState(false);
  const [flagResetPassMessage, setFlagResetPassMessage] = useState(false);
  const [flagNewPass, setFlagNewPass] = useState(false);
  const [flagNewPassMessage, setFlagNewPassMessage] = useState(false);
  const [flagVerifyEmail, setFlagVerifyEmail] = useState(false);
  const [errorAlreadyUsedEmail, setErrorAlreadyUsedEmail] = useState(false);
  const [errorMissingEmail, setErrorMissingEmail] = useState(false);

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { isError } = useSelector((state) => state.auth);

  const rule = yup.string().required('Это обязательное поле').min(6, 'Минимальная длина пароля 6 символов');

  const schema = yup.object().shape({
    email: !flagNewPass && yup.string().required('Это обязательное поле').email('Неправильно введена электронная почта'),
    password: (flagRegistration || flagLogin || flagNewPass) && rule,
    password_confirm: flagNewPass && rule.oneOf([ref('password'), null], 'Пароли должны совпадать'),
  });

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitLogin = (data) => {
    dispatch(signIn(data)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        dispatch(getProfile()).then(() => {
          dispatch(setAuth(true));
          cookiesSettings({}, 'remove');
          setModal(!modal);
        });
        if (router.pathname.includes('reader')) {
          dispatch(getSettings());
          dispatch(getBookMarks(router.query?.id));
          dispatch(
            getBookQuotes({
              id: router.query?.id,
              my: 1,
              search: '',
            }),
          );
        }
      }
    });
  };

  const onSubmitRegistration = (data) => {
    dispatch(signUp(data)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setFlagRegistration(false);
        setFlagSendEmail(true);
        setErrorAlreadyUsedEmail(false);
      } else if (res.meta.requestStatus === 'rejected') {
        setErrorAlreadyUsedEmail(res.payload);
      }
    });
  };

  const onSubmitForgetPassword = (data) => {
    dispatch(forgotPassword(data)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setErrorMissingEmail(false);
        setFlagForgetPassword(false);
        setFlagResetPassMessage(true);
      } else if (res.meta.requestStatus === 'rejected') {
        setErrorMissingEmail(res.payload.message);
      }
    });
  };

  const onSubmitNewPassword = (data) => {
    const { email, token } = router.query;
    const reqData = {
      email,
      token,
      password: data.password,
      password_confirmation: data.password_confirm,
    };
    dispatch(resetForgotPassword(reqData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setFlagNewPass(false);
        setFlagNewPassMessage(true);
      }
    });
  };

  const closeModal = () => {
    dispatch(resetError());
    setModal(false);
    setFlagSendEmail(false);
    setFlagForgetPassword(false);
    setFlagRegistration(false);
    setFlagResetPassMessage(false);
    setFlagNewPassMessage(false);
    setErrorAlreadyUsedEmail(false);
    setErrorMissingEmail(false);
    reset();
  };

  useEffect(() => {
    const { modalType } = router.query;

    switch (modalType) {
      case 'password_forgot':
        setFlagNewPass(true);
        setFlagLogin(false);
        break;
      case 'registry':
        setFlagVerifyEmail(true);
        setFlagLogin(false);
        break;
      default:
        setFlagLogin(true);
        setFlagNewPass(false);
        setFlagVerifyEmail(false);
        break;
    }

    setFlagSendEmail(false);
    setFlagForgetPassword(false);
    setFlagRegistration(false);
    setFlagResetPassMessage(false);
    setFlagNewPassMessage(false);
    reset();
  }, [modal]);

  return (
    modal && (
      <ModalWindow
        onClose={closeModal}
        isFullScreen={innerWidthWindow <= 480}
      >
        <div className={css.login}>
          {flagLogin && <h2>Вход на FoxBooks</h2>}
          {(flagRegistration || flagSendEmail || flagVerifyEmail) && <h2 className={classnames({ [css.loginMin]: flagSendEmail })}>Регистрация</h2>}
          {flagResetPassMessage && <h2 className={css.loginMin}>Восстановить пароль</h2>}
          {flagForgetPassword && <h2 className={css.loginMin}>Забыли пароль?</h2>}
          {(flagNewPass || flagNewPassMessage) && <h2 className={css.loginMin}>Сброс пароля</h2>}

          {flagLogin && (
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <Input
                err={errors.email?.message}
                textLabel="Электронная почта"
                name="email"
                register={register}
              />
              <PasswordField
                err={errors.password?.message}
                textLabel="Пароль"
                name="password"
                register={register}
              />
              {isError && <p className={css.error}>Неверная почта или пароль</p>}
              <Button
                typeButton="submit"
                text="Вход"
                classNames={css.loginButton}
              />
              <div className={css.loginButtons}>
                <button
                  onClick={() => {
                    unregister('password');
                    setFlagLogin(false);
                    setFlagForgetPassword(true);
                    reset();
                  }}
                  type="button"
                >
                  Не помню пароль
                </button>
                <button
                  onClick={() => {
                    setFlagLogin(false);
                    setFlagRegistration(true);
                    reset();
                  }}
                  type="button"
                >
                  Зарегистрироваться
                </button>
              </div>
              <SocialNetwork />
            </form>
          )}

          {flagRegistration && (
            <form onSubmit={handleSubmit(onSubmitRegistration)}>
              <Input
                err={errors.email?.message || errorAlreadyUsedEmail}
                textLabel="Электронная почта"
                name="email"
                register={register}
              />
              <PasswordField
                err={errors.password?.message}
                textLabel="Пароль"
                name="password"
                register={register}
              />
              <Button
                typeButton="submit"
                text="Зарегистрироваться"
                classNames={css.loginButton}
              />
            </form>
          )}

          {(flagSendEmail || flagResetPassMessage || flagNewPassMessage || flagVerifyEmail) && (
            <div>
              {flagSendEmail && <p className={css.message}>Письмо с подтверждением регистрации выслано на вашу электронную почту.</p>}
              {flagResetPassMessage && <p className={css.message}>Письмо со ссылкой для восстановления пароля выслано на вашу почту.</p>}
              {flagNewPassMessage && <p className={css.message}>Ваш новый пароль вступил в силу.</p>}
              {flagVerifyEmail && <p className={css.message}>Поздравляем! Вы успешно зарегистрированны. Данные для входа отправлены на вашу электронную почту.</p>}
              <Button
                click={() => setModal(!modal)}
                typeButton="button"
                text="Закрыть"
                classNames={css.loginButton}
              />
            </div>
          )}

          {flagForgetPassword && (
            <div>
              <p className={css.message}>Укажите электронную почту, указаную при регистрации</p>
              <form onSubmit={handleSubmit(onSubmitForgetPassword)}>
                <Input
                  err={errors.email?.message || errorMissingEmail}
                  textLabel="Электронная почта"
                  name="email"
                  register={register}
                />
                <Button
                  text="Отправить"
                  classNames={css.loginButton}
                />
              </form>
            </div>
          )}

          {flagNewPass && (
            <div>
              <p className={css.message}>Укажите новый пароль</p>
              <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                <PasswordField
                  err={errors.password?.message}
                  textLabel="Новый пароль"
                  name="password"
                  register={register}
                />
                <PasswordField
                  err={errors.password_confirm?.message}
                  textLabel="Повтор пароля"
                  name="password_confirm"
                  register={register}
                />
                <p className={css.message}>Используйте латинские буквы A-z верхнего или нижнего регистра, а так же числа от 1 до 0.</p>
                <Button
                  text="Изменить пароль"
                  classNames={css.loginButton}
                />
              </form>
            </div>
          )}
        </div>
      </ModalWindow>
    )
  );
};

export default GroupForms;
