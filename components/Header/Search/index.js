import React, {useEffect, useMemo} from 'react';
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import ShowAll from "../../shared/common/showAll/ShowAll";
import st from './../header.module.scss'
import {useRouter} from "next/router";

const Search = ({ value , onClose }) => {
  const router = useRouter()
  const { data } = useSelector(state => state.search)
  const { innerWidthWindow } = useSelector(state => state.common);

  const books = useMemo(() => {
    return data?.books
  }, [data])

  const authors = useMemo(() => {
    return data?.authors
  }, [data])

  useEffect(() => {
    const handleKeyDown = (ev) => {
      if(ev.code === 'Escape') {
        onClose()
      } else if(ev.code === 'Enter') {
        if (!!value.length) {
          router.push(`/search?search=${value}&type=full&sortBy=1`)
          onClose()
        }
      }
    }
    document.body.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  }, [value])

  //FIXME
  useEffect(() => {
    if(data?.books?.length || data?.authors?.length) {
      if (innerWidthWindow <= 768) {
        document.body.style.touchAction = 'none'
        document.body.classList.add('nonScroll')
      }
    }

    return () => {
      if (innerWidthWindow <= 768) {
        document.body.style.touchAction = 'auto'
      }
    }
  }, [data])

  if(!books?.length && !authors?.length) return null

  return (
    <>
      <div
          className={st.overlay}
          onClick={onClose}
      />
      <div
          className={classNames(st.dropDown)}
          onClick={onClose}
      >
        <div className={classNames('container', st.border)}>
          <div
              className={st.dropDownContent}
              onClick={e => e.stopPropagation()}
          >
            <div onClick={onClose}>
              <ShowAll
                text={'Все результаты'}
                url={`/search?search=${value}&type=full&sortBy=1`}
                arrowSecondary
                externalClass={st.dropDownShowMore}
              />
            </div>
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
                      <Link href={`/${i?.type}/${i?.genres?.[0]?.slug || i?.genre?.slug}/${i?.slug}`}>
                        <a onClick={onClose}>
                          <Image
                            src={i?.cover_url || '/blur.webp'}
                            width={124}
                            height={187}
                            // layout="fill"
                            placeholder="blur"
                            blurDataURL="/blur.webp"
                            className={st.dropDownContentPopularImg}
                          />
                        </a>
                      </Link>
                      <Link href={`/${i?.type}/${i?.genres?.[0]?.slug || i?.genre?.slug}/${i?.slug}`}>
                        <a className={st.dropDownContentPopularItemName} onClick={onClose}>
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
                  {authors.map(({id, author, slug}) => (
                    <Link href={`/author/${slug}`} key={id} className={st.author}>
                      <a onClick={onClose}>
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
    </>
  );
};

export default Search;
