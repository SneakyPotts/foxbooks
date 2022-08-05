import React, {useEffect, useState} from 'react';
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
import Loader from "../shared/common/Loader";
import {getUserCompilations} from "../../store/selectionSlice";
import {setQueryString} from "../../utils";

const filter1 = [
  {
    title: 'Все',
    defaultValue: 3,
    options: [
      {id: 1, title: 'Все', value: 3},
      {id: 2, title: 'Мои', value: 1},
      {id: 3, title: 'Fox подборки', value: 2}
    ],
    queryName: 'compType',
  },
];

const filter2 = [
  {
    title: 'Популярные',
    defaultValue: 3,
    options: [
      {id: 1, title: 'Популярные', value: 3},
      {id: 2, title: 'По дате добавления', value: 1},
      {id: 3, title: 'По алфавиту', value: 2}
    ],
    queryName: 'sortBy',
  },
];

const Selections = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const isMy = router.query.compType == 1

  const {innerWidthWindow} = useSelector(state => state.common)
  const {profile} = useSelector(state => state.profile)
  const {data} = useSelector(state => state.selection.userCompilations)

  const [stateIndex, setStateIndex] = useState(null)
  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  const onChange = value => {
    setQueryString(value, 'letter', router)
  }

  useEffect(() => {
    dispatch(getUserCompilations(router.query))
      .then(() => setIsLoading(false))
  }, [router.query])

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
            <ClickableSearch queryName={'letter'}/>
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
            onChange={onChange}
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

    {isLoading ?
      <div className={classNames("empty", styles.empty)}>
        <Loader/>
      </div> :
      data?.length ?
        <div className={classNames(styles.grid, styles.compilationsGrid)}>
          {data.map(i =>
            <div
              key={i?.id}
              className={styles.gridItem}
            >
              <CompilationItem
                data={i}
                path={i?.created_by == profile?.id ? `/mybooks/selection/${i?.id}` : `/selections/${i?.id}`}
              />
            </div>
          )}
        </div> :
        <p className={classNames("empty", styles.empty)}>Пусто</p>
    }

    {createPopupIsVisible &&
      <CreateCompilationPopup
        onClose={() => setCreatePopupIsVisible(false)}
      />
    }
  </>
};

export default Selections;