import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cookiesSettings } from '../../utils';
import ArrowIcon from './../../public/chevron-right.svg';
import classNames from 'classnames';

import styles from './styles.module.scss';
import './variables.module.scss';

import { setSettings } from '../../store/readerSlice';

import ReaderService from '../../http/ReaderService';

import InputRange from '../shared/common/InputRange/InputRange';
import Switch from '../shared/common/Switch';

const fontNames = ['Times New Roman', 'Georgia', 'Arial', 'Fira Sans', 'Verdana'];

const EditPopup = () => {
  const dispatch = useDispatch();

  const { settings } = useSelector((state) => state?.reader);
  const { isAuth } = useSelector((state) => state.auth);
  const [dropdownIsVisible, setDropdownIsVisible] = useState(false);

  const changeSettings = (value, name) => {
    const data = {
      ...settings,
      [name]: Number(value) || value,
    };
    dispatch(setSettings(data));
    isAuth ? ReaderService.updateSettings(data) : cookiesSettings(data, 'set');
  };

  const toggleDropdown = (ev) => {
    ev.stopPropagation();
    setDropdownIsVisible(!dropdownIsVisible);
  };

  const changeFont = (value) => {
    changeSettings(value, 'fontName');
    setDropdownIsVisible(false);
  };

  return (
    <div
      className={styles.editPopupWrapper}
      onClick={() => setDropdownIsVisible(false)}
    >
      <div className={classNames(styles.editWrapper, styles.flex)}>
        <span className={styles.editTitle}>Текст в 2 колонки</span>
        <Switch
          value={settings?.isTwoColumns}
          setValue={(value) => changeSettings(value, 'isTwoColumns')}
          externalClass={styles.editSwitch}
        />
      </div>

      <div className={styles.editWrapper}>
        <span className={styles.editTitle}>Размер шрифта</span>
        <InputRange
          value={settings?.fontSize}
          setValue={(value) => changeSettings(value, 'fontSize')}
          max={'12'}
          barColor={'var(--controls-color)'}
          externalWrapperClass={styles.inputWrapper}
        />
      </div>

      <div className={styles.editWrapper}>
        <span className={styles.editTitle}>Яркость</span>
        <InputRange
          value={settings?.screenBrightness}
          setValue={(value) => changeSettings(value, 'screenBrightness')}
          min={'0'}
          max={'5'}
          barColor={'var(--controls-color)'}
          externalWrapperClass={styles.inputWrapper}
        />
      </div>

      <div className={classNames(styles.editWrapper, styles.flex)}>
        <span className={styles.editTitle}>Шрифт</span>
        <div
          className={classNames(styles.editDropdownWrapper, { [styles.active]: dropdownIsVisible })}
          onClick={(ev) => toggleDropdown(ev)}
        >
          {settings?.fontName?.split(' ')[0]}
          <span className={styles.editIcon}>
            <ArrowIcon />
          </span>

          <div
            className={classNames(styles.editDropdown, { [styles.active]: dropdownIsVisible })}
            onClick={(ev) => ev.stopPropagation()}
          >
            {fontNames?.map((i) => (
              <span
                key={i}
                onClick={() => changeFont(i)}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={classNames(styles.editWrapper, styles.flex)}>
        <span className={styles.editTitle}>Ширина текста</span>
        <InputRange
          value={settings?.fieldSize}
          setValue={(value) => changeSettings(value, 'fieldSize')}
          hasDots={true}
          min={'0'}
          max={'4'}
          barColor={'var(--controls-color)'}
          dotsColor={'var(--controls-color)'}
          externalWrapperClass={styles.inputWrapper}
        />
        <div className={styles.flex}>
          <span className={styles.editSubtitle}>узкая</span>
          <span className={styles.editSubtitle}>широкая</span>
        </div>
      </div>

      <div className={classNames(styles.editWrapper, styles.flex)}>
        <span className={styles.editTitle}>Высота строк</span>
        <InputRange
          value={settings?.rowHeight}
          setValue={(value) => changeSettings(value, 'rowHeight')}
          hasDots={true}
          min={'0'}
          max={'4'}
          barColor={'var(--controls-color)'}
          dotsColor={'var(--controls-color)'}
          externalWrapperClass={styles.inputWrapper}
        />
        <div className={styles.flex}>
          <span className={styles.editSubtitle}>маленькая</span>
          <span className={styles.editSubtitle}>большая</span>
        </div>
      </div>

      <div className={classNames(styles.editWrapper, styles.flex)}>
        <span className={styles.editTitle}>
          Выравнивание по <br /> ширине
        </span>
        <Switch
          value={settings?.isCenterAlignment}
          setValue={(value) => changeSettings(value, 'isCenterAlignment')}
          externalClass={styles.editSwitch}
        />
      </div>
    </div>
  );
};

export default EditPopup;
