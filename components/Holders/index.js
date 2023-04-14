import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import ButtonGroup from '../SettingsProfile/buttonGroup';
import schema from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';

import styles from './index.module.scss';

import CommonService from '../../http/CommonService';

import Button from '../shared/common/Button/Button';
import Input from '../shared/common/Input/Input';
import Checkbox from '../shared/common/checkbox/checkbox';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';

const HoldersRight = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [modal, setModal] = useState(false);

  const checkboxData = [
    { text: 'Я даю согласие на обработку и хранение персональных данных.', name: 'agreement' },
    { text: 'Я являюсь правообладателем или представителем правообладателя спорного контента.', name: 'copyright_holder' },
    {
      text: 'Я выражаю свое согласие с тем, что моя электронная почта может быть использована администрацией сайта для дальнейшего взаимодействия.',
      name: 'interaction',
    },
  ];

  const onSubmit = (data) => {
    CommonService.sendClaim(data).then(() => {
      setModal(true);
      reset();
    });
  };

  const onCancel = () => {
    reset();
  };

  return (
    <div className={classNames('container', styles.container)}>
      <div className={styles.holderTitle}>
        <h1 className="title">Жалоба на материал</h1>
        <p>Информация о спорном контенте авторского права.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formInput}>
          <Input classNames={styles.firstInput} textLabel="Название объекта авторского права" register={register} name="subject" err={errors?.subject?.message} />
          <Input
            textLabel="Подтверждающие документы (ссылка на первоисточник публикации/ ссылка на сайт-продавец публикации)"
            register={register}
            name="link_source"
            err={errors?.link_source?.message}
          />
          <Input textLabel="Ссылка на спорный контент" register={register} name="link_content" err={errors?.link_content?.message} />
          <Input textLabel="ФИО" register={register} name="name" err={errors?.name?.message} />
          <Input textLabel="Электронная почта" register={register} typeInput={'email'} name="email" err={errors?.email?.message} />
        </div>
        <div className={styles.checkboxContainer}>
          {checkboxData.map((i) => (
            <>
              <div key={i?.text} className={styles.checkWrap}>
                <Checkbox register={register} name={i?.name} />
                <p>{i?.text}</p>
              </div>
              <p className={styles.error}>{errors?.[i?.name]?.message}</p>
            </>
          ))}
        </div>
        <ButtonGroup text="Отправить" ClassName={styles.buttons} cancelClick={onCancel} />
      </form>

      {modal && (
        <ModalWindow onClose={() => setModal(false)}>
          <div className={styles.modal}>
            <h3>Отправлено</h3>
            <p>Наши сотрудники ответят на ваш запрос как можно скорее.</p>
            <Button classNames={styles.modalClose} text="Закрыть" typeButton="button" click={() => setModal(false)} />
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default HoldersRight;
