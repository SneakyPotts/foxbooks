import React, {useState} from 'react';
import styles from './styles.module.scss'
import Image from "next/image";
import {useForm} from "react-hook-form";
import Input from "../shared/common/Input/Input";
import ButtonGroup from "../SettingsProfile/buttonGroup";
import {useDispatch, useSelector} from "react-redux";
import AvatarWithLetter from "../shared/common/AvatarWithLetter";
import {setAuthPopupVisibility} from "../../store/commonSlice";
import schema from "./schema";
import {yupResolver} from "@hookform/resolvers/yup";

const CommentForm = ({ submitFunc }) => {
  const dispatch = useDispatch()

  const { isAuth } = useSelector(state => state.auth)
  const { profile } = useSelector(state => state.profile)

  const [btnsIsVisible, setBtnsIsVisible] = useState(false);

  const {register, handleSubmit, setValue, formState: {errors}} = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputClick = () => {
    if(isAuth) {
      setBtnsIsVisible(true)
    } else {
      dispatch(setAuthPopupVisibility(true))
    }
  }

  const handleCancelClick = () => {
    setBtnsIsVisible(false)
    setValue('text', '')
  }

  const onSubmit = data => {
    submitFunc(data)
    setValue('text', '')
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.wrapper}>
        {isAuth &&
          <div className={styles.avatar}>
            {profile?.avatar ? (
              <Image
                src={profile?.avatar}
                alt="Avatar"
                width="35"
                height="35"
                placeholder="blur"
                blurDataURL="/blur.webp"
              />
            ) : (
              <AvatarWithLetter
                letter={
                  profile?.nickname?.slice(0, 1) ||
                  profile?.name?.slice(0, 1) ||
                  'П'
                }
                width={35}
                id={profile?.id}
                isProfile
              />
            )}
          </div>
        }

        <Input
          classNames={styles.input}
          register={register}
          name={'text'}
          placeholder={"Написать комментарий"}
          onClick={handleInputClick}
          err={errors?.text?.message}
        />
      </div>

      {btnsIsVisible &&
        <ButtonGroup
          text={'Отправить'}
          ClassName={styles.btns}
          typeButton={'submit'}
          cancelClick={handleCancelClick}
        />
      }
    </form>
  );
};

export default CommentForm;
