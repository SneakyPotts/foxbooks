import { useState } from 'react';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import classnames from 'classnames';
import Switcher from '../switcher/Switcher';
import books from '../data/books.json';
import Book from '../shared/common/book';
import ArrowRight from '../../public/chevron-right.svg';
import SelectionGrid from './selectionsGrid';
import st from './selections.module.scss';

const SelectionsPage = ({ audio }) => {
  const popularSelections = [
    { id: '0', option: 'Все' },
    { id: '1', option: 'Тематические' },
    { id: '2', option: 'Регулярные' },
  ];

  const booksSelections = [
    { id: '0', option: 'Все' },
    { id: '1', option: 'Книги' },
    { id: '2', option: 'Аудиокниги' },
  ];

  const selections = [
    { id: '0', name: 'Аудиокниги для семейного путешествия' },
    { id: '1', name: 'Что читать на карантине? Лучшие книги о любви 2021' },
    { id: '2', name: 'Укрепляем самооценку и веру в себя' },
    { id: '3', name: 'Фантастические путешествия, не выходя из дома' },
    {
      id: '4',
      name: 'Книги о реальных преступлениях, которые будут держать вас в напряжении до последней страницы',
    },
    {
      id: '5',
      name: 'Аудиокниги о фантастических баталиях и альтернативной истории',
    },
    { id: '6', name: 'Истории, где души умерших навещают мир живых' },
    { id: '7', name: 'Фантастические путешествия, не выходя из дома' },
    { id: '8', name: 'Что читать на карантине? Лучшие книги о любви 2021' },
    { id: '9', name: 'Аудиокниги для семейного путешествия' },
  ];

  //   const [stateIndex, setStateIndex] = useState(null);
  const [flagSwitcher, setFlagSwitcher] = useState(false);
  const [btnIndex, setBtnIndex] = useState(null);
  const [add, setAdd] = useState(false);

  const handleBtnClick = index => {
    setAdd(true);
    setBtnIndex(index);
  };

  return (
    <div className="container">
      <h2 className={st.title}>Подборки</h2>
      <div className={st.filters}>
        <div className={st.filtersBtns}>
          <div className={st.popularSelections}>
            {popularSelections.map(select => (
              <button key={select.id} className={st.selectFilters}>
                {select.option}
              </button>
            ))}
          </div>
          <div className={st.booksSelections}>
            {booksSelections.map(select => (
              <button key={select.id} className={st.selectFilters}>
                {select.option}
              </button>
            ))}
          </div>
        </div>
        <Switcher
          setFlagSwitcher={setFlagSwitcher}
          flagSwitcher={flagSwitcher}
        />
      </div>
      <div className={st.mainBlock}>
        {!flagSwitcher ? (
          <div className={st.selectionsSwiper}>
            {selections.map((sel, index) => (
              <div className={st.selSlider}>
                <div className={st.selSliderHead}>
                  <h2 className={st.selSliderHeadTitle}>{sel.name}</h2>
                  <button
                    className={classnames(st.selSliderHeadBtn, {
                      [st.added]: btnIndex === index,
                    })}
                    onClick={() => handleBtnClick(index)}
                  >
                    {btnIndex === index ? (
                      <span>Подборка добавлена</span>
                    ) : (
                      <span>Добавить подборку</span>
                    )}
                  </button>
                </div>
                <Swiper
                  spaceBetween={24}
                  modules={[Navigation]}
                  navigation={{
                    prevEl: '.prevArrow',
                    nextEl: '.nextArrow',
                  }}
                  slidesPerView={5}
                >
                  {books.map(book => (
                    <SwiperSlide key={book.id}>
                      <Book
                        classNames={st.slide}
                        book={book}
                        similar={true}
                        // audio={true}
                      />
                    </SwiperSlide>
                  ))}
                  <button
                    className={classnames('prevArrow', {
                      [st.btn]: !audio,
                      [st.btnAudio]: audio,
                    })}
                  >
                    <ArrowRight className="arrowNext" />
                  </button>
                  <button
                    className={classnames('nextArrow', {
                      [st.btn]: !audio,
                      [st.btnAudio]: audio,
                    })}
                  >
                    <ArrowRight className="arrowNext" />
                  </button>
                </Swiper>
              </div>
            ))}
          </div>
        ) : (
          <SelectionGrid />
        )}

        <div className={st.advertisingBlok}>
          <div className={st.bannerBlock}>
            <img src="/banner.png" alt="" className={st.banner} />
          </div>
          <div className={st.bannerBlock}>
            <img src="/banner.png" alt="" className={st.banner} />
          </div>
        </div>
      </div>
      <p className={st.pagination}>1 2 3 4</p>
    </div>
  );
};

export default SelectionsPage;
