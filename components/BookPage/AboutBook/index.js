import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import Image from 'next/image';
import {deleteBookFromFavorite, setBookRating, setBookStatus} from '../../../store/bookSlice';
import Stars from '../../shared/common/stars/Stars';
import BookMark from '../../shared/icons/myBookmark';
import OpenBook from '../../shared/icons/bookOpen';
import Flag from '../../shared/icons/flag';
import Add from '../../shared/icons/plus';
import Basket from '../../shared/icons/trash';
import Headphones from '../../shared/icons/headphones';
import Eye from '../../shared/icons/eye';
import st from './aboutBook.module.scss';
import DotsDropdown from "../../DotsDropdown";
import {setAuthPopupVisibility, setPlayerVisibility} from "../../../store/commonSlice";
import {setPlayerData} from "../../../store/playerSlice";


const AboutBook = ({ book, audioFlag, showMyComp }) => {
  const dataOptions = [
    {
      icon: <BookMark />,
      title: audioFlag ? 'Хочу прослушать' : 'Хочу прочитать',
      value: 1,
      withPopup: true,
      isEdit: true
    },
    {
      icon: <OpenBook />,
      title: audioFlag ? 'Слушаю' :'Читаю',
      value: 2,
      isEdit: true
    },
    {
      icon: <Flag />,
      title: audioFlag ? 'Прослушал' : 'Прочитано',
      value: 3,
      isEdit: true
    },
    {
      icon: <Add />,
      title: 'В мои подборки'
    },
    {
      icon: <Basket />,
      title: 'Удалить из моих книг',
      isDelete: true
    }
  ]

  const router = useRouter();
  const dispatch = useDispatch();
  const type = audioFlag ? 'audio-books' : 'books'

  const [showPopUp, setShowPopUp] = useState(false);

  const { innerWidthWindow } = useSelector(state => state.common);
  const { isAuth } = useSelector(state => state.auth);

  const showPopup = (res, condition) => {
    if (condition && res.meta.requestStatus === 'fulfilled') {
      setShowPopUp(true);
      setTimeout(() => setShowPopUp(false), 5000);
    }
  };

  const handleClick = el => {
    if(!isAuth) {
      dispatch(setAuthPopupVisibility(true))
      return
    }

    if(el?.isEdit) {
      dispatch(setBookStatus({
        id: book.id,
        value: el?.value,
        type
      })).then(res => showPopup(res, el?.withPopup))
    } else if(el?.isDelete) {
      dispatch(deleteBookFromFavorite({
        id: book.id,
        type
      }))
    } else {
      showMyComp()
    }
  };

  const setRating = value => {
    if(!isAuth) {
      dispatch(setAuthPopupVisibility(true))
      return
    }
    dispatch(setBookRating({ id: book.id, value }));
  };

  const onListen = () => {
    dispatch(setPlayerData({
      title: book?.title,
      image: book?.image?.link,
      chapters: book?.chapters
    }))
    dispatch(setPlayerVisibility(true))
  }

  return (
    <>
      <div key={book.id} className={st.bookInfo}>
        <div className={st.infoBlockBook}>
          <div
            className={classnames(st.bookCover, {
              [st.bookCoverAudio]: audioFlag,
            })}
          >
            <Image
              src={book?.image?.link || "/preview.jpg"}
              bookTitle
              height={
                audioFlag
                  ? innerWidthWindow > 768
                    ? 270
                    : 108
                  : innerWidthWindow > 768
                  ? 406
                  : 160
              }
              width={innerWidthWindow > 768 ? 270 : 108}
              layout="fill"
              placeholder="blur"
              blurDataURL="/blur.webp"
            />

            {audioFlag && (
              <div className={st.bookCoverIcon}>
                <Headphones />
              </div>
            )}
          </div>

          <div className={st.blockBookTitle}>
            <div className={st.wrapperBookTitle}>
              <h1 className={st.bookTitle}>{book?.title}</h1>
              <p className={st.bookAuthor}>
                {book?.authors?.length ?
                  <Link href={`/author?id=${book?.authors[0]?.id}`}>
                    <a className={st.bookAuthorName}>
                      {book?.authors[0]?.author}
                    </a>
                  </Link> :
                  <span className={st.bookAuthorName}>Нет автора</span>
                }
                {innerWidthWindow >= 768 && book?.authors?.length ?
                  <Link href={`/author?id=${book?.authors[0]?.id}`}>
                    <a className={st.bookAuthorLink}>(все книги автора)</a>
                  </Link> : null
                }
              </p>
              <div className={st.bookDate}>
                {/*{audioFlag && (*/}
                {/*  <div>*/}
                {/*    <span className={st.audioInfo}>*/}
                {/*      <span>40</span>мин.*/}
                {/*    </span>*/}
                {/*    <span className={st.audioInfo}>*/}
                {/*      <span>42</span> Мбайт*/}
                {/*    </span>*/}
                {/*  </div>*/}
                {/*)}*/}
                {book?.year?.year && <span className={st.bookDateYear}>{book?.year?.year}</span>}
                {/* <span className={st.bookDateAge}>{book.age}8</span> */}
                {audioFlag ?
                  book?.listeners_count ?
                    <div className={st.selectionDateViews}>
                      <span>{book?.listeners_count}</span>
                      <Eye />
                    </div> : null
                  :
                  book?.views_count ?
                    <div className={st.selectionDateViews}>
                      <span>{book?.views_count}</span>
                      <Eye />
                    </div> : null
                }
              </div>
              <div className={st.raiting}>
                <div className={st.bookRaiting}>
                  <Stars count={1} />
                  <p className={st.bookRaitingCount}>
                    {book?.rates_avg} ({book?.rates_count} оценок)
                  </p>
                </div>
                {innerWidthWindow >= 768 && (
                  <div className={st.starsBlock}>
                    <p>Оцените книгу</p>
                    <Stars
                      activeStart={true}
                      value={0}
                      color={'#4f4f4f'}
                      onChange={value => setRating(value)}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className={st.aboutBook}>
              {innerWidthWindow < 768 && (
                <div className={classnames(st.starsBlock, st.addDistance)}>
                  <p>Оцените книгу</p>
                  <Stars
                    activeStart={true}
                    value={0}
                    color={'#4f4f4f'}
                    onChange={value => setRating(value)}
                  />
                </div>
              )}
              <div className={st.buttons}>
                {audioFlag ? (
                  <button
                    className={st.readButton}
                    onClick={onListen}
                  >
                    Начать слушать
                  </button>
                ) : (
                  <Link href={`/reader?id=${book?.id}&page=1`}>
                    <a className={st.readButton}>Читать</a>
                  </Link>
                )}
                <DotsDropdown>
                  {dataOptions.map(i => (
                    <p
                      key={i?.title}
                      className={st.menuItem}
                      onClick={() => handleClick(i)}
                    >
                      {i?.icon}
                      <span>{i?.title}</span>
                    </p>
                  ))}
                </DotsDropdown>
              </div>

              <ul className={st.navLinks}>
                <li>
                  О книге
                </li>
                {book?.reviews_count ?
                  <li>
                    <a href="#reviews">
                      Рецензии <span className={st.number}>{book?.reviews_count}</span>
                    </a>
                  </li> : null
                }
                {audioFlag ?
                  book?.listeners_count ?
                    <li>
                      <a href="#quotes">
                        Слушают <span className={st.number}>{book?.listeners_count}</span>
                      </a>
                    </li> : null
                :
                  book?.quotes_count ?
                    <li>
                      <a href="#quotes">
                        Цитаты <span className={st.number}>{book?.quotes_count}</span>
                      </a>
                    </li> : null
                }
                {book?.similar?.length ?
                  <li>
                    <a href="#similar">Похожие книги</a>
                  </li> : null
                }
              </ul>
              <p>
                {book?.text || 'Нет описания'}
              </p>
              <div className={st.ditalInfo}>
                {audioFlag ? (
                  <p>
                    Чтец: <span>{book?.actors?.length ? book?.actors[0]?.name : '-'}</span>
                  </p>
                ) : (
                  <>
                    <p>
                      Издательство: <span>{book?.publishers?.length ? book?.publishers[0]?.publisher : '-'}</span>
                    </p>
                    <p>
                      Переводчик: <span>{book?.translator || '-'}</span>
                    </p>
                  </>
                )}

                <p>
                  Жанр:{' '}
                  <span>
                    {(book?.genres?.length ? book?.genres[0]?.name :
                      book?.book_genres?.length ? book?.book_genres[0]?.name :
                        book?.genre?.name) || '-'}
                  </span>
                </p>
                <p>
                  Правообладатель: <span>{book?.copyright_holder || '-'}</span>
                </p>
                <p>Серия:{' '}
                  <span>
                    <Link href={`/series?id=${book?.series?.id}`}>
                      <a>{book?.series?.name || '-'}</a>
                    </Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopUp && (
        <div className={st.popUp}>
          <p>
            Книга “{book?.title}” добавлена{' '}
            <Link href="/mybooks">
              <a className={st.popUpLink}>в вашу библиотеку</a>
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default AboutBook;
