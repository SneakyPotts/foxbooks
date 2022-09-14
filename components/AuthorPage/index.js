import React, { useState }  from 'react';
import { useSelector, useDispatch } from "react-redux";
import Image from 'next/image';
import Link from 'next/link';
import Categories from '../HomePage/Categories';
import Book from '../shared/common/book';
import DropDownArrow from '../../public/chevron-down.svg';
import ShowAll from '../shared/common/showAll/ShowAll';
import { addAuthorToFavorite, deleteAuthorFromFavorite } from '../../store/authorSlice'

import classnames from 'classnames';
import st from './author.module.scss';
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import {useRouter} from "next/router";
import Button from "../shared/common/Button/Button";
import CompilationItem from "../CompilationItem";

const AuthorPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { author } = useSelector(state => state.author)

  const [showMore, setShowMore] = useState(false);
  const [popupIsVisible, setPopupIsVisible] = useState(false);

  const onShowMore = () => {
    setShowMore(!showMore);
  };

  const showPopup = res => {
    if (res.meta.requestStatus === 'fulfilled') {
      setPopupIsVisible(true)
      setTimeout(() => setPopupIsVisible(false), 5000)
    }
  }

  const handleClick = () => {
    if(author?.in_favorite) {
      dispatch(deleteAuthorFromFavorite(author?.id))
    } else {
      dispatch(addAuthorToFavorite(author?.id)).then(res =>
        showPopup(res)
      )
    }
  };

  return (
    <div className="container">
      <Breadcrumbs
        data={[{
          title: `Автор “${author?.author}”`,
          path: router.asPath
        }]}
      />

      <div className={st.wrapper}>
        <div className={st.centralBlock}>
          <div className={st.authorWrapper}>
            <div className={st.authorImg}>
              <Image
                src={author?.avatar || '/preview.jpg'}
                width={180}
                height={275}
                alt=""
              />
            </div>
            <div className={st.authorInfo}>
              <h1 className={st.authorInfoName}>{author?.author}</h1>
              <p className={st.authorInfoCount}>
                <span>{author?.total_books}</span> книг
              </p>
            </div>
            <div className={st.authorDescr}>
              <Button
                classNames={st.authorInfoBtn}
                text={author?.in_favorite ? 'В моих книгах' : 'Добавить в избранное'}
                click={handleClick}
              />
              <p
                className={classnames(st.authorBiography, {
                  [st.authorBiographyHide]: !showMore,
                })}
              >
                {author?.about || 'Нет информации'}
              </p>
              {author?.about?.length > 550 &&
                <span
                  className={st.showMoreLink}
                  onClick={onShowMore}
                >
                  Показать полностью
                  <DropDownArrow
                    className={classnames(st.dropDownArrow, {
                      [st.up]: showMore,
                    })}
                  />
                </span>
              }
            </div>
          </div>

          <div className={st.wrapperMain}>
            <Categories />

            <div className={st.mainBlok}>
              {author?.series?.length ? 
                author?.series?.map(i => (
                  <div
                    key={i?.id}
                    className={st.series}
                  >
                    <Link href={`/series?id=${i?.id}`}>
                      <a className={classnames('title', st.seriesTitle)}>
                        Серия книг: {i?.series}
                      </a>
                    </Link>
                    <ul className={st.seriesList}>
                      {i?.books?.map(i => (
                        <li
                          key={i?.id} 
                          className={st.seriesListBook}
                        >
                          <Book
                            book={i}
                            type={i?.type}
                            classNames={st.seriesListBookItem}
                            similar={true} 
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                )) : null
              }

              {author?.books?.length ? 
                <div className={st.selection}>
                  <h2 className={classnames('title', st.selectionTitle)}>Книги вне серий</h2>
                  <ul className={st.selectionList}>
                    {author?.books?.map(i => (
                      <li
                        key={i?.id}
                        className={st.selectionListBook}
                      >
                        <Book
                          book={i}
                          type={i?.type}
                          classNames={st.selectionListBookItem}
                          similar={true}
                        />
                      </li>
                    ))}
                  </ul>
                </div> : null
              }

              {author?.audio_books?.length ? 
                <div className={st.selection}>
                  <h2 className={classnames('title', st.seriesTitle)}>Аудиокниги автора</h2>
                  <ul className={st.selectionList}>
                    {author?.audio_books?.map(i => (
                      <li
                        key={i?.id}
                        className={st.selectionListBook}
                      >
                        <Book
                          book={i}
                          type={i?.type}
                          audio={true}
                          classNames={st.selectionListBookItem}
                          similar={true}
                        />
                      </li>
                    ))}
                  </ul>
                </div> : null
              }

              {author?.non_author_compilation?.data?.length ?
                <div className={st.compil}>
                  <ShowAll title="Подборки" url="/selections?selectionCategory=3&bookType=all&showType=list" />
                  <div className={st.compilBlock}>
                    {author?.non_author_compilation?.data?.map(i =>
                      <CompilationItem
                        key={i?.id}
                        data={i}
                        path={`/selections/${i?.id}`}
                        isMini
                      />
                    //   (
                    //   <div key={i?.id}>
                    //     <div className={st.compilBookCover}>
                    //       <Image
                    //         src="/horizontalBookCovers/bookCover2.png"
                    //         width={180}
                    //         height={108}
                    //         alt=""
                    //       />
                    //       <div className={st.compilBookCoverStat}>
                    //         <span>15</span>
                    //         <span>книг</span>
                    //       </div>
                    //     </div>
                    //     <h4 className={st.compilBookTitle}>{i?.title}</h4>
                    //   </div>
                    // )
                    )}
                  </div>
                </div> : null
              }

              <div className={st.selection}>
                <Link href={`/reviews/${author.id}`}>
                  <a className={classnames('title', st.seriesTitle)}>
                    Рецензии
                  </a>
                </Link>
                <div className={st.reviewBlock}>
                  <h3 className={st.reviewBlockTitle}>Рецензии из книг</h3>
                  <p>{author?.author_reviews_count}</p>
                </div>
              </div>

              <div className={classnames(st.selection, st.quotes)}>
                <Link href={`/quotes/${author.id}`}>
                  <a className={classnames('title', st.seriesTitle)}>
                    Цитаты
                  </a>
                </Link>
                <div className={st.reviewBlock}>
                  <h3 className={st.reviewBlockTitle}>Цитаты из книг</h3>
                  <p>{author?.author_quotes_count}</p>
                </div>
              </div>

              {author?.similar_authors?.length ?
                <div className={st.similarAuthors}>
                  <ShowAll title="Похожие авторы" url="#" />
                  <ul className={st.selectionList}>
                    {author?.similar_authors?.map(i => (
                      <li
                        key={i?.id}
                        className={classnames(st.selectionListBook, st.defolt)}
                      >
                        <Image
                          src={i?.img}
                          width={129}
                          height={195}
                          alt={i?.name}
                        />
                        <h3 className={st.selectionListBookAuthor}>{i?.name}</h3>
                        <p className={st.selectionListBookCount}>
                          {i?.count}
                          <span> книг</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div> : null
              }
            </div>
          </div>
        </div>

        <div className={st.advertisingBlok}>
          <img src="/banner.png" alt="" className={st.banner} />
          <img src="/banner.png" alt="" className={st.banner} />
        </div>
      </div>
      
      {popupIsVisible && (
        <div className={st.popUp}>
          <p>
            Вы можете найти автора в разделе{' '}
            <Link href="/mybooks/authors">
              <a className={st.popUpLink}>Мои Книги</a>
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthorPage;
