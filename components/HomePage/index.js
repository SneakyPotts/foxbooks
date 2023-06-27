import { useRouter } from 'next/router';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import ArrowRight from '../../public/chevron-right.svg';
import Filters from '../Filter';
import About from './About';
import Alphabet from './Alphabet/Alphabet';
import Categories from './Categories/index';
import Hero from './Hero/Hero';
import Introductory from './Introductory block';
import MobileBlock from './MobileBlock';
import BookUpdates from './Updates';
import classNames from 'classnames';
import { Navigation } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import cssBook from './../shared/common/book/book.module.scss';
import css from './home.module.scss';

import Book from '../shared/common/book';
import ShowAll from '../shared/common/showAll/ShowAll';

const aboutHomeData = [
  {
    title: 'Читать книги онлайн',
    content: `<p>
            Когда вы ищете способ расслабиться после тяжелой рабочей недели, многие люди предпочитают читать хорошую книгу. Теперь вам не нужно тратить время на поиск
            библиотеки или магазина, где вы можете найти интересную книгу для чтения. Мы предоставляем уникальный сервис онлайн-библиотеки, где вы можете читать бесплатно
            онлайн зарубежную и отечественную литературу в любое удобное для вас время.
          </p>
          <p>
            Благодаря нашему сервису, вы можете легко и быстро найти и прочитать любимые книги в хорошем качестве прямо на нашем сайте. Больше не нужно искать и заказывать
            книги в библиотеке или магазине, вы можете наслаждаться чтением книг нашей онлайн-библиотеки в любом уголке мира, где есть доступ в интернет.
          </p>
          <p>
            Предлагаем Вам присоединиться к нашей увлекательной коллекции, где доступны новые и старые произведения, от знаменитых классиков до современных авторов. Будь то
            роман, детектив, фантастика или любой другой жанр, у нас есть книги для всех любителей чтения. Регистрация на нашем сайте бесплатна, и вы можете читать любимые
            книги совершенно бесплатно. Так что добро пожаловать в нашу онлайн-библиотеку и наслаждайтесь чтением своих любимых книг в любое время и в любом месте!
          </p>`,
  },
  {
    title: 'Аудиокниги слушать онлайн',
    content: `<p>
            Наш сайт - это уникальная онлайн-библиотека, где вы можете бесплатно слушать аудиокниги в высоком качестве, не выходя из дома. Мы постоянно обновляем наш каталог
            лучшими произведениями зарубежной и отечественной литературы, чтобы удовлетворить запросы каждого любителя аудиокниг.
          </p>
          <p>
            У нас вы найдете широкий выбор жанров: от классических произведений до современных бестселлеров. Вы можете наслаждаться прослушиванием любимых книг в любое удобное
            для вас время и в любом месте, благодаря доступности нашего ресурса 24/7.
          </p>
          <p>
            Кроме того, мы предлагаем удобный поиск и фильтрацию, чтобы вы могли легко найти нужное вам произведение. Зовите друзей и близких, чтобы насладиться с ними
            интересными и захватывающими историями вместе. Наш сайт - это идеальный способ расслабиться после тяжелого рабочего дня и провести время с пользой для души и ума.
          </p>`,
  },
  {
    title: 'Книги и аудиокниги на iPhone, iPad и Android онлайн',
    content: `<p>
            Мы предлагаем нашим посетителям наслаждаться прекрасным миром книг и аудиокниг вместе с нами. Наш онлайн-ресурс является уникальным местом, где вы можете бесплатно
            читать и слушать любимые произведения литературы в любом месте и в любое время - на своем компьютере, планшете или смартфоне. Наша библиотека постоянно пополняется
            новыми книгами и аудиокнигами, в том числе зарубежными и отечественными бестселлерами, классикой и современной литературой.
          </p>
          <p>
            Теперь вы можете наслаждаться прекрасными произведениями литературы в любое время и в любом месте - в автобусе, на работе, в поезде или дома. Мы сделали все
            возможное, чтобы вы могли наслаждаться чтением и прослушиванием книг в высоком качестве и без каких-либо ограничений. Надеемся, что наш ресурс станет вашим
            надежным партнером в увлекательном путешествии по миру литературы и доставит вам множество часов удовольствия!
          </p>`,
  },
];

const HomeView = ({ audioBooks, newBooks, order, banners }) => {
  const hotUpdates = useRef();
  const { query } = useRouter();

  const { innerWidthWindow } = useSelector((state) => state.common);

  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    if (Object.keys(query).length !== 0 && !firstVisit) {
      window.scrollTo({
        top: hotUpdates.current.offsetTop - 10,
        left: 0,
        // behavior: "smooth",
      });
    }
    setFirstVisit(false);
  }, [query]);

  return (
    <div className={classNames('container', css.container)}>
      <div className={css.mainContainer}>
        <Categories />
        <div className={css.mainBlock}>
          <Alphabet />
          <ShowAll
            title={innerWidthWindow >= 768 ? 'Новинки книг' : 'Новинки'}
            url={`/new`}
          />

          <Swiper
            modules={[Navigation]}
            spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
            slidesPerView={innerWidthWindow <= 480 ? 3 : 5}
            navigation={{
              prevEl: '.prevArrow',
              nextEl: '.nextArrow',
            }}
          >
            {newBooks.map((book) => (
              <SwiperSlide
                key={book?.id}
                className={cssBook.swiperSlide}
              >
                <Book
                  book={book}
                  type={book?.type}
                />
              </SwiperSlide>
            ))}
            <button className="prevArrow">
              <ArrowRight className="arrowNext" />
            </button>
            <button className="nextArrow">
              <ArrowRight className="arrowNext" />
            </button>
          </Swiper>
        </div>
      </div>
      {/*{innerWidthWindow <= 768 && <MobileBlock />}*/}
      <Hero bannersList={banners} />
      <div
        ref={hotUpdates}
        className={css.wrapper}
      >
        <BookUpdates />
        <Filters order={order} />
      </div>
      <Introductory audioBooks={audioBooks} />
      <About data={aboutHomeData} />
    </div>
  );
};
export default HomeView;
