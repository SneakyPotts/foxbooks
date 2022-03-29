import React, {useLayoutEffect, useState} from 'react';
import styles from './styles.module.scss'
import Image from "next/image";
import Button from "../shared/common/Button/Button";
import DotsDropdown from "../DotsDropdown";
import EditPensil from "../shared/icons/editPencil";
import Bin from "../shared/icons/trash";
import classNames from "classnames";
import PageIcon from "../shared/icons/page";
import BookMark from "../shared/icons/myBookmark";
import OpenBook from "../shared/icons/bookOpen";
import Flag from "../shared/icons/flag";
import Popular from "../Filter/Popular/Popular";
import ClickableSearch from "../ClickableSearch";
import {useDispatch, useSelector} from "react-redux";
import Book from "../shared/common/book";
import ModalWindow from "../shared/common/modalWindow/ModalWindow";
import ButtonGroup from "../SettingsProfile/buttonGroup";
import {setHeaderVisibility} from "../../store/commonSlice";
import BackBtn from "../shared/common/BackBtn";
import {useRouter} from "next/router";
import CreateCompilationPopup from "../CreateCompilationPopup";
import ChooseBookPopup from "./ChooseBookPopup";

const filter1 = [
  {
    title: 'Все',
    defaultValue: 1,
    options: [
      { id: 1, title: 'Все', value: 1, icon: <PageIcon /> },
      { id: 2, title: 'Хочу прочитать', value: 2, icon: <BookMark /> },
      { id: 3, title: 'Читаю', value: 3, icon: <OpenBook stroke={'#FF781D'} /> },
      { id: 3, title: 'Прочитано', value: 4, icon: <Flag /> }
    ],
    queryName: 'sortBy',
  },
];

const filter2 = [
  {
    title: 'Популярные',
    defaultValue: 3,
    options: [
      { id: 1, title: 'Популярные', value: 3 },
      { id: 2, title: 'По дате добавления', value: 2 },
      { id: 3, title: 'По алфавиту', value: 2 }
    ],
    queryName: 'sortBy',
  },
];

const MySelection = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [stateIndex, setStateIndex] = useState(null)
  const { innerWidthWindow } = useSelector(state => state.common)

  const [choosePopupIsVisible, setChoosePopupIsVisible] = useState(false)
  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false)
  const [deletePopupIsVisible, setDeletePopupIsVisible] = useState(false)
  const [confirmPopupIsVisible, setConfirmPopupIsVisible] = useState(false)

  const onDelete = id => {
    setDeletePopupIsVisible(true)
  }

  useLayoutEffect(() => {
    if(innerWidthWindow <= 768) {
      dispatch(setHeaderVisibility(false))
    }
  }, [])

  return (
    <>
      <div className={styles.compilationWrapper}>
        <Image
          src={'/selectionCover.png'}
          layout={'fill'}
          placeholder="blur"
          blurDataURL="/blur.webp"
          className={styles.compilationImg}
        />

        <BackBtn
          onClick={() => router.push('/mybooks/selections')}
          externalClass={styles.compilationBack}
        />
        <h2 className={styles.compilationTitle}>Дизайн</h2>
        <div className={styles.compilationControls}>
          <Button
            text={'Добавить книгу'}
            classNames={styles.compilationBtn}
            click={() => setChoosePopupIsVisible(true)}
          />
          <DotsDropdown
            externalClass={styles.compilationDropdown}
          >
            <div
              className={styles.controlsItem}
              onClick={() => setCreatePopupIsVisible(true)}
            >
              <EditPensil />
              Редактировать
            </div>

            <div
              className={styles.controlsItem}
              onClick={() => onDelete()}
            >
              <Bin />
              Удалить
            </div>
          </DotsDropdown>
        </div>
      </div>
      <div className={classNames("container", styles.compilationContainer)}>
        <span
          className={classNames(styles.compilationBookCount, {
            [styles.empty]: 1
          })}
        >
          <span>0</span>
          Книги
        </span>

        {innerWidthWindow > 768 &&
          <div className={styles.filters}>
            <div>
              <span className={styles.filtersText}>Статус</span>
              {filter1?.map((i, index) => (
                <Popular
                  key={index + 1}
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
            <div>
              <ClickableSearch queryName={'search'}/>
              {filter2?.map((i, index) => (
                <Popular
                  key={index + 2}
                  title={i?.title}
                  defaultValue={i?.defaultValue}
                  data={i?.options}
                  queryName={i?.queryName}
                  filterStateIdx={stateIndex}
                  elIdx={2}
                  setFilStateIdx={setStateIndex}
                  isRight
                />
              ))}
            </div>
          </div>
        }

        <div className={styles.grid}>
          <div className={styles.gridItem}>
            <Book
              withDelete
              onDelete={onDelete}
            />
          </div>
        </div>

        <Button
          text={'Добавить книгу'}
          classNames={styles.compilationBtnMob}
          click={() => setChoosePopupIsVisible(true)}
        />
      </div>

      {choosePopupIsVisible &&
        <ChooseBookPopup
          onClose={() => setChoosePopupIsVisible(false)}
        />
      }

      {createPopupIsVisible &&
        <CreateCompilationPopup
          image={'/selectionCover.png'}
          title={'Дизайн'}
          description={'text'}
          onClose={() => setCreatePopupIsVisible(false)}
          isEdit
        />
      }

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
  )
}

export default MySelection;
