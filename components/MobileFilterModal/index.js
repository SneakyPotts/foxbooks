import React, {useState} from 'react';
import styles from './styles.module.scss'
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import Button from "../shared/common/Button/Button";
import Filters from "../shared/icons/filters";
import {useSelector} from "react-redux";

const MobileFilterModal = ({ onClear, children }) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const { innerWidthWindow } = useSelector(state => state.common)

  const handleClear = () => {
    onClear && onClear()
    setModalIsVisible(false)
  }

  return (
    <>
      <div
        className={styles.control}
        onClick={() => setModalIsVisible(true)}
      >
        Фильтры
        <span>
          <Filters />
        </span>
      </div>

      {(innerWidthWindow <= 768 && modalIsVisible) &&
        <ModalWindow
          onClose={() => setModalIsVisible(false)}
          isFullScreen
        >
          <div className={styles.topLine}>
            <h2 className={styles.topLineTitle}>Фильтры</h2>
            <span onClick={handleClear}>Очистить фильтры</span>
          </div>

          {children}

          <div className="modalMobileWrapper">
            <Button
              text={'Посмотреть'}
              click={() => setModalIsVisible(false)}
              classNames="modalMobileBtn"
            />
          </div>
        </ModalWindow>
      }
    </>
  );
};

export default MobileFilterModal;
