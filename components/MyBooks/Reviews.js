import React, {useEffect, useState} from 'react';
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
import ReviewLogicItem from "../ReviewLogicItem";
import {getUserReview} from "../../store/reviewSlice";
import Loader from "../shared/common/Loader";
import {useRouter} from "next/router";
import {setQueryString} from "../../utils";

const Reviews = () => {
  const dispatch = useDispatch()
  const router = useRouter();

  const {innerWidthWindow} = useSelector(state => state.common)
  const {userReviews} = useSelector(state => state.review)

  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true);

  const handleIconClick = () => {
    setDeletePopupIsVisible(true)
  }
  const onChange = value => {
    setQueryString(value, 'findByTitle', router)
    // router.push(
    //   { query: { ...router.query, ['findByTitle']: encodeURI(value) } },
    //   null,
    //   { scroll: false }
    // );
  }
  useEffect(() => {
    dispatch(getUserReview(router.query))
      .then(() => setIsLoading(false))
  }, [router.query]);

  return <>
    {innerWidthWindow > 768 &&
      <div className={styles.filters}>
        <div className={styles.mlAuto}>
          <ClickableSearch queryName={'findByTitle'}/>
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
            onChange={onChange}
          />
        </div>

        <h2 className={classNames("title", styles.title)}>Мои рецензии</h2>
      </div>
    }

    {isLoading
      ? <div className={classNames("empty", styles.empty)}>
          <Loader/>
        </div>
      : <div className={classNames(styles.grid, styles.reviewGrid)}>
        {userReviews?.map(i =>
          <div
            key={i.id}
            className={styles.gridItem}
          >
            <ReviewLogicItem
              data={i}
              withControls
              onDelete={handleIconClick}
            />
          </div>
        )}
      </div>
    }

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