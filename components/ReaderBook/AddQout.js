import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import classNames from 'classnames';

import styles from './styles.module.scss';

import Share from '../shared/icons/share';

const colors = ['#A5D5FF', '#FFE371', '#FED3CA', '#B8DF70'];

const AddPopup = ({ style, isError, markId, currColor, addQuot, changeColor, deleteQuot, copyText, shareQuot }) => {
  const { innerWidthWindow } = useSelector((state) => state.common);

  const [colorsIsVisible, setColorsIsVisible] = useState(false);

  const textCondition = useMemo(() => {
    if (innerWidthWindow <= 768) {
      return !markId;
    } else {
      return true;
    }
  }, [innerWidthWindow, markId]);

  const colorsCondition = useMemo(() => {
    if (innerWidthWindow <= 768) {
      return !!markId;
    } else {
      return true;
    }
  }, [innerWidthWindow, markId]);

  const handleColorClick = (ev, color) => {
    if (innerWidthWindow <= 768 && !colorsIsVisible) {
      return;
    }

    ev.stopPropagation();

    if (markId) {
      changeColor(color);
    } else {
      addQuot(color);
    }

    if (innerWidthWindow <= 768) {
      setColorsIsVisible(false);
    }
  };

  const handleQuotClick = () => {
    addQuot(colors[0]);
  };

  return (
    <div
      className={classNames(styles.addQuotWrapper, {
        [styles.around]: textCondition,
        [styles.error]: isError,
      })}
      style={style}
      onMouseUp={(ev) => ev.stopPropagation()}
      onTouchEnd={(ev) => ev.stopPropagation()}
    >
      {!isError && (
        <div className={styles.addQuotFlex}>
          {textCondition && (
            <div className={styles.addQuotFlex} onClick={handleQuotClick}>
              <div className={styles.addQuotIcon}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.51394 8.74213C3.35214 8.74213 3.19054 8.76232 3.10994 8.80272C3.28974 8.08232 3.97134 7.27433 4.61254 6.92533C4.61394 6.92473 4.61494 6.92373 4.61614 6.92313C4.62094 6.92053 4.62574 6.91693 4.63034 6.91433L4.62974 6.91392C4.70074 6.87592 4.75074 6.80353 4.75074 6.71733C4.75026 6.68084 4.74079 6.64504 4.72317 6.61308C4.70556 6.58113 4.68033 6.55401 4.64974 6.53413L4.65474 6.52932L3.81554 5.99933L3.81294 6.00153C3.77498 5.97107 3.728 5.95405 3.67934 5.95312C3.64254 5.95312 3.60934 5.96392 3.57854 5.97952L3.57434 5.97573C2.32234 6.86413 1.49414 8.21692 1.49414 9.73172C1.49414 11.0441 2.34234 11.7911 3.29114 11.7911C4.15954 11.7911 4.88674 11.0643 4.88674 10.1957C4.88694 9.32772 4.28134 8.74213 3.51394 8.74213Z"
                    fill="#FF781D"
                  />
                  <path
                    d="M7.62332 8.74213C7.46152 8.74213 7.29992 8.76232 7.21932 8.80272C7.39912 8.08232 8.08072 7.27433 8.72192 6.92533C8.72332 6.92473 8.72432 6.92373 8.72552 6.92313C8.73032 6.92053 8.73512 6.91693 8.73972 6.91433L8.73912 6.91392C8.81012 6.87592 8.86012 6.80353 8.86012 6.71733C8.85963 6.68084 8.85016 6.64504 8.83255 6.61308C8.81493 6.58113 8.78971 6.55401 8.75912 6.53413L8.76412 6.52932L7.92492 5.99933L7.92232 6.00153C7.88435 5.97107 7.83737 5.95405 7.78872 5.95312C7.75192 5.95312 7.71872 5.96392 7.68792 5.97952L7.68372 5.97573C6.43172 6.86413 5.60352 8.21692 5.60352 9.73172C5.60352 11.0441 6.45172 11.7911 7.40052 11.7911C8.26892 11.7911 8.99612 11.0643 8.99612 10.1957C8.99632 9.32772 8.39072 8.74213 7.62332 8.74213Z"
                    fill="#FF781D"
                  />
                  <path
                    d="M12.5995 8.20898C11.7311 8.20898 11.0039 8.93578 11.0039 9.80438C11.0039 10.6726 11.6095 11.2582 12.3769 11.2582C12.5387 11.2582 12.7003 11.238 12.7809 11.1976C12.6011 11.918 11.9195 12.726 11.2783 13.075C11.2769 13.0756 11.2759 13.0766 11.2747 13.0772C11.2699 13.0798 11.2651 13.0834 11.2605 13.086L11.2611 13.0864C11.1901 13.1244 11.1401 13.1968 11.1401 13.283C11.1401 13.3606 11.1817 13.4256 11.2411 13.4662L11.2361 13.471L12.0753 14.001L12.0779 13.9988C12.1157 14.0274 12.1605 14.0472 12.2115 14.0472C12.2483 14.0472 12.2815 14.0364 12.3123 14.0208L12.3165 14.0246C13.5685 13.136 14.3967 11.7834 14.3967 10.2686C14.3965 8.95598 13.5483 8.20898 12.5995 8.20898Z"
                    fill="#FF781D"
                  />
                  <path
                    d="M16.7069 8.20898C15.8385 8.20898 15.1113 8.93578 15.1113 9.80438C15.1113 10.6726 15.7169 11.2582 16.4843 11.2582C16.6461 11.2582 16.8077 11.238 16.8883 11.1976C16.7085 11.918 16.0269 12.726 15.3857 13.075C15.3843 13.0756 15.3833 13.0766 15.3821 13.0772C15.3773 13.0798 15.3725 13.0834 15.3679 13.086L15.3685 13.0864C15.2975 13.1244 15.2475 13.1968 15.2475 13.283C15.2475 13.3606 15.2891 13.4256 15.3485 13.4662L15.3435 13.471L16.1827 14.001L16.1853 13.9988C16.2231 14.0274 16.2679 14.0472 16.3189 14.0472C16.3557 14.0472 16.3889 14.0364 16.4197 14.0208L16.4239 14.0246C17.6759 13.136 18.5041 11.7834 18.5041 10.2686C18.5039 8.95598 17.6557 8.20898 16.7069 8.20898Z"
                    fill="#FF781D"
                  />
                </svg>
              </div>
              Цитата
            </div>
          )}
          {colorsCondition && (
            <div
              className={classNames(styles.addQuotFlex, {
                [styles.addQuotColorsWrapper]: colorsCondition,
                [styles.showColors]: colorsIsVisible,
              })}
              onClick={() => setColorsIsVisible(true)}
            >
              {colors?.map((i, index) => (
                <div
                  key={i}
                  className={classNames(styles.addQuotColor, { [styles.active]: currColor === i })}
                  style={{
                    background: i,
                    transform: innerWidthWindow <= 768 ? `translate(${index * 3}px, -50%)` : null,
                    zIndex: colors?.length - index,
                    transitionDelay: `${index}00ms`,
                  }}
                  onClick={(ev) => handleColorClick(ev, i)}
                >
                  <span />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.addQuotFlex} onClick={copyText}>
        <div className={styles.addQuotIcon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.6667 7.5H9.16667C8.24619 7.5 7.5 8.24619 7.5 9.16667V16.6667C7.5 17.5871 8.24619 18.3333 9.16667 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V9.16667C18.3333 8.24619 17.5871 7.5 16.6667 7.5Z"
              stroke="#FF781D"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.16602 12.4993H3.33268C2.89065 12.4993 2.46673 12.3238 2.15417 12.0112C1.84161 11.6986 1.66602 11.2747 1.66602 10.8327V3.33268C1.66602 2.89065 1.84161 2.46673 2.15417 2.15417C2.46673 1.84161 2.89065 1.66602 3.33268 1.66602H10.8327C11.2747 1.66602 11.6986 1.84161 12.0112 2.15417C12.3238 2.46673 12.4993 2.89065 12.4993 3.33268V4.16602"
              stroke="#FF781D"
              strokeWidth="1.66667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        Скопировать
      </div>

      <div className={styles.addQuotFlex} onClick={shareQuot}>
        <div className={styles.addQuotIcon}>
          <Share />
        </div>
        Поделиться
      </div>

      {markId && !isError && (
        <div className={styles.addQuotFlex} onClick={deleteQuot}>
          <div className={styles.addQuotIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5H4.16669H17.5002" stroke="#FF781D" strokeWidth="1.66669" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M6.66605 4.99939V3.3327C6.66605 2.89067 6.84164 2.46674 7.15421 2.15418C7.46677 1.84161 7.8907 1.66602 8.33273 1.66602H11.6661C12.1081 1.66602 12.5321 1.84161 12.8446 2.15418C13.1572 2.46674 13.3328 2.89067 13.3328 3.3327V4.99939M15.8328 4.99939V16.6662C15.8328 17.1082 15.6572 17.5322 15.3447 17.8447C15.0321 18.1573 14.6082 18.3329 14.1661 18.3329H5.8327C5.39067 18.3329 4.96674 18.1573 4.65418 17.8447C4.34161 17.5322 4.16602 17.1082 4.16602 16.6662V4.99939H15.8328Z"
                stroke="#FF781D"
                strokeWidth="1.66669"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M8.33398 9.16602V14.1661" stroke="#FF781D" strokeWidth="1.66669" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11.668 9.16602V14.1661" stroke="#FF781D" strokeWidth="1.66669" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          Удалить
        </div>
      )}
    </div>
  );
};

export default AddPopup;
