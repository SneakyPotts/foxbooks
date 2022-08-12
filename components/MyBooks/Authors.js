import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss'
import ClickableSearch from "../ClickableSearch";
import {useDispatch, useSelector} from "react-redux";
import BackBtn from "../shared/common/BackBtn";
import SearchInput from "../SearchInput";
import {setHeaderVisibility} from "../../store/commonSlice";
import classNames from "classnames";
import AuthorCard from "../AuthorCard";
import {useRouter} from "next/router";
import AuthorService from "../../http/AuthorService";
import Loader from "../shared/common/Loader";
import {setQueryString} from "../../utils";
import ShowAll from "../shared/common/showAll/ShowAll";
import s from "../SearchPage/styles.module.scss";

const Authors = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {innerWidthWindow} = useSelector(state => state.common)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const onChange = value => {
    setQueryString(value, 'letter', router)
  }

  useEffect(() => {
    (async () => {
      const response = await AuthorService.getUserAuthors(router.query)
      setLastPage(response.data.data.last_page)
      setData(response.data.data.data)
      setIsLoading(false)
    })()
  }, [router.query])

  useEffect(() => {
    if (page > 1) {
      setIsLoading(true);
      (async () => {
        const response = await AuthorService.getUserAuthors({...router.query, page})
        setData(prev => [...prev, ...response.data.data.data]);
        setIsLoading(false)
      })()
    }
  }, [page])

  return <>
    {innerWidthWindow > 768 &&
      <div className={styles.filters}>
        <div className={styles.mlAuto}>
          <ClickableSearch queryName={'letter'}/>
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
            placeholder={'Искать автора'}
            externalClass={styles.mobSearch}
            onChange={onChange}
          />
        </div>

        <h2 className={classNames("title", styles.title)}>Мои авторы</h2>
      </div>
    }

    {data?.length
      ? <div className={styles.grid}>
          {data.map(i =>
            <div
              key={i?.id}
              className={styles.gridItem}
            >
              <AuthorCard
                data={i}
              />
            </div>
          )}
        </div>
      : <p className={classNames("empty", styles.empty)}>Пусто</p>
    }

    {isLoading
      ? <p className={classNames("empty", styles.empty)}>
          <Loader/>
        </p>
      : null
    }

    {lastPage > 1 && page !== lastPage
      ? <ShowAll
        text={'Показать ещё'}
        externalClass={s.onlyDesctop}
        arrowSecondary
        showMore={true}
        setPage={setPage}
      />
      : null
    }
  </>
};

export default Authors;