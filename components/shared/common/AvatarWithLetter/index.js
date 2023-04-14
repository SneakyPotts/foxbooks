import React, { useCallback, useEffect, useState } from 'react';

import styles from './styles.module.scss';

const colors = [
  '#512DA7',
  '#5C6BC0',
  '#7E57C2',
  '#AA47BC',
  '#C2175B',
  '#EC407A',
  '#00579C',
  '#0288D0',
  '#58B3E3',
  '#465A65',
  '#78909C',
  '#004C3F',
  '#33691E',
  '#689F39',
  '#00887A',
  '#BF360C',
  '#D55600',
  '#FF781D',
  '#5D4038',
  '#8C6E62',
  '#945D47',
];

const AvatarWithLetter = ({ letter, width, id, isProfile }) => {
  const [color, setColor] = useState('');
  const getIndex = useCallback(() => {
    let num = id;
    while (num > +colors?.length) {
      num -= +colors?.length;
    }
    return num;
  }, [id]);

  useEffect(() => {
    if (isProfile) {
      const storageColor = localStorage.getItem('avatarColor');
      if (storageColor && storageColor !== 'undefined') {
        setColor(storageColor);
      } else if (id) {
        setColor(colors[getIndex()]);
        localStorage.setItem('avatarColor', colors[getIndex()]);
      }
    } else if (id) {
      setColor(colors[getIndex()]);
    }
  }, [id]);

  return (
    <span className={styles.wrapper} style={{ background: color, width, height: width, fontSize: `${width * 0.64}px` }}>
      {letter}
    </span>
  );
};

export default AvatarWithLetter;
