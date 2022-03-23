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
import OpenEye from '../../shared/icons/eyeOpen';
import CloseEye from '../../shared/icons/eyeOff';

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

  const [inputType, setInputType] = useState('password');

  const onSubmit = data => {
    dispatch(resetPassword(data));
    reset();
  };

  const handleShowPassword = e => {
    e.stopPropagation();
    setInputType('text');
  };

  const handleHeidPassword = e => {
    e.stopPropagation();
    setInputType('password');
  };

  return (
    <form className={styles.settingPassword} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <Input
          classNames={styles.inputCurrent}
          err={errors.old_password?.message}
          textLabel="Текущий пароль"
          name="old_password"
          typeInput={inputType}
          register={register}
        />
        {inputType === 'password' ? (
          <div
            onClick={e => handleShowPassword(e)}
            className={styles.inputIcon}
          >
            <CloseEye />
          </div>
        ) : (
          <div
            onClick={e => handleHeidPassword(e)}
            className={styles.inputIcon}
          >
            <OpenEye />
          </div>
        )}
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
      <ButtonGroup cancelClick={() => reset()} ClassName={styles.buttonDistance} />
    </form>
  );
};

export default SettingPassword;
