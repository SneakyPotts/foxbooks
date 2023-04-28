import Image from 'next/image';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { generateFormData } from '../../utils';
import schema from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import styles from './styles.module.scss';

import { createCompilation, editCompilation } from '../../store/selectionSlice';

import Button from '../shared/common/Button/Button';
import Input from '../shared/common/Input/Input';
import PreviewUploader from '../shared/common/PreviewUploader';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';

const CreateCompilationPopup = ({ image, title, description, onClose, isEdit }) => {
  const dispatch = useDispatch();

  const { innerWidthWindow } = useSelector((state) => state.common);
  const selectionId = useSelector((state) => state.selection.selectionById.compilation?.id);

  const [imgSrc, setImgSrc] = useState(image || '');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image,
      title,
      description,
    },
  });

  const onSubmit = async (data) => {
    if (isEdit) {
      const d = generateFormData({
        ...data,
        id: selectionId,
      });
      dispatch(editCompilation(d));
    } else {
      const d = generateFormData(data);
      dispatch(createCompilation(d));
    }
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);

  return (
    <ModalWindow isFullScreen onClose={onClose} externalClass={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div
          className={classNames(styles.previewWrapper, {
            [styles.withOverlay]: imgSrc,
          })}
        >
          {imgSrc && <Image src={imgSrc} alt={'compilation image'} layout={'fill'} className={styles.previewImg} />}

          <div className={styles.controls}>
            <PreviewUploader name={'image'} setValue={setValue} setImgSrc={setImgSrc} />
            <span className={styles.error} style={{ marginTop: '5px' }}>
              {errors.image?.message}
            </span>

            <input type="text" {...register('title', { required: true, maxLength: 10 })} className={styles.title} placeholder={'Название'} />
            <span className={styles.error}>{errors.title?.message}</span>
            <span className={styles.controlsText}>100 символов</span>
          </div>
        </div>

        <div className={classNames('container', styles.container)}>
          <Input name={'description'} register={register} textLabel={'Опишите, о чем эта подборка'} isTextarea rows={innerWidthWindow > 768 ? 7 : 1} />
          <p className={styles.error}>{errors.description?.message}</p>
          <Button typeButton={'submit'} text={isEdit ? 'Редактировать подборку' : 'Создать подборку'} classNames={styles.btn} />
          <p className={styles.text}>и перейти к добавлению книг</p>
        </div>
      </form>
    </ModalWindow>
  );
};

export default CreateCompilationPopup;
