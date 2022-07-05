import React, {useMemo} from 'react';
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import ShowAll from "../../shared/common/showAll/ShowAll";
import st from './../header.module.scss'

const Search = ({ value , onClose }) => {
  const { data } = useSelector(state => state.search)

  const books = useMemo(() => {
    return data?.books
  }, [data])

  const authors = useMemo(() => {
    return data?.authors
  }, [data])

  return (
    <div className={st.overlay} onClick={onClose}>
      <div
        className={classNames(st.dropDown)}
        onClick={e => e.stopPropagation()}
      >
        <div className={classNames('container', st.border)}>
          <div className={st.dropDownContent}>
            <ShowAll
              text={'Все результаты'}
              url={`/search?search=${value}&type=full`}
              arrowSecondary
              externalClass={st.dropDownShowMore}
            />
            {!!books?.length &&
              <div className={st.dropDownContentUser}>
                {/*{!!data?.books?.length ?*/}
                  {/*<h2 className={st.dropDownContentTitle}>Часто ищут</h2>*/}
                {/*}*/}
                <ul className={st.dropDownContentPopular}>
                  {books.map(i => (
                    <li
                      key={i?.id}
                      className={st.dropDownContentPopularItem}
                    >
                      <Link href={`/book/${i?.id}?type=${i?.type}`}>
                        <a>
                          <Image
                            src={i?.image?.link || '/blur.webp'}
                            width={124}
                            height={187}
                            // layout="fill"
                            placeholder="blur"
                            blurDataURL="/blur.webp"
                            className={st.dropDownContentPopularImg}
                          />
                        </a>
                      </Link>
                      <Link href={`/book/${i?.id}?type=${i?.type}`}>
                        <a className={st.dropDownContentPopularItemName}>
                          {i?.title}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            }
            {!!authors?.length &&
              <div className={st.dropDownContentAuthor}>
                <h2 className={st.dropDownContentTitle}>Авторы</h2>
                <ul className={st.authorsList}>
                  {authors.map(({id, author}) => (
                    <Link href={`/author?id=${id}`} key={id} className={st.author}>
                      <a>
                        <span className={st.authorName}>{author}</span>
                      </a>
                    </Link>
                  ))}
                </ul>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;