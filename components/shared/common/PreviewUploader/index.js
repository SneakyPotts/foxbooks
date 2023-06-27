import React, { useState } from 'react';

import { isFileImage } from '../../../../utils';
import Img from '../../icons/img';
import Compressor from 'compressorjs';

import styles from './styles.module.scss';

const PreviewUploader = ({ name, setValue, setImgSrc }) => {
  const [error, setError] = useState('');

  const handleChange = (ev) => {
    const file = ev.target.files[0];

    if (isFileImage(file.name)) {
      setError('');
      new Compressor(file, {
        quality: 0.8,
        resize: 'cover',
        width: 1920,
        height: 600,
        convertSize: 1,
        success(result) {
          let reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onloadend = function () {
            setImgSrc(reader.result);
            setValue(name, result);
          };
        },
      });
    } else {
      setError('Неверный формат файла');
    }
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input
          type="file"
          className="visually-hidden"
          onChange={handleChange}
        />
        <span className={styles.icon}>
          <Img />
        </span>
      </label>
      <span className={styles.error}>{error}</span>
    </div>
  );
};

export default PreviewUploader;
