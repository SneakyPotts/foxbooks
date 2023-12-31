import { useRouter } from 'next/router';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';

import Button from '../shared/common/Button/Button';
import ModalWindow from '../shared/common/modalWindow/ModalWindow';
import Filters from '../shared/icons/filters';

const MobileFilterModal = ({ children }) => {
  const router = useRouter();
  const initPath = useRef();

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const { innerWidthWindow } = useSelector((state) => state.common);

  const handleClear = () => {
    router.push(initPath.current);
    setModalIsVisible(false);
  };

  useEffect(() => {
    initPath.current = router.asPath;
  }, []);

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

      {innerWidthWindow <= 1024 && modalIsVisible && (
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
      )}
    </>
  );
};

export default MobileFilterModal;
