import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ArrowRight from '../../public/chevron-right.svg';
import RatingAggregator from '../AnaliticsScript/RatingAggregator';
import Breadcrumbs from '../BreadCrumps/BreadCrumps';
import CompilationItem from '../CompilationItem';
import AboutBook from './AboutBook';
import AddToMyCompilation from './AddToMyCompilation';
import AuthorOtherAudioBooks from './AuthorOtherAudiobooks';
import AuthorOtherBooks from './AuthorOtherBooks';
import Comments from './Comments';
import Form from './Form';
import Quotes from './Quotes';
import Reviews from './Reviews';
import SimilarBooks from './SimilarBooks';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import st from './bookpage.module.scss';

import { getAudioBooksByAuthor, getBooksByAuthor } from '../../store/bookSlice';

import Banners from '../shared/common/Banner/Banners';

const BookPage = ({ bookType }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const type = bookType;

  const audioFlag = bookType === 'audioBooks';

  const { book, booksByAuthor, audioBooksByAuthor } = useSelector((state) => state.book);
  const { innerWidthWindow } = useSelector((state) => state.common);

  const [myCopmIsVisible, setMyCopmIsVisible] = useState(false);

  const changeSlidesPerView = () => {
    if (innerWidthWindow < 500) return 1;
    if (innerWidthWindow <= 768) return 2;
    if (innerWidthWindow > 768) return 3;
  };

  useEffect(() => {
    const authorId = book?.authors[0]?.id;

    if (authorId) {
      dispatch(getBooksByAuthor({ id: authorId, book_id: book?.id }));
      dispatch(getAudioBooksByAuthor({ id: authorId, book_id: book?.id }));
    }
  }, [router.query]);

  if (myCopmIsVisible) {
    return <AddToMyCompilation onClose={() => setMyCopmIsVisible(false)} />;
  }

  return (
    <>
      <div className={'container'}>
        <Breadcrumbs
          data={[
            {
              path: `/${type.toLowerCase()}`,
              title: type === 'books' ? 'Книги' : 'Аудиокниги',
            },
            {
              path: `/${type.toLowerCase()}/${type === 'books' ? book.genres?.[0]?.slug : book.genre?.slug}`,
              title: `${type === 'books' ? book.genres?.[0]?.name : book.genre?.name}`,
            },
            {
              path: router.asPath,
              title: book?.title,
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

            <div className={st.relatedInfo}>
              {!!book?.similarBooks?.length && (
                <SimilarBooks
                  type={type}
                  data={book?.similarBooks}
                  bookTitle={book?.title}
                />
              )}

              <Banners type={'content'} />

              <Comments />

              <Reviews type={book.type} />

              {!audioFlag && <Quotes />}

              {booksByAuthor?.length ? <AuthorOtherBooks data={booksByAuthor} /> : null}

              {audioBooksByAuthor?.length ? <AuthorOtherAudioBooks data={audioBooksByAuthor} /> : null}

              {!audioFlag && book?.compilations?.length ? (
                <div className={st.compilBlock}>
                  <div className={st.title}>
                    {innerWidthWindow > 768 ? <h3 className={st.compilTitle}>Подборки с этой книгой</h3> : <h3 className={st.compilTitle}>Подборки</h3>}
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
                    {book?.compilations?.map((i) => (
                      <SwiperSlide key={i?.id}>
                        <CompilationItem
                          path={`/selections/${i?.slug}`}
                          data={i}
                        />
                      </SwiperSlide>
                    ))}
                    <button className={classnames('prevArrow', st.btnCompil)}>
                      <ArrowRight className="arrowNext" />
                    </button>
                    <button className={classnames('nextArrow', st.btnCompil)}>
                      <ArrowRight className="arrowNext" />
                    </button>
                  </Swiper>
                </div>
              ) : null}

              <Form title={book?.title} />
            </div>
          </div>

          <div className={st.advertisingBlok}>
            <Banners />
          </div>
        </div>
      </div>

      <RatingAggregator
        type={type}
        book={book}
      />
    </>
  );
};

export default BookPage;
