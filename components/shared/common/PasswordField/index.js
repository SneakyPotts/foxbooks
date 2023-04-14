import React, { useState } from 'react';

import Input from '../Input/Input';
import CloseEye from './../../icons/eyeOff';
import OpenEye from './../../icons/eyeOpen';

import s from './styles.module.scss';

const PasswordField = (props) => {
  const [type, setType] = useState('password');

  const toggleType = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  return (
    <div className={s.wrapper}>
      <Input typeInput={type} {...props} />
      <div className={s.iconWrapper} onClick={toggleType}>
        {type === 'password' ? <CloseEye /> : <OpenEye />}
      </div>
    </div>
  );
};

export default PasswordField;
