import React from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import classnames from 'classnames';
import ArrowRight from '../../public/chevron-right.svg';
import AboutBook from './AboutBook';
import Comments from './Comments';
import Reviews from './Reviews';
import Quotes from './Quotes';
import AuthorOtherBooks from './AuthorOtherBooks';
import AuthorOtherAudioBooks from './AuthorOtherAudiobooks';
import SimilarBooks from './SimilarBooks';

import st from './bookpage.module.scss';

const BookPage = () => {
  const compilationsBook = [
    { id: '0', title: 'Что читает Дэниел Рэдклифф' },
    {
      id: '1',
      title:
        'Ход королевы: книги, в которых фигурируют Ход королевы: книги, в которых фигурируют',
    },
    { id: '2', title: 'Дружба в книгах' },
    { id: '3', title: 'Что читает Дэниел Рэдклифф' },
  ];
  const { audioFlag } = useSelector(state => state.bookSlice);

  return (
    <div className={classnames('container', st.wrapper)}>
      <div className={st.mainBlock}>
        <AboutBook
        // audio={true}
        />
        <div className={st.relatedInfo}>
          <SimilarBooks
          // audio={true}
          />
          <Image src="/advertising.png" width={588} height={250} />
          <Comments />
          <Reviews />
          {!audioFlag && <Quotes />}
          <AuthorOtherBooks />
          <AuthorOtherAudioBooks />
          {!audioFlag && (
            <div className={st.compilBlock}>
              <h3 className={st.compilTitle}>Подборки с этой книгой</h3>
              <Swiper
                spaceBetween={24}
                modules={[Navigation]}
                navigation={{
                  prevEl: '.prevArrow',
                  nextEl: '.nextArrow',
                }}
                slidesPerView={3}
              >
                {compilationsBook.map(book => (
                  <SwiperSlide key={book.id}>
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
                      <h4 className={st.compilBookTitle}>{book.title}</h4>
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
            </div>
          )}
          <p className={st.recommendations}>
            Порекомендуйте книги, похожие на “Гарри Поттер и философский камень”
          </p>
          <p className={st.recommendationsLabel}>
            по жанру, сюжету, авторам и т.д.
          </p>
          <input placeholder="Поделитесь книгой" className={st.recomInput} />
          <p className={st.recomInputLabel}>
            Убедительная просьба найти соответствующую книгу на сайте FoxBook и
            вставить на нее ссылку, за отсутствием книги на нашем сайте, укажите
            автора или название книги
          </p>
        </div>
      </div>

      <div className={st.advertisingBlok}>
        <img src="/banner.png" alt="" className={st.banner} />
        <img src="/banner.png" alt="" className={st.banner} />
      </div>
    </div>
  );
};

export default BookPage;
