import React, {useState} from 'react';
import styles from './styles.module.scss'
import Popular from "../Filter/Popular/Popular";
import ClickableSearch from "../ClickableSearch";
import {useDispatch, useSelector} from "react-redux";
import BackBtn from "../shared/common/BackBtn";
import SearchInput from "../SearchInput";
import {setHeaderVisibility} from "../../store/commonSlice";
import classNames from "classnames";
import MobileFilterModal from "../MobileFilterModal";
import CompilationItem from "../CompilationItem";
import {useRouter} from "next/router";
import Button from "../shared/common/Button/Button";
import CreateCompilationPopup from "../CreateCompilationPopup";

const filter1 = [
  {
    title: 'Все',
    defaultValue: 1,
    options: [
      {id: 1, title: 'Все', value: 1},
      {id: 2, title: 'Мои', value: 2},
      {id: 3, title: 'Fox подборки', value: 3}
    ],
    queryName: 'which',
  },
];

const filter2 = [
  {
    title: 'Популярные',
    defaultValue: 3,
    options: [
      {id: 1, title: 'Популярные', value: 3},
      {id: 2, title: 'По дате добавления', value: 2},
      {id: 3, title: 'По алфавиту', value: 4}
    ],
    queryName: 'sortBy',
  },
];

const Selections = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const isMy = router.query.which == 2

  const {innerWidthWindow} = useSelector(state => state.common)

  const [stateIndex, setStateIndex] = useState(null)
  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false);

  return <>
    {innerWidthWindow > 768 &&
      <div className={styles.filters}>
        <div>
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
        {isMy ?
          <Button
            text={'Создать новую подборку'}
            click={() => setCreatePopupIsVisible(true)}
          /> :
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
        }
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

        <h2 className={classNames("title", styles.title)}>Мои подборки</h2>

        <MobileFilterModal>
          <span className={styles.mobFiltersTitle}>Тип</span>
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
          <span className={styles.line}/>
          <span className={styles.mobFiltersTitle}>Сортировать</span>
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
            />
          ))}
        </MobileFilterModal>

        {isMy &&
          <Button
            text={'Создать новую подборку'}
            classNames={styles.createBtn}
            click={() => setCreatePopupIsVisible(true)}
          />
        }
      </div>
    }

    <div className={classNames(styles.grid, styles.compilationsGrid)}>
      <div className={styles.gridItem}>
        <CompilationItem />
      </div>
      <div className={styles.gridItem}>
        <CompilationItem />
      </div>
      <div className={styles.gridItem}>
        <CompilationItem />
      </div>
      <div className={styles.gridItem}>
        <CompilationItem />
      </div>
    </div>

    {createPopupIsVisible &&
      <CreateCompilationPopup
        onClose={() => setCreatePopupIsVisible(false)}
      />
    }
  </>
};

export default Selections;