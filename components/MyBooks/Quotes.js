import React, {useState} from 'react';
import styles from './styles.module.scss'
import Popular from "../Filter/Popular/Popular";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import ButtonGroup from "../SettingsProfile/buttonGroup";
import Button from "../shared/common/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import BackBtn from "../shared/common/BackBtn";
import SearchInput from "../SearchInput";
import {setHeaderVisibility} from "../../store/commonSlice";
import classNames from "classnames";

const filter = [
  {
    title: 'Все',
    defaultValue: 3,
    options: [
      {id: 1, title: 'Все', value: 3},
      {id: 2, title: 'По книгам', value: 2},
      {id: 3, title: 'По авторам', value: 2}
    ],
    queryName: 'sortBy',
  },
];

const Quotes = () => {
  const dispatch = useDispatch()
  const {innerWidthWindow} = useSelector(state => state.common)

  const [stateIndex, setStateIndex] = useState(null)
  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)

  const handleIconClick = id => {
    setDeletePopupIsVisible(true)
  }

  return <>
    {innerWidthWindow > 768 &&
      <div className={styles.filters}>
        <div className={styles.mlAuto}>
          {filter?.map((i, index) => (
            <Popular
              key={index + 2}
              title={i?.title}
              defaultValue={i?.defaultValue}
              data={i?.options}
              queryName={i?.queryName}
              filterStateIdx={stateIndex}
              elIdx={1}
              setFilStateIdx={setStateIndex}
              isRight
            />
          ))}
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

        <h2 className={classNames("title", styles.title)}>Мои цитаты</h2>

        {filter?.map((i, index) => (
          <Popular
            key={index + 2}
            title={i?.title}
            defaultValue={i?.defaultValue}
            data={i?.options}
            queryName={i?.queryName}
            filterStateIdx={stateIndex}
            elIdx={1}
            setFilStateIdx={setStateIndex}
          />
        ))}
      </div>
    }

    <div className={styles.grid}>
      <div className={styles.gridItem}>
        authors
      </div>
    </div>

    {deletePopupIsVisible &&
      <ModalWindow
        onClose={() => setDeletePopupIsVisible(false)}
      >
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Удалить книгу</h3>
          <p className={styles.modalText}>
            Вы действительно хотите удалить книгу “Колдовской мир. Тройка
            мечей”?
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
          <h3 className={styles.modalTitle}>Книга удалена</h3>

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

export default Quotes;