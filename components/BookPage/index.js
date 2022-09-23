import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Image from 'next/image';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import classnames from 'classnames';
import ArrowRight from '../../public/chevron-right.svg';
import AboutBook from './AboutBook';
import Comments from './Comments';
import Reviews from './Reviews';
import Quotes from './Quotes';
import AuthorOtherBooks from './AuthorOtherBooks';
import AuthorOtherAudioBooks from './AuthorOtherAudiobooks';
import SimilarBooks from './SimilarBooks';
import ShowAll from '../shared/common/showAll/ShowAll';
import st from './bookpage.module.scss';
import {useRouter} from "next/router";
import Breadcrumbs from "../BreadCrumps/BreadCrumps";
import {getAudioBooksByAuthor, getBooksByAuthor} from "../../store/bookSlice";
import AddToMyCompilation from "./AddToMyCompilation";
import Form from "./Form";

const BookPage = ({bookType}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const type = bookType

  const audioFlag = bookType === 'audioBooks';

  const { book, booksByAuthor, audioBooksByAuthor } = useSelector(state => state.book);
  const { innerWidthWindow } = useSelector(state => state.common);

  const [myCopmIsVisible, setMyCopmIsVisible] = useState(false)

  const changeSlidesPerView = () => {
    if (innerWidthWindow < 500) return 1;
    if (innerWidthWindow <= 768) return 2;
    if (innerWidthWindow > 768) return 3;
  };

  useEffect(() => {
    const authorId = book?.authors[0]?.id
    if(authorId) {
      dispatch(getBooksByAuthor(authorId))
      dispatch(getAudioBooksByAuthor(authorId))
    }
  }, [])

  if(myCopmIsVisible) {
    return (
      <AddToMyCompilation
        onClose={() => setMyCopmIsVisible(false)}
      />
    )
  }
  console.log(book)
  return (
    <div className={'container'}>
      <Breadcrumbs
        data={[
          {
            path: `/${type.toLowerCase()}`,
            title: type === 'books' ? 'Книги' : 'Аудиокниги'
          },
          {
            path: `categories/${type === 'books' ? book.book_genres[0].slug : book.genre.slug}`,
            title: `${type === 'books' ? book.book_genres[0].name : book.genre.name}`
          },
          {
            path: router.asPath,
            title: book?.title
          },
        ]}
      />

      <div className={st.wrapper}>
        <div className={st.mainBlock}>
          <AboutBook
            book={book}
            audioFlag={audioFlag}
            showMyComp={() => setMyCopmIsVisible(true)}
          />

          <div
            className={st.relatedInfo}
          >
            {book?.similarBooks?.length ?
              <SimilarBooks
                data={book?.similarBooks}
              /> : null
            }

            <img
              src="/horizontalBookCovers/bookCover1.png"
              alt=""
              width={588}
              height={250}
              className={st.relatedInfoBanner}
            />

            <Comments />

            <Reviews type={book.type} />

            {!audioFlag && <Quotes />}

            {booksByAuthor?.length ?
              <AuthorOtherBooks
                data={booksByAuthor}
              /> : null
            }

            {audioBooksByAuthor?.length ?
              <AuthorOtherAudioBooks
                data={audioBooksByAuthor}
              /> : null
            }

            {!audioFlag && book?.compilations?.length ?
              <div className={st.compilBlock}>
                <div className={st.title}>
                  {innerWidthWindow > 768 ? (
                    <h3 className={st.compilTitle}>Подборки с этой книгой</h3>
                  ) : (
                    <h3 className={st.compilTitle}>Подборки</h3>
                  )}
                  {innerWidthWindow <= 768 && (
                    <ShowAll externalClass={st.dicardDistance} />
                  )}
                </div>
                <Swiper
                  spaceBetween={24}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: '.prevArrow',
                    nextEl: '.nextArrow',
                  }}
                  slidesPerView={changeSlidesPerView()}
                >
                  {book?.compilations?.map(i => (
                    <SwiperSlide key={i?.id}>
                      <div>
                        <div className={st.compilBookCover}>
                          <Image
                            src="/horizontalBookCovers/bookCover2.png"
                            width={180}
                            height={108}
                            alt=""
                          />
                          <div className={st.compilBookCoverStat}>
                            <span>15</span>
                            <span>книг</span>
                          </div>
                        </div>
                        <h4 className={st.compilBookTitle}>{i?.title}</h4>
                      </div>
                    </SwiperSlide>
                  ))}
                  <button className={classnames('prevArrow', st.btnCompil)}>
                    <ArrowRight className="arrowNext" />
                  </button>
                  <button className={classnames('nextArrow', st.btnCompil)}>
                    <ArrowRight className="arrowNext" />
                  </button>
                </Swiper>
              </div> : null
            }

            <Form title={book?.title} />
          </div>
        </div>

        <div className={st.advertisingBlok}>
          <img src="/banner.png" alt="" className={st.banner} />
          <img src="/banner.png" alt="" className={st.banner} />
        </div>
      </div>
    </div>
  );
};

export default BookPage;
