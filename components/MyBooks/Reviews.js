import React, {useState} from 'react';
import styles from './styles.module.scss'
import ClickableSearch from "../ClickableSearch";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import ButtonGroup from "../SettingsProfile/buttonGroup";
import Button from "../shared/common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import BackBtn from "../shared/common/BackBtn";
import SearchInput from "../SearchInput";
import {setHeaderVisibility} from "../../store/commonSlice";
import classNames from "classnames";
import dataReview from '../data/reviews.json';
import ReviewLogicItem from "../ReviewLogicItem";

const Reviews = () => {
  const dispatch = useDispatch()
  const {innerWidthWindow} = useSelector(state => state.common)

  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)

  const handleIconClick = () => {
    setDeletePopupIsVisible(true)
  }

  return <>
    {innerWidthWindow > 768 &&
      <div className={styles.filters}>
        <div className={styles.mlAuto}>
          <ClickableSearch queryName={'search'}/>
        </div>
      </div>
    }

    {innerWidthWindow <= 768 &&
      <div className={styles.mobFilters}>
        <div className={styles.flex}>
          <BackBtn
            externalClass={styles.backBtn}
            onClick={() => dispatch(setHeaderVisibility(true))}
          />
          <SearchInput
            placeholder={'Искать книгу'}
            externalClass={styles.mobSearch}
            // onChange={}
          />
        </div>

        <h2 className={classNames("title", styles.title)}>Мои рецензии</h2>
      </div>
    }

    <div className={classNames(styles.grid, styles.reviewGrid)}>
      {dataReview?.map(i =>
        <div className={styles.gridItem}>
          <ReviewLogicItem
            data={i}
            withControls
            onDelete={handleIconClick}
          />
        </div>
      )}
    </div>

    {deletePopupIsVisible &&
      <ModalWindow
        onClose={() => setDeletePopupIsVisible(false)}
      >
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Удалить рецезию</h3>
          <p className={styles.modalText}>
            Вы действительно хотите удалить рецезию?
          </p>
          <ButtonGroup
            text="Удалить"
            typeButton="button"
            ClassName={styles.modalBtns}
            click={() => setConfirmPopupIsVisible(true)}
            cancelClick={() => setDeletePopupIsVisible(false)}
          />
        </div>
      </ModalWindow>
    }

    {confirmPopupIsVisible &&
      <ModalWindow
        onClose={() => setConfirmPopupIsVisible(false)}
      >
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Рецензия удалена</h3>

          <Button
            text="Закрыть"
            typeButton="button"
            click={() => setConfirmPopupIsVisible(false)}
            classNames={styles.modalBtn}
          />
        </div>
      </ModalWindow>
    }
  </>
};

export default Reviews;