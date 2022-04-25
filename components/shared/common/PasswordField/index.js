import React, {useState} from 'react';
import s from './styles.module.scss'
import Input from "../Input/Input";
import OpenEye from './../../icons/eyeOpen';
import CloseEye from './../../icons/eyeOff';

const PasswordField = (props) => {
  const [type, setType] = useState("password")

  const toggleType = () => {
    setType(type === 'password' ? 'text' : 'password')
  }

  return (
    <div className={s.wrapper}>
      <Input
        typeInput={type}
        {...props}
      />
      <div
        className={s.iconWrapper}
        onClick={toggleType}
      >
        {type === 'password' ?
          <CloseEye /> :
          <OpenEye />
        }
      </div>
    </div>
  );
};

export default PasswordField;