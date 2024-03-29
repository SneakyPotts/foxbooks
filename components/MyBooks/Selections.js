import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setQueryString } from '../../utils';
import ClickableSearch from '../ClickableSearch';
import CompilationItem from '../CompilationItem';
import CreateCompilationPopup from '../CreateCompilationPopup';
import Popular from '../Filter/Popular/Popular';
import MobileFilterModal from '../MobileFilterModal';
import SearchInput from '../SearchInput';
import classNames from 'classnames';

import styles from './styles.module.scss';

import { setHeaderVisibility } from '../../store/commonSlice';
import { setUserCompilations } from '../../store/selectionSlice';

import SelectionService from '../../http/SelectionService';

import BackBtn from '../shared/common/BackBtn';
import Button from '../shared/common/Button/Button';
import Loader from '../shared/common/Loader';
import ShowAll from '../shared/common/showAll/ShowAll';

const filter1 = [
  {
    title: 'Все',
    defaultValue: 3,
    options: [
      { id: 1, title: 'Все', value: 3 },
      { id: 2, title: 'Мои', value: 1 },
      { id: 3, title: 'Fox подборки', value: 2 },
    ],
    queryName: 'compType',
  },
];

const filter2 = [
  {
    title: 'По дате добавления',
    defaultValue: 1,
    options: [
      { id: 1, title: 'По дате добавления', value: 1 },
      { id: 2, title: 'Популярные', value: 3 },
      { id: 3, title: 'По алфавиту', value: 2 },
    ],
    queryName: 'sortBy',
  },
];

const Selections = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isMy = router.query.compType === '1';

  const { innerWidthWindow } = useSelector((state) => state.common);
  const { profile } = useSelector((state) => state.profile);
  const data = useSelector((state) => state.selection.userCompilations);

  const [stateIndex, setStateIndex] = useState(null);
  const [createPopupIsVisible, setCreatePopupIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [lastPage, setLastPage] = useState(1);
  const [page, setPage] = useState(1);

  const onChange = (value) => {
    setQueryString(value, 'letter', router);
  };

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      (async () => {
        SelectionService.getUserCompilations({ ...router.query, page }).then((response) => {
          dispatch(setUserCompilations([...data, ...response.data.data.data]));
          setLastPage(response.data.data.last_page);
          setIsLoading(false);
        });
      })();
    }
  }, [page]);

  useEffect(() => {
    (async () => {
      setPage(1);
      SelectionService.getUserCompilations(router.query).then((response) => {
        dispatch(setUserCompilations(response.data.data.data));
        setLastPage(response.data.data.last_page);
        setIsLoading(false);
      });
    })();
  }, [router.query]);

  return (
    <>
      {innerWidthWindow > 768 && (
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
          {isMy ? (
            <Button
              text={'Создать новую подборку'}
              click={() => setCreatePopupIsVisible(true)}
            />
          ) : (
            <div>
              <ClickableSearch queryName={'letter'} />
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
          )}
        </div>
      )}

      {innerWidthWindow <= 768 && (
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

          <h2 className={classNames('title', styles.title)}>Мои подборки</h2>

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
            <span className={styles.line} />
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

          {isMy && (
            <Button
              text={'Создать новую подборку'}
              classNames={styles.createBtn}
              click={() => setCreatePopupIsVisible(true)}
            />
          )}
        </div>
      )}

      {data?.length ? (
        <div className={classNames(styles.grid, styles.compilationsGrid)}>
          {data.map((i) => (
            <div
              key={i?.id}
              className={styles.gridItem}
            >
              <CompilationItem
                data={i}
                path={i?.created_by === profile?.id ? `/mybooks/selection/${i?.slug}` : `/selections/${i?.slug}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className={classNames('empty', styles.empty)}>Пусто</p>
      )}

      {isLoading ? (
        <div className={classNames('empty', styles.empty)}>
          <Loader />
        </div>
      ) : null}

      {createPopupIsVisible && <CreateCompilationPopup onClose={() => setCreatePopupIsVisible(false)} />}

      {lastPage > 1 && page !== lastPage ? (
        <ShowAll
          text={'Показать ещё'}
          externalClass={styles.onlyDesctop}
          arrowSecondary
          showMore={true}
          setPage={setPage}
        />
      ) : null}
    </>
  );
};

export default Selections;
