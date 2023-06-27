import React from 'react';

import classNames from 'classnames';

import styles from './index.module.scss';

const InputRange = ({
  value,
  setValue,
  min = '0',
  max = '100',
  step = '1',
  barColor = '#D4D4D4',
  dotsColor = '#D4D4D4',
  hasDots = false,
  dotsCount = 5,
  externalClass,
  externalWrapperClass,
}) => {
  const getDots = () => {
    const arr = [];
    for (let i = 0; i < dotsCount; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div className={classNames(styles.inputWrapper, externalWrapperClass)}>
      <span
        className={styles.inputBar}
        style={{ background: barColor }}
      >
        <span
          className={styles.inputFill}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </span>

      {hasDots && dotsCount && (
        <div className={styles.dotsWrapper}>
          {getDots().map((i) => (
            <span
              key={i}
              className={classNames(styles.inputDot, { [styles.active]: value >= i })}
              style={{ background: dotsColor }}
            />
          ))}
        </div>
      )}

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classNames(styles.input, externalClass)}
      />
    </div>
  );
};

export default InputRange;
