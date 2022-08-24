import React, {useState} from 'react';
import styles from './styles.module.scss'
import {calcCoordinates} from "../../utils";

const NotesPopup = ({title, children}) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [toolsCoords, setToolsCoords] = useState({ x: 0, y: 0 })

  const handleClick = ev => {
    ev.stopPropagation();
    setToolsCoords(() => calcCoordinates(ev))
    setOpenPopup(prevState => !prevState);
  }
  // const tag = JSON.stringify(children)
  // const text = tag.slice(tag.indexOf('['), tag.indexOf('[') + 3)

  return (
    <span
      style={{
        color: '#ff781d',
      }}
      onClick={handleClick}
      onTouch={handleClick}
    >
      {children}
      {openPopup &&
        <span
          style={{
            top: toolsCoords.y + 'px',
            left: toolsCoords.x + 'px'
          }}
          className={styles.addQuotWrapper}
        >
          {title}
        </span>
      }
    </span>
  );
};

export default NotesPopup;