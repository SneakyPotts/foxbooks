import React, {useEffect, useState} from 'react';
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import styles from './styles.module.scss'
import {useForm} from "react-hook-form";
import PreviewUploader from "../shared/common/PreviewUploader";
import Image from 'next/image'
import classNames from "classnames";
import {yupResolver} from "@hookform/resolvers/yup";
import schema from "./schema";
import Input from "../shared/common/Input/Input";
import Button from "../shared/common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {generateFormData} from "../../utils";
import SelectionService from "../../http/SelectionService";
import {useRouter} from "next/router";
import {editCompilation} from "../../store/selectionSlice";

const CreateCompilationPopup = ({
  image,
  title,
  description,
  onClose,
  callback,
  isEdit
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const { innerWidthWindow } = useSelector(state => state.common)

  const [imgSrc, setImgSrc] = useState(image || '')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image,
      title,
      description
    }
  });

  const onSubmit = async data => {
    if(isEdit) {
      const d = generateFormData({
        ...data,
        id: router.query?.id
      })
      dispatch(editCompilation(d))
    } else {
      const d = generateFormData(data)
      const resp = await SelectionService.createCompilation(d)
      callback && callback(resp.data?.data)
    }
    onClose()
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'initial'
    }
  }, [])

  return (
    <ModalWindow
      isFullScreen
      onClose={onClose}
      externalClass={styles.wrapper}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={classNames(styles.previewWrapper, {
            [styles.withOverlay]: imgSrc
          })}
        >
          {imgSrc &&
            <Image
              src={imgSrc}
              layout={'fill'}
              className={styles.previewImg}
            />
          }

          <div className={styles.controls}>
            <PreviewUploader
              name={'image'}
              setValue={setValue}
              setImgSrc={setImgSrc}
            />

            <input
              type="text"
              {...register('title', { required: true, maxLength: 10 })}
              className={styles.title}
              placeholder={'Название'}
            />
            <span className={styles.error}>{errors.title?.message}</span>
            <span className={styles.controlsText}>100 символов</span>
          </div>
        </div>

        <div className={classNames("container", styles.container)}>
          <Input
            name={'description'}
            register={register}
            textLabel={'Опишите, о чем эта подборка'}
            isTextarea
            rows={innerWidthWindow > 768 ? 7 : 1}
          />
          <Button
            typeButton={'submit'}
            text={isEdit ? 'Редактировать подборку' : 'Создать подборку'}
            classNames={styles.btn}
          />
          <p className={styles.text}>и перейти к добавлению книг</p>
        </div>
      </form>
    </ModalWindow>
  );
};

export default CreateCompilationPopup;
