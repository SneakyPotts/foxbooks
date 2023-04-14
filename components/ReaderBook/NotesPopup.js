import React, { useRef, useState } from 'react';

import { calcCoordinates } from '../../utils';

import styles from './styles.module.scss';

import useOnClickOutside from '../../hooks/useOnClickOutside';

const NotesPopup = ({ title, children }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 });
  const notesPopupRef = useRef();

  const handleClick = (ev) => {
    ev.stopPropagation();
    setToolsCoords(() => calcCoordinates(ev));
    setOpenPopup((prevState) => !prevState);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };
  // const tag = JSON.stringify(children)
  // const text = tag.slice(tag.indexOf('['), tag.indexOf('[') + 3)

  useOnClickOutside(notesPopupRef, handleClose);

  return (
    <span
      style={{
        color: '#ff781d',
      }}
      onClick={handleClick}
      onTouch={handleClick}
      ref={notesPopupRef}
    >
      {children}
      {openPopup && (
        <span
          style={{
            top: toolsCoords.y + 'px',
            left: toolsCoords.x + 'px',
          }}
          className={styles.addQuotWrapper}
        >
          {title}
        </span>
      )}
    </span>
  );
};

export default NotesPopup;
