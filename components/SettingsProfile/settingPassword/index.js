import React from 'react';
import { useState } from 'react';
import styles from './index.module.scss';
import Input from '../../shared/common/Input/Input';
import { useForm } from 'react-hook-form';
import ButtonGroup from '../buttonGroup';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../store/profileSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './schema';
import OpenEye from '../../shared/icons/openEye';

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
  const [type, setType] = useState('password');

  const handleShowPassword = () => {
    setType('text');
  };

  const onSubmit = data => {
    dispatch(resetPassword(data));
    reset();
  };

  return (
    <form className={styles.settingPassword} onSubmit={handleSubmit(onSubmit)}>
      <div onClick={handleShowPassword}>
        <Input
          classNames={styles.inputCurrent}
          err={errors.old_password?.message}
          textLabel="Текущий пароль"
          name="old_password"
          typeInput={type}
          register={register}
        />
        {/* {(typeInput = 'password' && <OpenEye />)} */}
      </div>
      <Input
        classNames={styles.inputNew}
        err={errors.password?.message}
        textLabel="Новый пароль"
        name="password"
        typeInput="password"
        register={register}
      />
      <Input
        classNames={styles.inputLast}
        err={errors.password_confirmation?.message}
        textLabel="Повторите новый пароль"
        name="password_confirmation"
        typeInput="password"
        register={register}
      />
      <ButtonGroup />
    </form>
  );
};

export default SettingPassword;
