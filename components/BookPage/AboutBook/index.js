import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import classnames from 'classnames';
import Image from 'next/image';
import {deleteBookFromFavorite, setAudioBookRating, setBookRating, setBookStatus} from '../../../store/bookSlice';
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
import {durationString, wordsForCount} from "../../../utils";


const AboutBook = ({ book, audioFlag, showMyComp }) => {
  const dataOptions = [
    {
      icon: <BookMark />,
      title: audioFlag ? 'Хочу прослушать' : 'Хочу прочитать',
      value: 1,
      withPopup: true,
      isEdit: true,
      link: '/mybooks',
      message: 'в вашу библиотеку'
    },
    {
      icon: <OpenBook />,
      title: audioFlag ? 'Слушаю' :'Читаю',
      value: 2,
      withPopup: true,
      isEdit: true,
      link: audioFlag ? '/mybooks/audio' : '/mybooks',
      message: `в список ${audioFlag ? 'слушаемых' : 'читаемых'}`
    },
    {
      icon: <Flag />,
      title: audioFlag ? 'Прослушано' : 'Прочитано',
      value: 3,
      withPopup: true,
      isEdit: true,
      link: null,
      message: `в список ${audioFlag ? 'прослушаных' : 'прочитаных'}`
    },
    {
      icon: <Add />,
      title: 'В мои подборки',
      withPopup: true,
      link: '/mybooks/selections?compType=1',
      message: 'в ваши подборки'
    },
    {
      icon: <Basket />,
      title: 'Удалить из моих книг',
      withPopup: true,
      isDelete: true,
      link: null,
      message: 'из вашей библиотеки'
    }
  ]

  const dispatch = useDispatch();
  const type = audioFlag ? 'audio-books' : 'books'

  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState({status: 'добавлена', text: '', link: null});

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
      })).then(res => {
        setMessage({status: 'добавлена', text: el?.message, link: el?.link})
        showPopup(res, el?.withPopup)
      })
    } else if(el?.isDelete) {
      dispatch(deleteBookFromFavorite({
        id: book.id,
        type
      })).then(res => {
        setMessage({status: 'удалена', text: el?.message, link: el?.link})
        showPopup(res, el?.withPopup)
      })
    } else {
      showMyComp()
    }
  };

  const setRating = value => {
    if(!isAuth) {
      dispatch(setAuthPopupVisibility(true))
      return
    }
    book?.type === 'audioBooks'
      ? dispatch(setAudioBookRating({ id: book.id, value }))
      : dispatch(setBookRating({ id: book.id, value }))
  };

  const onListen = () => {
    dispatch(setPlayerData({
      title: book?.title,
      image: book?.cover_url || "/preview.jpg",
      link: `/audiobooks/${book?.genre?.slug}/${book?.slug}`,
      chapters: book?.chapters,
      user_progress: book?.user_progress
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
              src={book?.cover_url || "/preview.jpg"}
              // bookTitle
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

            {audioFlag && innerWidthWindow > 768 && (
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
                  <Link href={`/author/${book?.authors[0]?.slug}`}>
                    <a className={st.bookAuthorName}>
                      {book?.authors[0]?.author}
                    </a>
                  </Link> :
                  <span className={st.bookAuthorName}>Нет автора</span>
                }
                {innerWidthWindow >= 768 && book?.authors?.length ?
                  <Link href={`/author/${book?.authors[0]?.slug}`}>
                    <a className={st.bookAuthorLink}>(все книги автора)</a>
                  </Link> : null
                }
              </p>
              <div className={st.bookDate}>
                {audioFlag && book?.total_duration !== '0' /*(book?.total_duration !== '0' || book?.total_size !== '0')*/ && (
                  <div className={st.bookDuration}>
                    {book?.total_duration !== '0' && (
                      <span className={st.audioInfo}>
                        {durationString(book?.total_duration)}
                      </span>
                    )}
                    {/*{book?.total_size !== '0' && (*/}
                    {/*  <span className={st.audioInfo}>*/}
                    {/*    <span>{Math.round(+book?.total_size / 1048576)}</span> Мбайт*/}
                    {/*  </span>*/}
                    {/*)}*/}
                  </div>
                )}
                {audioFlag && book?.year && (
                  <span className={st.bookDateYear}>{book?.year}</span>
                )}
                {!audioFlag && book?.year?.year && (
                  <span className={st.bookDateYear}>{book?.year?.year}</span>
                )}
                {book?.views_count ?
                    <div className={st.selectionDateViews}>
                      <span>{book?.views_count}</span>
                      <Eye />
                    </div> : null}
              </div>
              <div className={st.raiting}>
                <div className={st.bookRaiting}>
                  <Stars count={1} />
                  <p className={st.bookRaitingCount}>
                    {book?.rate_avg} ({book?.rates_count} {wordsForCount(book?.rates_count)})
                  </p>
                </div>
                {innerWidthWindow >= 768 && (
                  <div className={st.starsBlock}>
                    <p>Оцените книгу</p>
                    <Stars
                      activeStart={true}
                      value={book?.user_rating}
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
                    {`${book.user_progress ? 'Продолжить' : 'Начать'} слушать`}
                  </button>
                ) : (
                  <Link href={`/reader?id=${book?.id}&page=${book?.last_page || 1}`}>
                    <a className={st.readButton}>Читать</a>
                  </Link>
                )}
                <DotsDropdown>
                  {dataOptions.map(i => (
                    <p
                      key={i?.title}
                      className={classnames(st.menuItem, {
                        [st.elect]: book?.book_status === i?.value
                      })}
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
                {book?.text || book?.description || 'Нет описания'}
              </p>
              <div className={st.ditalInfo}>
                {audioFlag ? (
                  book?.actors?.length
                    ? <p>
                        Чтец: <span>{book?.actors[0]?.name}</span>
                      </p>
                    : null
                ) : (
                  <>
                    {book?.publishers?.length
                      ? <p>
                          Издательство: <span>{book?.publishers[0]?.publisher}</span>
                        </p>
                      : null}
                    {book?.translator
                      ? <p>
                          Переводчик: <span>{book?.translator}</span>
                        </p>
                      : null}
                  </>
                )}

                <p>
                  Жанр:{' '}
                  <span>
                    {(book?.genres?.length
                      ? book?.genres?.[0]?.name
                      : book?.genre?.name
                    ) || '-'}
                  </span>
                </p>
                {book?.copyright_holder
                  ? <p>
                      Правообладатель: <span>{book?.copyright_holder}</span>
                    </p>
                  : null}
                {book?.series?.name
                  ? <p>Серия:{' '}
                      <span>
                        <Link href={`/series/books/${book?.series?.slug}`}>
                          <a>{book?.series?.name || '-'}</a>
                        </Link>
                      </span>
                    </p>
                : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopUp && (
        <div className={st.popUp}>
          <p>
            Книга “{book?.title}” {message?.status}{' '}
            {message?.link
              ? <Link href={message?.link}>
                  <a className={st.popUpLink}>{message?.text}</a>
                </Link>
              : message?.text}
          </p>
        </div>
      )}
    </>
  );
};

export default AboutBook;
