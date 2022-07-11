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
import {resetQueryString} from "../../utils";

const Authors = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const {innerWidthWindow} = useSelector(state => state.common)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  const onChange = value => {
    router.push(
      { query: { ...router.query, ['letter']: encodeURI(value) } },
      null,
      { scroll: false }
    );
  }

  useEffect(() => {
    (async () => {
      const response = await AuthorService.getUserAuthors(router.query)
      setData(response.data.data.data)
      setIsLoading(false)
    })()

    resetQueryString(router);
  }, [router.query])

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

    {isLoading ?
      <p className={classNames("empty", styles.empty)}>
        <Loader/>
      </p> :
      data?.length ?
        <div className={styles.grid}>
          {data.map(i =>
            <div className={styles.gridItem}>
              <AuthorCard
                key={i?.id}
                data={i}
              />
            </div>
          )}
        </div> :
        <p className={classNames("empty", styles.empty)}>Пусто</p>
    }
  </>
};

export default Authors;