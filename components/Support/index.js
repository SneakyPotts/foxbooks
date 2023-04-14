import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Clip from '../../public/clip.svg';
import { generateFormData, isFileImage } from '../../utils';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import schema from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Compressor from 'compressorjs';

import styles from './index.module.scss';

import CommonService from '../../http/CommonService';

import Button from '../shared/common/Button/Button';
import Input from '../shared/common/Input/Input';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';

const SupportPage = () => {
  const [sources, setSources] = useState([]);
  const [files, setFiles] = useState([]);

  const [modal, setModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const dataObj = files?.length
      ? {
          ...data,
          attachments: files,
        }
      : data;

    CommonService.sendSupport(generateFormData(dataObj)).then(() => {
      setModal(true);
      setSources([]);
      setFiles([]);
      reset();
    });
  };

  const onCancel = () => {
    setSources([]);
    setFiles([]);
    reset();
  };

  const generateBase64img = (data) => {
    let allPromises = [];

    data.forEach((file) => {
      if (isFileImage(file?.name)) {
        const onloadPhoto = new Promise((resolver) => {
          new Compressor(file, {
            quality: 1,
            resize: 'cover',
            width: 86,
            height: 86,
            convertSize: 1,
            success(result) {
              let reader = new FileReader();
              reader.readAsDataURL(result);
              reader.onloadend = function () {
                resolver({ reader, result });
              };
            },
          });
        });

        allPromises.push(onloadPhoto);
      }
    });

    Promise.all(allPromises).then((values) => {
      values?.forEach(({ reader, result }) => {
        setSources((prev) => [...prev, reader.result]);
        setFiles((prev) => [...prev, result]);
      });
    });
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);
    generateBase64img(files);
  };

  return (
    <div className={'container'}>
      <div className={styles.helpTitle}>
        <h1 className="title">Нужна помощь? </h1>
        <p>
          Если у вас появились вопросы или проблемы связанные с использованием сайта, напишите нашей службе поддержки, заполнив форму ниже. Ответ технических специалистов
          может занимать до 24-х часов.
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input classNames={styles.inputWidth} register={register} textLabel={'Тема обращения'} name="subject" err={errors?.subject?.message} />
        <Input classNames={styles.inputWidth} register={register} textLabel={'Ваше имя'} name="name" err={errors?.name?.message} />
        <Input classNames={styles.inputWidth} register={register} typeInput="email" textLabel={'Электронная почта'} name="email" err={errors?.email?.message} />
        <div className={styles.inputArea}>
          <Input
            classNames={classNames(styles.textArea, {
              [styles.more]: sources?.length,
            })}
            register={register}
            textLabel={'Сообщение'}
            name="message"
            err={errors?.message?.message}
            isTextarea
            rows={6}
          />
          <label className={styles.filesBlock}>
            <input type="file" className="visually-hidden" multiple onChange={onChange} />

            <span className={styles.textAreaClip}>
              <Clip />
              <span className={styles.fileText}>Файл</span>

              {sources?.length > 0 && <span className={styles.imgsCount}>{sources?.length}</span>}
            </span>

            <span className={styles.dropImgs}>
              {sources?.map((i) => (
                <span key={i} className={styles.dropBlock}>
                  <img height="86px" width="86px" src={i} alt={'Picture'} className={styles.dropBlockImg} />
                </span>
              ))}
            </span>
          </label>
        </div>

        <ButtonGroup ClassName={styles.buttons} text="Отправить" cancelClick={onCancel} />
      </form>

      {modal && (
        <ModalWindow onClose={() => setModal(false)}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Отправлено</h3>
            <p>Спасибо за то, что помогаете делать наш сайт лучше.</p>
            <br />
            <p>Наши сотрудники ответят на ваш запрос как можно скорее.</p>
          </div>
          <Button text="Закрыть" click={() => setModal(false)} />
        </ModalWindow>
      )}
    </div>
  );
};

export default SupportPage;
