import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import classNames from "classnames";
import ArrowAll from "../../public/chevron-down.svg";
import ButtonGroup from "../SettingsProfile/buttonGroup";
import Input from "../shared/common/Input/Input";
import { useForm } from "react-hook-form";

const options = [
  { id: 1, title: 'Популярные', value: 3 },
  { id: 2, title: 'По дате добавления', value: 2 },
  { id: 3, title: 'По алфавиту', value: 2 }
];

const ReviewForm = ({
  onCancel
}) => {
  const [optionsIsVisible, setOptionsIsVisible] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  const openDropdown = ev => {
    ev.stopPropagation()
    setOptionsIsVisible(true)
  }

  const closeDropdown = () => {
    setOptionsIsVisible(false)
  }

  const chooseOption = id => {
    setCurrentOption(id)
    closeDropdown()
  }

  useEffect(() => {
    document.body.addEventListener('click', closeDropdown)

    return () => {
      document.body.removeEventListener('click', closeDropdown)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p
        className={styles.label}
        onClick={openDropdown}
      >
        Выберите тип вашей рецензии
      </p>

      <div
        className={styles.dropdown}
        onClick={ev => ev.stopPropagation()}
      >
        <div
          className={classNames(styles.dropdownBtn, {
            [styles.active]: optionsIsVisible
          })}
          onClick={() => setOptionsIsVisible(prev => !prev)}
        >
          <span className={styles.dropBtnText}>
            {options.find(i => i?.id === currentOption)?.title || 'Тип рецензии'}
          </span>
          <span
            className={classNames(styles.arrow, {
              [styles.active]: optionsIsVisible
            })}
          >
            <ArrowAll />
          </span>
        </div>

        {optionsIsVisible && (
          <ul className={styles.dropdownList}>
            {options?.map(i => (
              <li
                key={i?.id}
                onClick={() => chooseOption(i?.id)}
                className={classNames(styles.dropdownItem, {
                  [styles.active]: i?.id === currentOption
                })}
              >
                {i?.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Input
        register={register}
        name={'title'}
        textLabel={'Если бы ваша рецензия ограничивалась одной фразой, что бы вы сказали?'}
        isTextarea
        rows={1}
      />

      <ButtonGroup
        text={'Отправить'}
        ClassName={styles.btns}
        typeButton={'submit'}
        cancelClick={onCancel}
      />
    </form>
  );
};

export default ReviewForm;
