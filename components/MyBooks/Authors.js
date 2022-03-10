import React from 'react';
import styles from './styles.module.scss'
import ClickableSearch from "../ClickableSearch";
import {useDispatch, useSelector} from "react-redux";
import BackBtn from "../shared/common/BackBtn";
import SearchInput from "../SearchInput";
import {setHeaderVisibility} from "../../store/commonSlice";
import classNames from "classnames";
import AuthorCard from "../AuthorCard";

const authors = [
  { id: '0', name: 'Джоан Кэтлин Роулинг', books: '11' },
  { id: '1', name: 'Джоан Кэтлин Роулинг', books: '11' },
];

const Authors = () => {
  const dispatch = useDispatch()
  const {innerWidthWindow} = useSelector(state => state.common)

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

        <h2 className={classNames("title", styles.title)}>Мои авторы</h2>
      </div>
    }

    <div className={styles.grid}>
      {authors?.map(i =>
        <div className={styles.gridItem}>
          <AuthorCard
            key={i?.id}
            data={i}
          />
        </div>
      )}
    </div>
  </>
};

export default Authors;