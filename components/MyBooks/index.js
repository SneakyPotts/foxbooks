import Image from 'next/image';
import classnames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import ArrowRight from '../../public/chevron-right.svg';
import Headphones from '../shared/icons/headphones';
import st from './myBooks.module.scss';
import link from 'next/link';

const MyBooks = () => {
  const dataBooks = [
    {
      id: '0',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
    {
      id: '1',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '10',
    },
    {
      id: '2',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
    {
      id: '3',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '13',
    },
    {
      id: '4',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
    {
      id: '5',
      img: '/reviewsBookCovers/cover2.png',
      audio: true,
      progress: '54',
    },
    {
      id: '6',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '1',
    },
    {
      id: '7',
      img: '/reviewsBookCovers/cover2.png',
      audio: true,
      progress: '37',
    },
    {
      id: '8',
      img: '/reviewsBookCovers/cover2.png',
      audio: false,
      progress: '23',
    },
  ];
  const tab = [
    { text: 'Книги', count: 1 },
    { text: 'Аудиокниги', count: 2 },
    { text: 'Подборки', count: 3 },
    { text: 'Рецензии', count: 4 },
    { text: 'Цитаты', count: 5 },
    { text: 'Авторы', count: 6 },
  ];
  return (
    <>
      <div className="container">
        <h2 className={st.title}>Мои книги</h2>
        <div>
          {' '}
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.prevArrow',
              nextEl: '.nextArrow',
            }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            spaceBetween={24}
            slidesPerView={7}
          >
            {dataBooks.map(book => (
              <SwiperSlide
                className={classnames({
                  [st.slider]: !book.audio,
                  [st.sliderAudio]: book.audio,
                })}
                key={book.id}
              >
                <div className={st.bookProgress}>
                  <span className={st.bookProgressCount}>{book.progress}%</span>
                  <div>
                    <img
                      src={book.img}
                      className={classnames({
                        [st.bookCover]: !book.audio,
                        [st.audioBookCover]: book.audio,
                      })}
                    />
                  </div>
                  {book.audio && (
                    <div className={st.bookIcon}>
                      <Headphones />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
            <button className={classnames('prevArrow', st.positionButton)}>
              <ArrowRight className="arrowNext" />
            </button>
            <button className={classnames('nextArrow', st.positionButton)}>
              <ArrowRight className="arrowNext" />
            </button>
          </Swiper>
        </div>
      </div>
      <div className={st.myMenu}>
        <ul className={st.tabList}>
          {tab.map(({ text, count }) => (
            <li key={text} className={st.tab}>
              <h2>{count}</h2>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyBooks;
