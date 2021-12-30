import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Input from '../shared/common/Input/Input';
import ButtonGroup from '../SettingsProfile/buttonGroup';
import Clip from '../../public/clip.svg';
import styles from './index.module.scss';

const SupportCom = () => {
  const inputFile = useRef();
  const [file64, setFile64] = useState(null);

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
    reset,
  } = useForm();

  const HandleSubmit = data => {
    console.log(data);
  };

  const HandleClick = () => {
    inputFile.current.click();
  };

  const generateBase64img = data => {
    let promisesAll = []
    for (let i = 0; i < data.length; i++) {
      let item = data[i]

      const onloadPhoto = new Promise((resolver) => {
        const reader = new FileReader();
        reader.readAsDataURL(item);
        reader.onload = function (e) {
          resolver({image: e.target.result})
        };
      })
      promisesAll[i] = onloadPhoto
    }
    Promise.all(promisesAll).then(values => {
      setFile64(values)
    });
  };

  const onChange =  e => {
    const files = Array.from(e.target.files);
     generateBase64img(files)
  };

  const [asd, asdasdasdas] = useState(null);
  return (
    <div className={styles.container}>
      <div onClick={()=>asdasdasdas(1)}>
        ОБНОВЛЕНИЕ СОСТОЯНИЕ
      </div>
      <div className={styles.helpTitle}>
        <h1>Нужна помощь? </h1>
        <p>
          Если у вас появились вопросы или проблемы связанные с использованием
          сайта, напишите нашей службе поддержки, заполнив форму ниже. Ответ
          технических специалистов может занимать до 24-х часов.
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(HandleSubmit)}>
        <Input
          classNames={styles.inputWidth}
          register={register}
          textLabel={'Тема обращения'}
          name="message"
        />
        <Input
          classNames={styles.inputWidth}
          register={register}
          textLabel={'Ваше имя'}
          name="message"
        />
        <Input
          classNames={styles.inputWidth}
          register={register}
          textLabel={'Электронная почта'}
          name="message"
        />
        <div className={styles.inputArea}>
          <textarea className={styles.textArea}></textarea>
          <div onClick={HandleClick}>
            <div className={styles.textAreaClip}>
              <Clip />
              <p>Файл</p>
            </div>
            {file64?.map(r => {
              return (
                <>
                  <img height='100px' width='100px' src={r.image} />
                </>
              );
            })}
            <input
              multiple
              onChange={onChange}
              ref={inputFile}
              type="file"
              hidden
            />
          </div>
        </div>

        <ButtonGroup ClassName={styles.buttons} text="Отправить" />
      </form>
    </div>
  );
};

export default SupportCom;
