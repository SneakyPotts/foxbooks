import React from 'react';
import styles from './index.module.scss';
import { useForm } from 'react-hook-form';
import ButtonGroup from '../buttonGroup';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../store/profileSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import PasswordField from "../../shared/common/PasswordField";

const SettingPassword = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    dispatch(resetPassword(data));
    reset();
  };

  return (
    <form className={styles.settingPassword} onSubmit={handleSubmit(onSubmit)}>
      <PasswordField
        err={errors.old_password?.message}
        textLabel="Текущий пароль"
        name="old_password"
        register={register}
      />
      <PasswordField
        err={errors.password?.message}
        textLabel="Новый пароль"
        name="password"
        register={register}
      />
      <PasswordField
        err={errors.password_confirmation?.message}
        textLabel="Повторите новый пароль"
        name="password_confirmation"
        register={register}
      />
      <ButtonGroup cancelClick={() => reset()} ClassName={styles.buttonDistance} />
    </form>
  );
};

export default SettingPassword;
